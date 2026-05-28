export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Vue 3 Composition API 入门指南",
    summary: "本文带你快速了解 Vue 3 的 Composition API，以及它的优势。",
    content: "随着 Vue 3 的发布，Composition API 成为了社区关注的焦点。相比于 Options API，它提供了更好的逻辑复用和代码组织方式...\n\n(此处省略长篇正文，仅作测试数据)",
    date: "2026-05-20"
  },
  {
    id: 2,
    title: "Tailwind CSS 实战记录",
    summary: "记录我在项目中如何通过 Tailwind CSS 提升样式的开发效率。",
    content: "在过去的项目中，我经常因为命名 CSS 类和切换文件而感到繁琐。Tailwind CSS 提供了一种原子化的 CSS 编写方式...\n\n(此处省略长篇正文)",
    date: "2026-05-18"
  },
  {
    id: 3,
    title: "如何从零搭建博客前端",
    summary: "带你一步一步用 Vue 3、Vite 和 Element Plus 构建现代博客前端。",
    content: "构建一个属于自己的博客是很多开发者的心愿。在这个教程里，我们不使用任何现成的框架模板...\n\n(此处省略详细教程内容)",
    date: "2026-05-21"
  }
];