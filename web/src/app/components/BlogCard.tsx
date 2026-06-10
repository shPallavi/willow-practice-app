interface BlogCardProps {
  title: string;
  description: string;
  author?: string;
  content?: string;
}

export default function BlogCard({
  title,
  description,
  author,
  content,
}: BlogCardProps) {
  const initials = author
    ? author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const colors = [
    "#2563eb",
    "#7c3aed",
    "#db2777",
    "#059669",
    "#d97706",
    "#dc2626",
  ];
  const colorIndex = author
    ? author.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length
    : 0;
  const avatarColor = colors[colorIndex];

  return (
    <div className="blog-card-modern">
      <div className="card-top">
        <div className="author-badge">
          <div className="author-avatar" style={{ background: avatarColor }}>
            {initials}
          </div>
          <span className="author-name">{author || "Unknown"}</span>
        </div>
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>

      {content && (
        <p className="card-preview">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </p>
      )}

      <div className="card-footer">
        <button className="read-btn">Read More →</button>
        <span className="read-time">
          {content
            ? Math.max(1, Math.ceil(content.split(" ").length / 200))
            : 1}{" "}
          min read
        </span>
      </div>
    </div>
  );
}
