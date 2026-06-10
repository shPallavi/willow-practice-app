"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content, author, imageUrl }),
      });

      if (res.ok) {
        router.push("/blogs");
      } else {
        alert("Failed to create blog");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-blog-page">
        <div className="create-blog-inner">
          {/* Header */}
          <div className="create-blog-header">
            <div>
              <span className="create-blog-badge">✍️ Write</span>
              <h1>Create a new blog</h1>
              <p>Share your thoughts, stories, and ideas with the world.</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="create-blog-card">
            <form onSubmit={handleSubmit} className="create-blog-form">
              {/* Title */}
              <div className="form-field">
                <label htmlFor="title">
                  <span className="field-icon">📄</span> Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter a compelling title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-field">
                <label htmlFor="description">
                  <span className="field-icon">📝</span> Short Description
                </label>
                <input
                  id="description"
                  type="text"
                  placeholder="A brief summary of your blog post..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Two-column row */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="author">
                    <span className="field-icon">👤</span> Author Name
                  </label>
                  <input
                    id="author"
                    type="text"
                    placeholder="Your name or pen name..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="imageUrl">
                    <span className="field-icon">🖼️</span> Cover Image URL
                  </label>
                  <input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="form-field">
                <label htmlFor="content">
                  <span className="field-icon">✏️</span> Blog Content
                </label>
                <textarea
                  id="content"
                  placeholder="Write your blog content here... Share your knowledge, experiences, or stories. Be creative and authentic."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                />
                <span className="char-count">
                  {content.length} character{content.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-publish"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="publishing-state">
                      <span className="spinner"></span>
                      Publishing...
                    </span>
                  ) : (
                    <span>✨ Publish Blog</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
