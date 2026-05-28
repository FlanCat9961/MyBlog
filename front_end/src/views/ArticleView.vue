<template>
  <div class="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
    <el-button @click="router.back()" class="mb-6">返回列表</el-button>

    <div
      v-if="article"
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
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { articles } from "../mock/articles";

const route = useRoute();
const router = useRouter();

const articleId = Number(route.params.id);

const article = computed(() => {
  return articles.find((a) => a.id === articleId) || null;
});
</script>
