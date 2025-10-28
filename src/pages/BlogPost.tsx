import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import DOMPurify from "dompurify";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published_at: string;
  view_count: number;
  read_time_minutes: number | null;
  tags: string[] | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  meta_description: string | null;
  seo_keywords: string[] | null;
  canonical_url: string | null;
}

interface NavigationPost {
  slug: string;
  title: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState<NavigationPost | null>(null);
  const [nextPost, setNextPost] = useState<NavigationPost | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", postSlug)
      .eq("status", "published")
      .single();

    if (!error && data) {
      setPost(data);
      
      // Increment view count
      await supabase
        .from("blog_posts")
        .update({ view_count: data.view_count + 1 })
        .eq("id", data.id);

      // Load navigation posts
      loadNavigationPosts(data.published_at);
    }
    setLoading(false);
  };

  const loadNavigationPosts = async (currentPublishedAt: string) => {
    // Get previous post
    const { data: prevData } = await supabase
      .from("blog_posts")
      .select("slug, title")
      .eq("status", "published")
      .lt("published_at", currentPublishedAt)
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    if (prevData) setPrevPost(prevData);

    // Get next post
    const { data: nextData } = await supabase
      .from("blog_posts")
      .select("slug, title")
      .eq("status", "published")
      .gt("published_at", currentPublishedAt)
      .order("published_at", { ascending: true })
      .limit(1)
      .single();

    if (nextData) setNextPost(nextData);
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
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-blog-background">
          <p className="text-muted-foreground font-roboto">Beitrag wird geladen...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-blog-background">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Beitrag nicht gefunden</h1>
            <Link to="/blog" className="text-blog-accent hover:underline font-roboto">
              Zurück zur Blogübersicht
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Helmet>
        <title>{post.title} - Kfz-Teile Hennes Westermann Blog</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt || post.title}
        />
        {post.seo_keywords && post.seo_keywords.length > 0 && (
          <meta name="keywords" content={post.seo_keywords.join(", ")} />
        )}
        <link
          rel="canonical"
          href={post.canonical_url || `${window.location.origin}/blog/${post.slug}`}
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.meta_description || post.excerpt || post.title}
        />
        {post.featured_image_url && (
          <meta property="og:image" content={post.featured_image_url} />
        )}
        <meta property="og:url" content={`${window.location.origin}/blog/${post.slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.meta_description || post.excerpt || post.title}
        />
        {post.featured_image_url && (
          <meta name="twitter:image" content={post.featured_image_url} />
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col bg-blog-background">
        <Header />

        <main className="flex-1">
          {/* Hero Image */}
          {post.featured_image_url && (
            <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden">
              <img
                src={post.featured_image_url}
                alt={post.featured_image_alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article className="container mx-auto px-8 py-12 max-w-[1400px]">
            {/* Back to Blog Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-blog-accent hover:text-blog-accent-hover mb-8 font-roboto transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Übersicht
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-blog-text leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground font-roboto">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {post.view_count} Aufrufe
                </span>
                {post.read_time_minutes && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.read_time_minutes} Min. Lesezeit
                  </span>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="font-roboto">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed font-roboto">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Article Body */}
            <div
              className="blog-content prose prose-lg max-w-none font-roboto
                prose-headings:font-bold prose-headings:text-blog-text
                prose-h2:font-serif prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:font-serif prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-blog-text prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blog-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-blog-text prose-strong:font-semibold
                prose-ul:my-6 prose-ol:my-6
                prose-li:my-2 prose-li:text-blog-text
                prose-img:rounded-xl prose-img:shadow-blog
                prose-blockquote:border-l-4 prose-blockquote:border-blog-accent 
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Navigation to Previous/Next Posts */}
            {(prevPost || nextPost) && (
              <nav className="mt-16 pt-8 border-t border-blog-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {prevPost && (
                    <Link
                      to={`/blog/${prevPost.slug}`}
                      className="group p-6 border border-blog-border rounded-xl hover:shadow-blog transition-all bg-blog-card-bg"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 font-roboto">
                        <ArrowLeft className="h-4 w-4" />
                        Vorheriger Beitrag
                      </div>
                      <h3 className="font-heading font-semibold text-lg group-hover:text-blog-accent transition-colors">
                        {prevPost.title}
                      </h3>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      to={`/blog/${nextPost.slug}`}
                      className="group p-6 border border-blog-border rounded-xl hover:shadow-blog transition-all bg-blog-card-bg md:text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2 font-roboto">
                        Nächster Beitrag
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg group-hover:text-blog-accent transition-colors">
                        {nextPost.title}
                      </h3>
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
