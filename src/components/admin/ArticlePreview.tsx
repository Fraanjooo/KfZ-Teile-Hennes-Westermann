import DOMPurify from "dompurify";

interface ArticlePreviewProps {
  title: string;
  author: string;
  content: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
}

export const ArticlePreview = ({
  title,
  author,
  content,
  featuredImageUrl,
  featuredImageAlt,
}: ArticlePreviewProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const currentDate = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {featuredImageUrl && (
        <img
          src={featuredImageUrl}
          alt={featuredImageAlt}
          className="w-full h-64 object-cover"
        />
      )}
      
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-heading mb-4 text-blog-text">
          {title || "Artikel-Titel"}
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Geschrieben von <strong>{author || "Unbekannt"}</strong></span>
          <span>•</span>
          <span>{currentDate}</span>
        </div>

        <div
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  );
};