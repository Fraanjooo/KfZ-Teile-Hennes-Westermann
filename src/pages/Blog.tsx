import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Get all unique categories from tags
  const categories = ["all", ...Array.from(new Set(posts.flatMap(post => post.tags || [])))];
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "all" || 
      (post.tags?.includes(selectedCategory) || false);
    return matchesSearch && matchesCategory;
  });

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
            <div className="container mx-auto px-4 max-w-6xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-center text-blog-text">
                Unser Blog
              </h1>
              <p className="text-xl text-muted-foreground text-center mb-8 font-roboto">
                Aktuelle Insights, Tipps und Neuigkeiten aus der Automobilbranche
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Artikel durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className="whitespace-nowrap h-12"
                    >
                      {cat === "all" ? "Alle" : cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Beiträge werden geladen...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Keine Artikel gefunden.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md bg-blog-card-bg">
                        {/* Featured Image */}
                        {post.featured_image_url && (
                          <div className="overflow-hidden aspect-[16/10] relative">
                            <img 
                              src={post.featured_image_url} 
                              alt={post.featured_image_alt || post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        
                        <CardHeader className="space-y-3">
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="secondary"
                                  className="font-roboto font-medium"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <CardTitle className="line-clamp-2 font-heading text-2xl group-hover:text-blog-accent transition-colors">
                            {post.title}
                          </CardTitle>
                          
                          {post.excerpt && (
                            <CardDescription className="line-clamp-3 text-base leading-relaxed font-roboto">
                              {post.excerpt}
                            </CardDescription>
                          )}
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground font-roboto">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(post.published_at)}</span>
                            </div>
                            {post.read_time_minutes && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.read_time_minutes} Min.</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Sticky CTA */}
          <section className="py-16 bg-gradient-to-br from-blog-accent/5 to-blog-accent/10">
            <div className="container mx-auto px-4 text-center max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Bereit für Ihr nächstes Projekt?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-roboto">
                Lassen Sie uns gemeinsam Ihre Vision verwirklichen
              </p>
              <Link to="/#contact">
                <Button size="lg" className="bg-blog-accent hover:bg-blog-accent/90 text-white h-14 px-8 text-lg">
                  Projekt anfragen
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
