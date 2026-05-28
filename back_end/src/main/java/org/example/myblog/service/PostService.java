package org.example.myblog.service;

import org.example.myblog.entity.Post;

import java.util.List;

/**
 * PostService 是文章模块的业务服务接口。
 * 它定义了文章模块对 Controller 暴露的核心能力，包括查询、创建、更新和删除。
 * 使用接口可以让控制层依赖抽象，而不是直接依赖具体实现类。
 * 当前接口仍然直接使用 Post 实体，适合项目早期快速迭代。
 * 后续引入 DTO、分页、搜索、标签和发布状态后，可以继续在这里扩展更明确的业务方法。
 */
public interface PostService {
    List<Post> findAllPosts();
    Post findPostById(Long id);
    Post createPost(Post post);
    Post updatePost(Long id, Post post);
    void deletePost(Long id);
}
