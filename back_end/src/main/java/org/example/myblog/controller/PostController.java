package org.example.myblog.controller;

import org.example.myblog.entity.Post;
import org.example.myblog.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * PostController 是文章模块的 HTTP 接口层。
 * 它负责把前端发来的 /api/posts 请求映射到对应的文章服务方法。
 * 当前控制器提供文章列表、文章详情、创建文章、更新文章和删除文章五个基础 CRUD 接口。
 * 该模块只做请求入口编排，不应该直接访问数据库或承载复杂业务规则。
 * 后续框架化时，这里应逐步引入 DTO、统一响应结构、参数校验和权限控制。
 */
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

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
        postService.deletePost(id);
    }
}
