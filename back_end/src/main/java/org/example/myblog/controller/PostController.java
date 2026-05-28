package org.example.myblog.controller;

import org.example.myblog.entity.Post;
import org.example.myblog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    //获取文章列表
    @GetMapping
    public List<Post> findAllPosts(){
        return postService.findAllPosts();
    }

    //查看单篇文章
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id){
        return postService.findPostById(id);
    }

    //发表文章
    @PostMapping
    public Post createPost(@RequestBody Post post){
        return postService.createPost(post);
    }

    //更新文章
    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post){
        return postService.updatePost(id, post);
    }

    //删除文章
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postService.detetePost(id);
    }
}
