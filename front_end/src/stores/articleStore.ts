/**
 * 文章状态模块使用 Pinia 管理文章列表、文章详情和查询条件。
 * 它把页面组件中的加载状态、分页参数、当前标签和搜索关键字集中到一个可复用 store 中。
 * HomeView 主要依赖列表状态，ArticleView 主要依赖 currentArticle 和 detailLoading。
 * 这种结构可以减少组件之间的重复请求逻辑，让页面更专注于展示和交互。
 * 后续如果文章模块继续扩展，可以在这里增加草稿、发布状态、缓存策略和错误提示状态。
 */
import { defineStore } from 'pinia';
import { getArticles, getArticleById } from '../api/article';
import { Article } from '../mock/articles';

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [] as Article[],
    total: 0,
    listLoading: false,
    currentArticle: null as Article | null,
    detailLoading: false,
    
    // pagination params
    currentPage: 1,
    pageSize: 5,
    currentTag: '',
    searchQuery: ''
  }),

  actions: {
    async fetchArticles(page = 1) {
      this.listLoading = true;
      this.currentPage = page;
      try {
        const { total, items } = await getArticles(
          this.currentPage,
          this.pageSize,
          this.currentTag,
          this.searchQuery
        );
        this.articles = items;
        this.total = total;
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        this.listLoading = false;
      }
    },
    
    async fetchArticleById(id: number) {
      this.detailLoading = true;
      this.currentArticle = null; // reset before fetch
      try {
        const article = await getArticleById(id);
        if (article) {
          this.currentArticle = article;
        }
      } catch (err) {
        console.error("Failed to fetch article details:", err);
      } finally {
        this.detailLoading = false;
      }
    },
    
    setTag(tag: string) {
      this.currentTag = tag;
      this.fetchArticles(1);
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.fetchArticles(1);
    }
  }
});
