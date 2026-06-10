"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("profile-avatar");
    }
    return null;
  });
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/users/profile`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setLoading(false);
      });
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatar(base64);
      localStorage.setItem("profile-avatar", base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (profile) {
      setProfile({ ...profile, name, email });
    }
    setEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account settings</p>
        </div>

        {loading ? (
          <p className="loading-text">Loading profile...</p>
        ) : profile ? (
          <div className="profile-content">
            {/* Avatar Section */}
            <div className="avatar-section">
              <div
                className="avatar-wrapper"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="avatar-image"
                    unoptimized
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="avatar-overlay">
                  <span>📷</span>
                  <p>Change Photo</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
              <p className="avatar-hint">Click to upload a profile photo</p>
            </div>

            {/* Info Section */}
            <div className="profile-info-card">
              <div className="card-header">
                <h2>Personal Information</h2>
                <button
                  className="edit-btn"
                  onClick={() => (editing ? handleSave() : setEditing(true))}
                >
                  {editing ? "✓ Save" : "✎ Edit"}
                </button>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <p>{profile.name}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Email Address</label>
                  {editing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Role</label>
                  <p className="role-badge">{profile.role}</p>
                </div>

                <div className="info-item">
                  <label>Member Since</label>
                  <p>August 2026</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📝</span>
                <div>
                  <h3>3</h3>
                  <p>Blogs Written</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💬</span>
                <div>
                  <h3>12</h3>
                  <p>Comments</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">❤️</span>
                <div>
                  <h3>48</h3>
                  <p>Likes Received</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="empty-text">Failed to load profile.</p>
        )}
      </div>

      <Footer />
    </>
  );
}
