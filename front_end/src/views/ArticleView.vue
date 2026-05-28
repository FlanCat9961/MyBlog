<!--
  ArticleView 是博客前台文章详情模块。
  它根据路由参数中的文章 id 请求对应文章，并展示标题、发布日期和正文内容。
  页面使用 articleStore 的 currentArticle 和 detailLoading 状态，避免直接读取 Mock 数据。
  当用户从一个文章详情切换到另一个文章详情时，watch 会重新触发文章加载。
  后续可以在这个模块中加入 Markdown 渲染、代码高亮、文章目录、上一篇下一篇和 SEO 元信息更新。
-->
<template>
  <div class="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
    <el-button @click="router.back()" class="mb-6">返回列表</el-button>

    <div v-if="articleStore.detailLoading" class="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <el-skeleton animated :rows="8" />
    </div>

    <div
      v-else-if="article"
      class="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
    >
      <h1 class="text-3xl font-extrabold text-gray-900 mb-4">
        {{ article.title }}
      </h1>
      <div class="text-sm text-gray-500 mb-8 border-b pb-4">
        发布于 {{ article.date }}
      </div>

      <div class="prose max-w-none text-gray-700 whitespace-pre-wrap">
        {{ article.content }}
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-500">
      <el-empty description="文章不存在" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";

const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();

const articleId = computed(() => Number(route.params.id));

const article = computed(() => articleStore.currentArticle);

const fetchArticle = () => {
  if (!Number.isNaN(articleId.value)) {
    articleStore.fetchArticleById(articleId.value);
  }
};

onMounted(fetchArticle);

watch(articleId, () => {
  fetchArticle();
});
</script>
