import request from './request';
import { articles, Article } from '../mock/articles';

// 这里为了能切回 mock 我们定义一个环境变量或简单的 flag
const USE_MOCK = true;

// 模拟异步延迟
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface PaginatedResult<T> {
  total: number;
  items: T[];
}

export const getArticles = async (page = 1, pageSize = 5, tag?: string, keyword?: string): Promise<PaginatedResult<Article>> => {
  if (USE_MOCK) {
    await mockDelay(300);
    let filtered = articles;
    if (tag) {
      filtered = filtered.filter(a => a.tags?.includes(tag));
    }
    if (keyword) {
      const q = keyword.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
    }
    
    // Sort by date descending
    filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const start = (page - 1) * pageSize;
    return {
      total: filtered.length,
      items: filtered.slice(start, start + pageSize)
    };
  }
  return request.get('/articles', { params: { page, pageSize, tag, keyword } });
};

export const getArticleById = async (id: number): Promise<Article | null> => {
  if (USE_MOCK) {
    await mockDelay(300);
    const found = articles.find(a => a.id === id);
    if (!found) return null;
    return { ...found };
  }
  return request.get(`/articles/${id}`);
};
