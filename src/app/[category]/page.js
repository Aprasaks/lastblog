import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostsIndexClient from '@/components/PostsIndexClient';

export const revalidate = 0; // ISR 필요시

export default async function PostsIndexPage() {
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);

    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title || filename.replace(/\.md$/, ''),
      category: data.category || '기타',
      tag: data.tag,
    };
  });

  // 카테고리별로 묶기
  const byCategory = {};
  posts.forEach(post => {
    if (!byCategory[post.category]) byCategory[post.category] = [];
    byCategory[post.category].push(post);
  });
  const categories = Object.entries(byCategory).map(([category, posts]) => ({
    category,
    posts,
  }));

  return <PostsIndexClient categories={categories} />;
}