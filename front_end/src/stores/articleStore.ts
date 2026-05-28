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
