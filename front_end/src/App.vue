<template>
  <header class="bg-white shadow">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1
        class="text-2xl font-bold text-gray-900 cursor-pointer"
        @click="$router.push('/')"
      >
        My Personal Blog
      </h1>
    </div>
  </header>
  <main class="flex-1 bg-gray-50">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
// Main layout component
</script>
