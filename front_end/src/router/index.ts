/**
 * 路由模块负责维护前端页面路径和 Vue 组件之间的映射关系。
 * 当前项目包含首页、文章详情页和关于页三个基础访客路由。
 * 文章详情页和关于页使用动态 import，可以让这些页面在访问时再加载，减少首屏包体积。
 * 路由历史模式使用 createWebHistory，并读取 Vite 的 BASE_URL 以适配不同部署路径。
 * 后续增加归档、标签、搜索和后台管理页面时，应优先在这里保持清晰的路由分组。
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
