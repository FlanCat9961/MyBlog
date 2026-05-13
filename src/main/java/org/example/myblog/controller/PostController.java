package org.example.myblog.controller;

import org.example.myblog.entity.Post;
import org.example.myblog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostRepository postRepository;

    //获取文章接口
    @GetMapping
    public List<Post> findAllPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/test")
    public Post createTestPost() {
        Post post = new Post();
        post.setTitle("测试文章");
        post.setContent("这是一篇测试文章");
        post.setAuthor("佚名");
        post.setCreateTime(java.time.LocalDateTime.now());
        return postRepository.save(post);
    }
}
