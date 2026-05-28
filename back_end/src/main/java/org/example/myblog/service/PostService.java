package org.example.myblog.service;

import org.example.myblog.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> findAllPosts();
    Post findPostById(Long id);
    Post createPost(Post post);
    Post updatePost(Long id, Post post);
    void detetePost(Long id);
}
