import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, LogOut, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { exportBlogPostsToExcel } from "@/lib/exportToExcel";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsCheckingAuth(false);
      if (!user || !isAdmin) {
        navigate("/admin/login", { replace: true });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadPosts();
    }
  }, [user, isAdmin]);

  const loadPosts = async () => {
    setPostsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, view_count, created_at, tags, excerpt, meta_description")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Laden",
        description: error.message,
      });
    } else {
      setPosts(data || []);
    }
    setPostsLoading(false);
  };

  const handleExport = () => {
    if (posts.length === 0) {
      toast({
        variant: "destructive",
        title: "Keine Daten",
        description: "Es gibt keine Beiträge zum Exportieren.",
      });
      return;
    }
    
    exportBlogPostsToExcel(posts);
    toast({
      title: "Export erfolgreich",
      description: "Die Beiträge wurden als CSV exportiert.",
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Löschen",
        description: error.message,
      });
    } else {
      toast({
        title: "Beitrag gelöscht",
        description: "Der Beitrag wurde erfolgreich gelöscht.",
      });
      loadPosts();
    }
    setDeleteId(null);
  };

  if (loading || postsLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blog-background">
        <div className="text-lg text-blog-accent">Laden...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blog-background">
      <header className="border-b bg-white shadow-blog">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blog-accent">Blog Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Blog-Beiträge</h2>
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Blog-Beiträge
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel Export
            </Button>
            <Button 
              onClick={() => navigate("/admin/editor")}
              className="bg-blog-accent hover:bg-blog-accent-hover text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Neuer Beitrag
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Noch keine Beiträge vorhanden. Erstellen Sie Ihren ersten Beitrag!
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            post.status === "published"
                              ? "bg-blog-accent text-white"
                              : "bg-blog-badge-bg text-blog-accent"
                          }
                        >
                          {post.status === "published"
                            ? "Veröffentlicht"
                            : "Entwurf"}
                        </Badge>
                        <span className="text-xs">
                          {post.view_count} Aufrufe
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/editor/${post.id}`)}
                        className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(post.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Beitrag löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Der Beitrag wird
              permanent gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
