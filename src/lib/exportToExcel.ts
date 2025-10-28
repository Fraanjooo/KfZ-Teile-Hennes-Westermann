interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  view_count: number;
  created_at: string;
  tags: string[] | null;
  excerpt: string | null;
  meta_description: string | null;
}

export const exportBlogPostsToExcel = (posts: BlogPost[]) => {
  // Create CSV content
  const headers = [
    "Titel",
    "Slug",
    "Status",
    "Veröffentlicht am",
    "Aufrufe",
    "Erstellt am",
    "Tags",
    "Excerpt",
    "Meta Description"
  ];

  const csvRows = [
    headers.join(","),
    ...posts.map(post => [
      `"${post.title.replace(/"/g, '""')}"`,
      post.slug,
      post.status,
      post.published_at ? new Date(post.published_at).toLocaleDateString("de-DE") : "",
      post.view_count,
      new Date(post.created_at).toLocaleDateString("de-DE"),
      `"${post.tags?.join(", ") || ""}"`,
      `"${(post.excerpt || "").replace(/"/g, '""')}"`,
      `"${(post.meta_description || "").replace(/"/g, '""')}"`
    ].join(","))
  ];

  const csvContent = csvRows.join("\n");
  
  // Create blob and download
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `blog-posts-${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
