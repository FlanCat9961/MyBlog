<!--
  App.vue 是前端应用的全局布局模块。
  它负责提供页面级的 Header、主内容区域和 Footer，是所有路由页面共同的外层框架。
  当前导航和站点名称仍然写在组件中，后续可以抽到 site.config.ts 和 nav.config.ts 形成可配置博客框架。
  <router-view> 是页面内容的插槽，具体首页、文章详情页和关于页都会渲染在这里。
  这个模块应该只处理全局布局与基础导航，不应该放入文章查询、后台管理等业务逻辑。
-->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow relative z-10">
      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <h1
          class="text-2xl font-bold text-gray-900 cursor-pointer flex items-center"
          @click="$router.push('/')"
        >
          <span class="text-blue-600 mr-2">&lt;/&gt;</span>
          Flan's Blog
        </h1>
        <nav class="flex gap-6">
          <router-link
            to="/"
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >首页</router-link
          >
          <router-link
            to="/about"
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >关于</router-link
          >
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50 pb-12">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 text-sm"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} FlanCat. Built with Vue 3 &
          Vite.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Main layout component
</script>
