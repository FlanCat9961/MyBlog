package org.example.myblog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Post 是文章模块的 JPA 实体模型。
 * 它描述了文章表在 Java 代码中的基本结构，并由 Hibernate 映射到数据库表。
 * 当前字段包括 id、title、content、author、createTime 和 updateTime，满足最小文章 CRUD 需求。
 * 这个实体属于持久化模型，不建议在长期项目中直接暴露给前端接口。
 * 后续博客框架化时，应扩展 slug、summary、tags、category、status、publishedAt 和 viewCount 等字段。
 */
@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
