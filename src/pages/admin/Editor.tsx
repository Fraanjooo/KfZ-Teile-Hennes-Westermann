import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, Edit, Share2, Clock } from "lucide-react";
import { NotificationBanner } from "@/components/admin/NotificationBanner";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArticlePreview } from "@/components/admin/ArticlePreview";
import { SeoChecker } from "@/components/admin/SeoChecker";
import { ImageUploader } from "@/components/admin/ImageUploader";

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
  author: string;
  seoTitle: string;
  seoImageTag: string;
}

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<string>("edit");
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
    readTimeMinutes: "",
    author: "",
    seoTitle: "",
    seoImageTag: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
      return;
    }

    if (id) {
      loadPost();
    }
  }, [user, id, navigate]);

  const loadPost = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      toast.error("Fehler beim Laden des Beitrags");
      console.error("Load post error:", error);
      return;
    }

    if (!data) {
      toast.error("Beitrag nicht gefunden");
      navigate("/admin/dashboard");
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
        readTimeMinutes: data.read_time_minutes?.toString() || "",
        author: data.author || "",
        seoTitle: data.seo_title || "",
        seoImageTag: data.seo_image_tag || ""
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

  // Auto-save functionality
  useEffect(() => {
    if (!id || !formData.title || !user) return;
    
    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 5000); // Auto-save after 5 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, id]);

  // Set author from user profile on mount
  useEffect(() => {
    if (user && !id && !formData.author) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        if (data?.full_name) {
          setFormData(prev => ({ ...prev, author: data.full_name }));
        }
      };
      fetchProfile();
    }
  }, [user, id, formData.author]);

  const handleAutoSave = async () => {
    if (!id || autoSaving || !user?.id) return;
    
    setAutoSaving(true);
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
      author: formData.author || null,
      seo_title: formData.seoTitle || null,
      seo_image_tag: formData.seoImageTag || null,
      author_id: user.id,
    };

    const { error } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq("id", id);

    if (!error) {
      setLastSaved(new Date());
    }
    setAutoSaving(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    if (!user?.id) {
      toast.error("Sie müssen angemeldet sein um einen Beitrag zu erstellen");
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
      author: formData.author || null,
      seo_title: formData.seoTitle || null,
      seo_image_tag: formData.seoImageTag || null,
      author_id: user.id,
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blog-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button 
                variant="outline" 
                size="sm"
                className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-blog-accent">
              {id ? "Artikel bearbeiten" : "Neuer Artikel"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Zuletzt gespeichert: {lastSaved.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            )}
            {autoSaving && (
              <span className="text-sm text-muted-foreground">Speichert...</span>
            )}
          </div>
        </div>

        {notification && (
          <NotificationBanner
            type={notification.type}
            message={notification.message}
            className="mb-6"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-blog-badge-bg">
                <TabsTrigger 
                  value="edit" 
                  className="flex items-center gap-2 data-[state=active]:bg-blog-accent data-[state=active]:text-white"
                >
                  <Edit className="h-4 w-4" />
                  Bearbeiten
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="flex items-center gap-2 data-[state=active]:bg-blog-accent data-[state=active]:text-white"
                >
                  <Eye className="h-4 w-4" />
                  Vorschau
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-6">
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
                      <Label htmlFor="slug">URL-Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="artikel-slug"
                      />
                    </div>

                    <div>
                      <Label htmlFor="author">Autor *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Autorname"
                      />
                      {!formData.author && (
                        <p className="text-xs text-yellow-600 mt-1">⚠️ Bitte ergänzen</p>
                      )}
                    </div>

                    <ImageUploader
                      imageUrl={formData.featuredImageUrl}
                      imageAlt={formData.featuredImageAlt}
                      seoImageTag={formData.seoImageTag}
                      onImageUrlChange={(url) => setFormData(prev => ({ ...prev, featuredImageUrl: url }))}
                      onImageAltChange={(alt) => setFormData(prev => ({ ...prev, featuredImageAlt: alt }))}
                      onSeoImageTagChange={(tag) => setFormData(prev => ({ ...prev, seoImageTag: tag }))}
                    />

                    <div>
                      <Label htmlFor="excerpt">Kurzbeschreibung</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                        placeholder="Kurze Zusammenfassung für die Übersicht"
                      />
                    </div>

                    <div>
                      <Label>Inhalt *</Label>
                      <RichTextEditor
                        value={formData.content}
                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (Komma-getrennt)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="oldtimer, porsche, kaufberatung"
                      />
                    </div>

                    <div>
                      <Label htmlFor="readTime">Lesezeit (Min.)</Label>
                      <Input
                        id="readTime"
                        type="number"
                        value={formData.readTimeMinutes}
                        onChange={(e) => setFormData(prev => ({ ...prev, readTimeMinutes: e.target.value }))}
                        placeholder="5"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">SEO-Optimierung</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="seoTitle">SEO-Titel (max. 60 Zeichen) *</Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                        placeholder="Optimierter Titel für Suchmaschinen"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.seoTitle.length}/60 Zeichen
                      </p>
                      {!formData.seoTitle && (
                        <p className="text-xs text-yellow-600 mt-1">⚠️ Bitte ergänzen</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="metaDesc">Meta Description (120-160 Zeichen)</Label>
                      <Textarea
                        id="metaDesc"
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        rows={3}
                        placeholder="Beschreibung für Suchergebnisse"
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.metaDescription.length}/160 Zeichen
                      </p>
                      {!formData.metaDescription && (
                        <p className="text-xs text-yellow-600 mt-1">⚠️ Bitte ergänzen</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="keywords">SEO Keywords (mind. 3)</Label>
                      <Input
                        id="keywords"
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                        placeholder="porsche 964, kaufberatung, oldtimer"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardContent className="p-0">
                    <ArticlePreview
                      title={formData.title}
                      author={formData.author}
                      content={formData.content}
                      featuredImageUrl={formData.featuredImageUrl}
                      featuredImageAlt={formData.featuredImageAlt}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Veröffentlichung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, status: value }));
                      showNotification("info", `Status geändert zu "${value === "published" ? "Veröffentlicht" : "Entwurf"}"`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Entwurf</SelectItem>
                      <SelectItem value="published">Veröffentlicht</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className="w-full bg-blog-accent hover:bg-blog-accent-hover text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Speichert..." : id ? "Aktualisieren" : "Veröffentlichen"}
                </Button>

                {id && (
                  <Button 
                    variant="outline" 
                    className="w-full border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white" 
                    onClick={() => {
                      const previewUrl = `/blog/${formData.slug}`;
                      window.open(previewUrl, "_blank");
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Vorschau teilen
                  </Button>
                )}
              </CardContent>
            </Card>

            <SeoChecker
              title={formData.title}
              seoTitle={formData.seoTitle}
              metaDescription={formData.metaDescription}
              keywords={formData.seoKeywords}
              content={formData.content}
              slug={formData.slug}
              featuredImageAlt={formData.featuredImageAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
