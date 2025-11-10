import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Eye, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

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

  const categories = ["all", ...Array.from(new Set(posts.flatMap(post => post.tags || [])))];
  
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
      {/* ✅ Optimized Title & Meta Description for SEO */}
      <Helmet>
        <title>KFZ Blog Altenberge | Autoteile Ratgeber & Tipps</title>
        <meta
          name="description"
          content="KFZ-Blog von Hennes Westermann: Ratgeber zu Ersatzteilen, Autoteile-Tipps, Bremsenwechsel, Ölfilter & Autopflege. Fachwissen für Werkstätten & Privatkunden ✓"
        />
        <meta name="keywords" content="KFZ Blog, Autoteile Ratgeber, Bremsbeläge wechseln, Ölfilter finden, Autopflege Tipps, KFZ Wartung, Ersatzteile Guide, Altenberge" />
        <meta property="og:title" content="KFZ Blog Altenberge | Autoteile Ratgeber & Tipps" />
        <meta property="og:description" content="Fachwissen zu Ersatzteilen, Autoteilen und KFZ-Wartung aus Altenberge" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-blog-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                {/* ✅ Optimized H1 with main keyword */}
                <h1 className="text-5xl md:text-7xl font-serif font-normal mb-6 text-blog-text">
                  KFZ-Blog: Ratgeber & Tipps zu Autoteilen
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Fachwissen zu Ersatzteilen, Autoteile-Wartung und KFZ-Reparaturen für Werkstätten und Privatkunden in Altenberge und dem Münsterland. Von Bremsenwechsel bis Ölfilter – hier finden Sie hilfreiche Anleitungen und Expertentipps.
                </p>
              </motion.div>
              
              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-20"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Beiträge durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-base border-blog-border focus:border-blog-accent transition-colors"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap h-14 px-6 transition-all ${
                        selectedCategory === cat 
                          ? 'bg-blog-accent hover:bg-blog-accent-hover text-white' 
                          : 'border-blog-border hover:border-blog-accent'
                      }`}
                    >
                      {cat === "all" ? "Alle Kategorien" : cat}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="pb-32">
            <div className="container mx-auto px-4 max-w-7xl">
              {loading ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">Beiträge werden geladen...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    Keine Artikel gefunden.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="group block h-full"
                      >
                        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-blog-hover border-0 shadow-blog bg-blog-card-bg rounded-[20px] hover:-translate-y-2">
                          {/* Featured Image */}
                          {post.featured_image_url && (
                            <div className="overflow-hidden aspect-[16/10] relative">
                              <img 
                                src={post.featured_image_url} 
                                alt={post.featured_image_alt || post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                          )}
                          
                          <CardContent className="p-6 md:p-8">
                            {/* Category Badge */}
                            {post.tags && post.tags.length > 0 && (
                              <Badge 
                                variant="secondary"
                                className="mb-4 bg-blog-badge-bg text-blog-accent font-medium border-0 px-4 py-1"
                              >
                                {post.tags[0]}
                              </Badge>
                            )}
                            
                            {/* Title */}
                            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-blog-text group-hover:text-blog-accent transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                            
                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                {post.excerpt}
                              </p>
                            )}
                            
                            {/* Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.published_at)}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                <span>{post.view_count}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* ✅ SEO-optimized CTA Section */}
          <section className="py-20 bg-blog-accent">
            <div className="container mx-auto px-4 text-center max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">
                Benötigen Sie KFZ-Ersatzteile aus Altenberge?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Kontaktieren Sie uns für ein unverbindliches Angebot. Schnelle Lieferung ✓ Faire Preise ✓ Fachberatung ✓
              </p>
              <Link to="/#contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white hover:bg-white/90 text-blog-accent border-0 h-14 px-10 text-lg font-medium"
                >
                  Jetzt Angebot anfordern
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
