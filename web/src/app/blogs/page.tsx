"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
}

const avatarColors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColor(name: string) {
  const index =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
    avatarColors.length;
  return avatarColors[index];
}

function BlogCardSkeleton() {
  return (
    <div className="blog-card-skeleton">
      <div className="sk-avatar" />
      <div className="sk-line w-70" />
      <div className="sk-line w-100" />
      <div className="sk-line w-90" />
      <div className="sk-line w-40" />
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="blog-card-new">
      <div className="blog-card-header">
        <div className="blog-card-author">
          <div
            className="blog-card-avatar"
            style={{ backgroundColor: getColor(blog.author) }}
          >
            {getInitials(blog.author)}
          </div>
          <div className="blog-card-meta">
            <span className="blog-card-author-name">{blog.author}</span>
            <span className="blog-card-date">Just now</span>
          </div>
        </div>
      </div>
      <h3 className="blog-card-title">{blog.title}</h3>
      <p className="blog-card-desc">{blog.description}</p>
      <p className="blog-card-text">
        {blog.content.length > 120
          ? blog.content.slice(0, 120) + "..."
          : blog.content}
      </p>
      <div className="blog-card-footer">
        <button className="blog-card-btn">Read Article</button>
        <span className="blog-card-time">
          {Math.max(1, Math.ceil(blog.content.split(" ").length / 200))} min
          read
        </span>
      </div>
    </article>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, [setBlogs, setLoading]);

  return (
    <>
      <Navbar />

      <main className="blogs-main">
        <div className="blogs-container">
          <div className="blogs-top">
            <div className="blogs-top-left">
              <span className="blogs-badge">📚 Blog</span>
              <h1>Explore Articles</h1>
              <p>Thoughts, tutorials, and insights from our community.</p>
            </div>
            <Link href="/create-blog" className="blogs-write-btn">
              <span>+</span> Write Article
            </Link>
          </div>

          {loading ? (
            <div className="blogs-grid">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          ) : blogs.length === 0 ? (
            <div className="blogs-empty">
              <div className="blogs-empty-icon">📝</div>
              <h3>No articles yet</h3>
              <p>Be the first to share something with the world.</p>
              <Link href="/create-blog" className="blogs-empty-btn">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
