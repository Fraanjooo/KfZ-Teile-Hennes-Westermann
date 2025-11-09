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
import { motion } from "framer-motion";

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
      
      // Use atomic increment to prevent race conditions
      await supabase.rpc('increment_view_count', { post_id: data.id });

      if (data.author_id) {
        // Use public_profiles view to get author info without exposing email
        const { data: profile } = await supabase
          .from("public_profiles")
          .select("*")
          .eq("id", data.author_id)
          .single();
        if (profile) setAuthorProfile(profile);
      }

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
          <p className="text-muted-foreground text-lg">Beitrag wird geladen...</p>
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
            <h1 className="text-4xl font-serif font-normal mb-4">Beitrag nicht gefunden</h1>
            <Link to="/blog" className="text-blog-accent hover:underline">
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
        <title>{post.seo_title || post.title} - KfZ-Teile Hennes Westermann</title>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden relative"
            >
              <img
                src={post.featured_image_url}
                alt={post.featured_image_alt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>
          )}

          {/* Article Content */}
          <article className="container mx-auto px-4 py-16 md:py-24 max-w-[720px]">
            {/* Back to Blog Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-blog-accent hover:text-blog-accent-hover mb-12 transition-colors text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Übersicht
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              {/* Category Badge */}
              {post.tags && post.tags.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="mb-6 bg-blog-badge-bg text-blog-accent font-medium border-0 px-4 py-1.5 text-sm"
                >
                  {post.tags[0]}
                </Badge>
              )}

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal mb-10 text-blog-text leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-10 pb-10 border-b border-blog-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blog-accent flex items-center justify-center text-white font-medium">
                    {post.author?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-medium text-blog-text">{post.author || 'Autor'}</p>
                  </div>
                </div>
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

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </motion.header>

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="blog-content prose prose-lg max-w-none mb-16
                prose-headings:font-serif prose-headings:font-normal prose-headings:text-blog-text
                prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
                prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4
                prose-p:text-blog-text prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                prose-a:text-blog-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-blog-text prose-strong:font-semibold
                prose-ul:my-8 prose-ol:my-8
                prose-li:my-3 prose-li:text-blog-text prose-li:text-lg
                prose-img:rounded-[20px] prose-img:shadow-blog prose-img:my-12
                prose-blockquote:border-l-4 prose-blockquote:border-blog-accent 
                prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-12"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 py-8 border-y border-blog-border"
            >
              <span className="font-medium text-blog-text">Artikel teilen:</span>
              <Button
                variant="outline"
                size="default"
                onClick={() => handleShare("linkedin")}
                className="gap-2 border-blog-border hover:border-blog-accent hover:text-blog-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => handleShare("twitter")}
                className="gap-2 border-blog-border hover:border-blog-accent hover:text-blog-accent"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => handleShare("copy")}
                className="gap-2 border-blog-border hover:border-blog-accent hover:text-blog-accent"
              >
                <Share2 className="h-4 w-4" />
                Link kopieren
              </Button>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-20"
              >
                <h2 className="text-4xl font-serif font-normal mb-10 text-blog-text">
                  Ähnliche Beiträge
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/blog/${related.slug}`} 
                      className="group"
                    >
                      <Card className="h-full hover:shadow-blog-hover transition-all duration-300 overflow-hidden border-0 shadow-blog rounded-[20px]">
                        {related.featured_image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={related.featured_image_url}
                              alt={related.featured_image_alt || related.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        )}
                        <CardContent className="p-5">
                          <h3 className="font-serif text-xl line-clamp-2 group-hover:text-blog-accent transition-colors mb-2">
                            {related.title}
                          </h3>
                          {related.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.excerpt}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-20 p-12 bg-blog-accent rounded-[20px] text-center"
            >
              <h2 className="text-4xl font-serif font-normal mb-6 text-white">
                Lassen Sie uns Ihr nächstes Projekt starten
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Interessiert an unseren Leistungen? Kontaktieren Sie uns für ein unverbindliches Gespräch.
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white hover:bg-white/90 text-blog-accent border-0 h-14 px-10 font-medium cursor-pointer"
                onClick={() => {
                  window.location.href = '/#contact';
                }}
              >
                Projekt anfragen
              </Button>
            </motion.section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
