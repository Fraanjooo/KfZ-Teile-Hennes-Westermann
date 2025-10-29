import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Clock, ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react";
import { Helmet } from "react-helmet";
import DOMPurify from "dompurify";
import { toast } from "sonner";

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
  author: string | null;
  author_id: string | null;
  seo_title: string | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [authorProfile, setAuthorProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

      // Load author profile
      if (data.author_id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.author_id)
          .single();
        if (profile) setAuthorProfile(profile);
      }

      // Load related posts based on tags
      if (data.tags && data.tags.length > 0) {
        const { data: related } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, featured_image_url, featured_image_alt")
          .eq("status", "published")
          .neq("id", data.id)
          .limit(3);
        if (related) setRelatedPosts(related);
      }
    }
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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      copy: url,
    };
    
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link kopiert!");
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
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
        <title>{post.seo_title || post.title} - Kfz-Teile Hennes Westermann Blog</title>
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
        <meta property="og:title" content={post.seo_title || post.title} />
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
        <meta name="twitter:title" content={post.seo_title || post.title} />
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
          {/* Hero Image - Full Width */}
          {post.featured_image_url && (
            <div className="w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden relative">
              <img
                src={post.featured_image_url}
                alt={post.featured_image_alt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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

            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <header className="mb-12">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="font-roboto text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-blog-text leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-roboto mb-8">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    {post.view_count} Aufrufe
                  </span>
                  {post.read_time_minutes && (
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      {post.read_time_minutes} Min. Lesezeit
                    </span>
                  )}
                </div>

                {/* Author Section */}
                {(post.author || authorProfile) && (
                  <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
                    {authorProfile?.avatar_url && (
                      <img
                        src={authorProfile.avatar_url}
                        alt={post.author || "Autor"}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-lg">
                        Geschrieben von {post.author}
                      </p>
                      {authorProfile?.full_name && (
                        <p className="text-sm text-muted-foreground">
                          {authorProfile.full_name}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed font-roboto mt-8">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Article Body */}
              <div
                className="blog-content prose prose-lg max-w-none font-roboto mb-16
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

              {/* Share Buttons */}
              <div className="flex flex-wrap items-center gap-4 py-8 border-y border-border">
                <span className="font-semibold font-roboto">Artikel teilen:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                  className="gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("copy")}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Link kopieren
                </Button>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-3xl font-heading font-bold mb-8">
                    Ähnliche Beiträge
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((related) => (
                      <Link 
                        key={related.id} 
                        to={`/blog/${related.slug}`} 
                        className="group"
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                          {related.featured_image_url && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={related.featured_image_url}
                                alt={related.featured_image_alt || related.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardContent className="p-4">
                            <h3 className="font-heading font-semibold text-lg line-clamp-2 group-hover:text-blog-accent transition-colors mb-2">
                              {related.title}
                            </h3>
                            {related.excerpt && (
                              <p className="text-sm text-muted-foreground font-roboto line-clamp-2">
                                {related.excerpt}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section className="mt-16 p-8 bg-gradient-to-br from-blog-accent/10 to-blog-accent/5 rounded-2xl text-center">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Lass uns dein nächstes Projekt starten
                </h2>
                <p className="text-lg text-muted-foreground font-roboto mb-6">
                  Interessiert an unseren Leistungen? Kontaktiere uns für ein unverbindliches Gespräch.
                </p>
                <Link to="/#contact">
                  <Button size="lg" className="bg-blog-accent hover:bg-blog-accent/90 text-white h-14 px-8">
                    Projekt anfragen
                  </Button>
                </Link>
              </section>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
