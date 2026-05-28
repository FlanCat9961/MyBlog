package org.example.myblog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * MyBlogApplicationTests 是后端应用上下文启动测试模块。
 * 它用于验证 Spring Boot 应用能否在测试环境下正常加载所有 Bean。
 * 当前测试激活 test profile，并使用 H2 内存数据库避免依赖本地 MySQL。
 * 这个测试虽然简单，但可以及时发现配置错误、依赖缺失和 JPA 映射问题。
 * 后续可以在此基础上继续增加 Controller 集成测试、Service 单元测试和 Repository 数据访问测试。
 */
@SpringBootTest
@ActiveProfiles("test")
class MyBlogApplicationTests {

	@Test
	void contextLoads() {
	}

}
