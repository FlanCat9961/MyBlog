/**
 * 前端应用启动模块负责创建 Vue 应用实例并挂载到页面根节点。
 * 这个模块集中注册全局能力，包括 Pinia 状态管理、Vue Router 路由系统和 Element Plus 组件库。
 * 全局样式、代码高亮样式和第三方组件样式也在这里统一导入，避免散落在业务页面中。
 * 该文件应保持轻量，只处理应用启动和全局插件装配，不承载具体业务逻辑。
 * 后续如果项目继续框架化，可以把插件注册拆到 app/providers.ts，让 main.ts 只保留启动流程。
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'highlight.js/styles/github.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
