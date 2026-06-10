"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Willow Blogs</div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/create-blog">Create Blog</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}
