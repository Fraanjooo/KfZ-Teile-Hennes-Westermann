import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { NotificationBanner } from "@/components/admin/NotificationBanner";

interface EditorState {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  seoKeywords: string;
  tags: string;
  status: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  readTimeMinutes: string;
}

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "info" | "warning" | "success"; message: string } | null>(null);
  
  const [formData, setFormData] = useState<EditorState>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    metaDescription: "",
    seoKeywords: "",
    tags: "",
    status: "draft",
    featuredImageUrl: "",
    featuredImageAlt: "",
    readTimeMinutes: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
      return;
    }

    if (!isAdmin) {
      toast.error("Keine Berechtigung");
      navigate("/");
      return;
    }

    if (id) {
      loadPost();
    }
  }, [user, isAdmin, id, navigate]);

  const loadPost = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Fehler beim Laden des Beitrags");
      return;
    }

    if (data) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        metaDescription: data.meta_description || "",
        seoKeywords: data.seo_keywords?.join(", ") || "",
        tags: data.tags?.join(", ") || "",
        status: data.status || "draft",
        featuredImageUrl: data.featured_image_url || "",
        featuredImageAlt: data.featured_image_alt || "",
        readTimeMinutes: data.read_time_minutes?.toString() || ""
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: id ? prev.slug : generateSlug(value)
    }));
    
    if (!id) {
      showNotification("info", "Slug automatisch generiert");
    }
  };

  const showNotification = (type: "info" | "warning" | "success", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    setSaving(true);

    const postData = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt || null,
      meta_description: formData.metaDescription || null,
      seo_keywords: formData.seoKeywords ? formData.seoKeywords.split(',').map(k => k.trim()) : null,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : null,
      status: formData.status,
      featured_image_url: formData.featuredImageUrl || null,
      featured_image_alt: formData.featuredImageAlt || null,
      read_time_minutes: formData.readTimeMinutes ? parseInt(formData.readTimeMinutes) : null,
      author_id: user?.id,
      published_at: formData.status === "published" ? new Date().toISOString() : null
    };

    if (id) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", id);

      if (error) {
        toast.error("Fehler beim Aktualisieren");
        setSaving(false);
        return;
      }

      showNotification("success", "Artikel aktualisiert");
      toast.success("Artikel aktualisiert");
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .insert([postData]);

      if (error) {
        toast.error("Fehler beim Erstellen");
        setSaving(false);
        return;
      }

      showNotification("success", "Artikel erstellt");
      toast.success("Artikel erstellt");
    }

    setSaving(false);
    setTimeout(() => navigate("/admin/dashboard"), 1000);
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blog-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
          </Link>
          <h1 className="text-3xl font-heading font-bold">
            {id ? "Artikel bearbeiten" : "Neuer Artikel"}
          </h1>
        </div>

        {notification && (
          <NotificationBanner
            type={notification.type}
            message={notification.message}
            className="mb-6"
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Artikeldetails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Artikeltitel"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="artikel-slug"
              />
            </div>

            <div>
              <Label htmlFor="featuredImage">Cover-Bild URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImageUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="imageAlt">Bild Alt-Text</Label>
              <Input
                id="imageAlt"
                value={formData.featuredImageAlt}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImageAlt: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Kurzbeschreibung</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Inhalt (HTML) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={15}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (Komma-getrennt)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="readTime">Lesezeit (Min.)</Label>
              <Input
                id="readTime"
                type="number"
                value={formData.readTimeMinutes}
                onChange={(e) => setFormData(prev => ({ ...prev, readTimeMinutes: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="metaDesc">Meta Description</Label>
              <Textarea
                id="metaDesc"
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="keywords">SEO Keywords</Label>
              <Input
                id="keywords"
                value={formData.seoKeywords}
                onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="published">Veröffentlicht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Speichert..." : "Speichern"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Editor;
