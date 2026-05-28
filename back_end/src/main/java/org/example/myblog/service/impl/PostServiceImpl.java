package org.example.myblog.service.impl;

import org.example.myblog.entity.Post;
import org.example.myblog.repository.PostRepository;
import org.example.myblog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;

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
            post.setUpdataTime(java.time.LocalDateTime.now());
            return postRepository.save(post);
        }
        return null;
    }

    @Override
    public void detetePost(Long id) {
        postRepository.deleteById(id);
    }
}
