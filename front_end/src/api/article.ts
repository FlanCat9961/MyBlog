/**
 * 文章 API 模块负责封装前端和文章数据源之间的访问逻辑。
 * 它支持通过 VITE_USE_MOCK=true 切换到本地 Mock 数据，方便没有后端时独立开发前端页面。
 * 默认情况下，该模块会请求 Spring Boot 后端的 /api/posts 接口，并把后端 Post 转成前端 Article 结构。
 * 当前分页、标签过滤和关键字搜索仍在前端完成，这是 V0.1 阶段的轻量兼容方案。
 * 后续进入 V0.2 后，分页、搜索、标签和发布状态应逐步下沉到后端接口中实现。
 */
import request from './request';
import { articles, Article } from '../mock/articles';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

interface BackendPost {
  id: number;
  title: string;
  content: string;
  author?: string;
  createTime?: string;
  updateTime?: string;
}

// 模拟异步延迟
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface PaginatedResult<T> {
  total: number;
  items: T[];
}

const toArticle = (post: BackendPost): Article => {
  const summary = post.content.length > 120
    ? `${post.content.slice(0, 120)}...`
    : post.content;

  return {
    id: post.id,
    title: post.title,
    summary,
    content: post.content,
    date: post.createTime?.slice(0, 10) || post.updateTime?.slice(0, 10) || '',
    tags: []
  };
};

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
  const posts = await request.get<unknown, BackendPost[]>('/posts');
  let filtered = posts.map(toArticle);

  if (tag) {
    filtered = filtered.filter(a => a.tags?.includes(tag));
  }
  if (keyword) {
    const q = keyword.toLowerCase();
    filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
  }

  filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const start = (page - 1) * pageSize;

  return {
    total: filtered.length,
    items: filtered.slice(start, start + pageSize)
  };
};

export const getArticleById = async (id: number): Promise<Article | null> => {
  if (USE_MOCK) {
    await mockDelay(300);
    const found = articles.find(a => a.id === id);
    if (!found) return null;
    return { ...found };
  }
  const post = await request.get<unknown, BackendPost>(`/posts/${id}`);
  return toArticle(post);
};
