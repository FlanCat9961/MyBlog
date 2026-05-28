<!--
  HomeView 是博客前台首页模块。
  它负责展示搜索区、当前标签提示、文章列表、加载骨架屏、空状态和分页控件。
  页面通过 articleStore 获取文章数据，并把搜索、标签过滤和分页事件委托给 store 处理。
  点击文章卡片会跳转到文章详情页，点击标签则会更新当前标签筛选条件。
  后续这个模块可以继续拆出 HeroSearch、ArticleCard 和 ArticlePagination 等组件，以提升复用性。
-->
<template>
  <div class="w-full">
    <!-- 动态渐变背景高亮搜索区 (Hero Section) -->
    <div
      class="w-full h-72 md:h-96 flex flex-col items-center justify-center hero-bg relative overflow-hidden shadow-inner"
    >
      <div class="relative z-10 w-full max-w-2xl px-4 text-center">
        <h1
          class="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-wide drop-shadow-md"
        >
          探索与分享
        </h1>
        <el-input
          v-model="localSearch"
          placeholder="搜索您感兴趣的文章..."
          clearable
          size="large"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
          class="custom-search shadow-2xl"
        >
          <template #append>
            <el-button @click="handleSearch" class="font-bold">搜 索</el-button>
          </template>
        </el-input>
      </div>

      <!-- 简单的玻璃态装饰小球 -->
      <div
        class="absolute top-10 left-1/4 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-10 right-1/4 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"
      ></div>
    </div>

    <!-- 主体文章列表区域 -->
    <div class="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
      <div
        v-if="articleStore.currentTag"
        class="mb-8 flex items-center bg-blue-50 p-4 rounded-lg text-blue-800"
      >
        <span class="mr-3 font-medium">当前活跃标签:</span>
        <el-tag closable @close="clearTag" size="large" effect="dark">{{
          articleStore.currentTag
        }}</el-tag>
      </div>

      <div v-if="articleStore.listLoading" class="space-y-6">
        <el-card v-for="i in 3" :key="i" shadow="hover">
          <el-skeleton animated>
            <template #template>
              <div class="flex justify-between items-center mb-2">
                <el-skeleton-item variant="h1" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 10%" />
              </div>
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 80%" />
            </template>
          </el-skeleton>
        </el-card>
      </div>

      <div
        v-else-if="articleStore.articles.length === 0"
        class="text-center text-gray-500 py-20 bg-white rounded-lg border border-gray-100"
      >
        <el-empty description="未找到相关的文章" />
      </div>

      <div v-else class="space-y-6">
        <el-card
          v-for="article in articleStore.articles"
          :key="article.id"
          shadow="hover"
          class="cursor-pointer transition duration-300"
          @click="goToArticle(article.id)"
        >
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-bold text-gray-800">{{ article.title }}</h2>
            <span class="text-sm text-gray-400 whitespace-nowrap ml-4">{{
              article.date
            }}</span>
          </div>
          <p class="text-gray-600 mb-4">{{ article.summary }}</p>

          <div class="flex gap-2" @click.stop>
            <el-tag
              v-for="tag in article.tags"
              :key="tag"
              size="small"
              type="info"
              class="cursor-pointer hover:bg-blue-100 transition-colors"
              @click="setTag(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-card>

        <div class="flex justify-center mt-10">
          <el-pagination
            v-model:current-page="articleStore.currentPage"
            :page-size="articleStore.pageSize"
            :total="articleStore.total"
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";

const router = useRouter();
const articleStore = useArticleStore();

const localSearch = ref("");

onMounted(() => {
  localSearch.value = articleStore.searchQuery;
  articleStore.fetchArticles(1);
});

const handleSearch = () => {
  articleStore.setSearchQuery(localSearch.value);
};

const setTag = (tag: string) => {
  articleStore.setTag(tag);
};

const clearTag = () => {
  articleStore.setTag("");
};

const handlePageChange = (page: number) => {
  articleStore.fetchArticles(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToArticle = (id: number) => {
  router.push(`/article/${id}`);
};
</script>

<style scoped>
/* 动态流光渐变背景 */
.hero-bg {
  background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f43f5e);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 深度定制 Element Plus 搜索框样式，使其更突出、更美观 */
:deep(.custom-search .el-input__wrapper) {
  padding: 12px 20px;
  font-size: 1.1rem;
  border-radius: 8px 0 0 8px;
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

:deep(.custom-search .el-input__wrapper.is-focus) {
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8) inset;
}

:deep(.custom-search .el-input-group__append) {
  border-radius: 0 8px 8px 0;
  background-color: #1e40af; /* Tailwind blue-800 */
  color: white;
  border: none;
  font-size: 1.1rem;
  padding: 0 30px;
  transition: background-color 0.3s;
}

:deep(.custom-search .el-input-group__append:hover) {
  background-color: #1d4ed8; /* Tailwind blue-700 */
  cursor: pointer;
}
</style>
