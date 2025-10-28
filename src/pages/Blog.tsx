import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Eye, Clock } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string;
  view_count: number;
  read_time_minutes: number | null;
  tags: string[] | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, published_at, view_count, read_time_minutes, tags, featured_image_url, featured_image_alt")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
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

  return (
    <>
      <Helmet>
        <title>Blog - Automotive Expertise & Insights</title>
        <meta
          name="description"
          content="Entdecken Sie Fachartikel und Insights aus der Automobilbranche. Tipps für B2B und B2C Kunden."
        />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-blog-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blog-accent/5 to-blog-accent/10">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-center text-blog-text">
                Unser Blog
              </h1>
              <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto font-roboto">
                Aktuelle Insights, Tipps und Neuigkeiten aus der Automobilbranche
              </p>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Beiträge werden geladen...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Noch keine Beiträge veröffentlicht.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-blog-hover border-blog-border bg-blog-card-bg">
                        {/* Featured Image */}
                        {post.featured_image_url && (
                          <div className="overflow-hidden aspect-video">
                            <img 
                              src={post.featured_image_url} 
                              alt={post.featured_image_alt || post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                        
                        <CardHeader>
                          <CardTitle className="line-clamp-2 mb-2 font-heading text-2xl group-hover:text-blog-accent transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-3 text-xs font-roboto">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.published_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.view_count}
                            </span>
                            {post.read_time_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.read_time_minutes} Min.
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 font-roboto leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="secondary"
                                  className="font-roboto text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
