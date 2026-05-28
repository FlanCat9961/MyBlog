package org.example.myblog.service.impl;

import org.example.myblog.entity.Post;
import org.example.myblog.repository.PostRepository;
import org.example.myblog.service.PostService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * PostServiceImpl 是文章模块业务服务的默认实现。
 * 它通过 PostRepository 完成文章数据的持久化读取和写入。
 * createPost 会在创建文章时写入 createTime，updatePost 会在更新文章时写入 updateTime。
 * 当前实现保留了比较轻量的 CRUD 行为，便于 V0.1 阶段前后端快速连通。
 * 后续这里应补充文章不存在时的异常处理、分页查询、搜索过滤、发布状态校验和事务边界。
 */
@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post findPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    @Override
    public Post createPost(Post post) {
        post.setCreateTime(java.time.LocalDateTime.now());
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Long id, Post postDetails) {
        Post post = postRepository.findById(id).orElse(null);
        if (post != null) {
            post.setTitle(postDetails.getTitle());
            post.setAuthor(postDetails.getAuthor());
            post.setContent(postDetails.getContent());
            post.setUpdateTime(java.time.LocalDateTime.now());
            return postRepository.save(post);
        }
        return null;
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
