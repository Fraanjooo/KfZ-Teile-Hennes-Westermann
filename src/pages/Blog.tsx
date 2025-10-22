import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Eye } from "lucide-react";
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
      .select("id, title, slug, excerpt, published_at, view_count, read_time_minutes, tags")
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

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Unser Blog
              </h1>
              <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
                Aktuelle Insights, Tipps und Neuigkeiten aus der Automobilbranche
              </p>
            </div>
          </section>

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="line-clamp-2 mb-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.published_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.view_count}
                            </span>
                            {post.read_time_minutes && (
                              <span>{post.read_time_minutes} Min. Lesezeit</span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                              {post.excerpt}
                            </p>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag, idx) => (
                                <Badge key={idx} variant="secondary">
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
