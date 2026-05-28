package org.example.myblog.repository;

import org.example.myblog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * PostRepository 是文章模块的数据访问层。
 * 它继承 JpaRepository 后自动获得基础的新增、删除、修改、查询和分页能力。
 * 当前仓库没有自定义查询方法，因为 V0.1 只需要最基础的文章 CRUD。
 * 这个模块应该只负责数据库访问相关逻辑，不应该处理 HTTP 请求或页面展示规则。
 * 后续实现搜索、按标签查询、按发布时间排序和只查询已发布文章时，可以在这里增加派生查询或 JPQL 查询。
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
