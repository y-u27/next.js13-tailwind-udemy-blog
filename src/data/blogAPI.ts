import { Article } from "@/types";
import { notFound } from "next/navigation";

export const getAllArticles = async (): Promise<Article[]> => {
  // ↓更新が多いためSSRを使う
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); // SSR

  if (!res.ok) {
    throw new Error("エラー発生");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  // ↓シリアライズ→データを文字列化できる
  const articles = await res.json();
  return articles;
};

export const getDetailArticles = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 60 },
  }); // SSR

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラー発生");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const article = await res.json();
  return article;
};

// 投稿作成用API
export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  // ↓toISOStringで現在の日時を取得できるようになる
  const currentDatetime = new Date().toISOString();

  const res = await fetch(`http://localhost:3001/posts`, {
    // ↓投稿になるので「POST」になる
    method: "POST",
    // ↓json形式でデータを送る
    headers: {
      "Content-Type": "application/json",
    },
    // ↓何をリクエストしてデータを保存するのか→URLの情報・タイトル・ブログのタイトル・本文内容
    body: JSON.stringify({id, title, content, createdAt: currentDatetime}),
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラー発生");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newArticle = await res.json();
  return newArticle;
};

// 投稿削除用API
export const deleteArticle = async (
  id: string,
): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    // ↓削除するので「DELETE」になる
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("エラー発生");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const deleteArticle = await res.json();
  return deleteArticle;
};
