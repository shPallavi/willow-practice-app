"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
}

export default function Home() {
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
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <section className="blogs-section">
        <h2>Latest Blogs</h2>

        {loading ? (
          <p className="loading-text">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="empty-text">No blogs yet. Create one!</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                author={blog.author}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
