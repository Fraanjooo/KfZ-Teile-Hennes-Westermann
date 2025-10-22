import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  seo_keywords: string[] | null;
  canonical_url: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  published_at: string;
  view_count: number;
  read_time_minutes: number | null;
  tags: string[] | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      navigate("/blog");
      return;
    }

    setPost(data);
    
    // Increment view count
    await supabase
      .from("blog_posts")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("id", data.id);

    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Beitrag wird geladen...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const canonicalUrl = post.canonical_url || `${window.location.origin}/blog/${post.slug}`;
  const metaDescription = post.meta_description || post.excerpt || post.title;

  return (
    <>
      <Helmet>
        <title>{post.title} - Blog</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {post.seo_keywords && post.seo_keywords.length > 0 && (
          <meta name="keywords" content={post.seo_keywords.join(", ")} />
        )}
        {post.featured_image_url && (
          <>
            <meta property="og:image" content={post.featured_image_url} />
            <meta name="twitter:image" content={post.featured_image_url} />
          </>
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <article>
            <header className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="container mx-auto px-4 max-w-4xl">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/blog")}
                  className="mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück zur Übersicht
                </Button>

                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {post.view_count} Aufrufe
                  </span>
                  {post.read_time_minutes && (
                    <span>{post.read_time_minutes} Min. Lesezeit</span>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {post.featured_image_url && (
              <section className="py-8 bg-muted/30">
                <div className="container mx-auto px-4 max-w-4xl">
                  <img
                    src={post.featured_image_url}
                    alt={post.featured_image_alt || post.title}
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </section>
            )}

            <section className="py-12">
              <div className="container mx-auto px-4 max-w-4xl">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
