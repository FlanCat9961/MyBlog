package org.example.myblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * MyBlogApplication 是后端 Spring Boot 应用的启动模块。
 * 它通过 @SpringBootApplication 开启自动配置、组件扫描和 Spring Boot 应用上下文初始化。
 * 当前后端的 Controller、Service、Repository 和 Entity 都位于 org.example.myblog 包路径下，因此可以被默认扫描到。
 * main 方法是本地开发、测试运行和未来服务器部署时的统一入口。
 * 这个类应保持简单，不应该直接写业务逻辑、数据库访问逻辑或接口处理逻辑。
 */
@SpringBootApplication
public class MyBlogApplication {
	public static void main(String[] args) {
		SpringApplication.run(MyBlogApplication.class, args);
	}

}
