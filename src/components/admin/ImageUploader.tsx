import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploaderProps {
  imageUrl: string;
  imageAlt: string;
  seoImageTag: string;
  onImageUrlChange: (url: string) => void;
  onImageAltChange: (alt: string) => void;
  onSeoImageTagChange: (tag: string) => void;
}

export const ImageUploader = ({
  imageUrl,
  imageAlt,
  seoImageTag,
  onImageUrlChange,
  onImageAltChange,
  onSeoImageTagChange,
}: ImageUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Bitte nur Bilddateien hochladen");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Bild ist zu groß (max. 5MB)");
        return;
      }

      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      onImageUrlChange(publicUrl);
      toast.success("Bild erfolgreich hochgeladen");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Fehler beim Hochladen des Bildes");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Cover-Bild</Label>
        <div
          className={`mt-2 border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? "border-blog-accent bg-blog-accent/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                alt={imageAlt || "Preview"}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => onImageUrlChange("")}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              {uploading ? (
                <>
                  <Loader2 className="h-12 w-12 mx-auto text-blog-accent mb-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Bild wird hochgeladen...
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Ziehen Sie ein Bild hierher oder
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      disabled={uploading}
                    >
                      Datei auswählen
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Oder URL eingeben
                        </span>
                      </div>
                    </div>
                    <Input
                      placeholder="https://beispiel.de/bild.jpg"
                      value={imageUrl}
                      onChange={(e) => onImageUrlChange(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Unterstützt: JPG, PNG, WebP (max. 5MB)
        </p>
      </div>

      {imageUrl && (
        <>
          <div>
            <Label htmlFor="imageAlt">Alt-Text (für Barrierefreiheit) *</Label>
            <Input
              id="imageAlt"
              value={imageAlt}
              onChange={(e) => onImageAltChange(e.target.value)}
              placeholder="Beschreiben Sie das Bild für Screenreader"
            />
            {imageAlt.length === 0 && (
              <p className="text-xs text-yellow-600 mt-1">⚠️ Bitte ergänzen</p>
            )}
          </div>

          <div>
            <Label htmlFor="seoImageTag">SEO-Tag (beschreibender Satz)</Label>
            <Input
              id="seoImageTag"
              value={seoImageTag}
              onChange={(e) => onSeoImageTagChange(e.target.value)}
              placeholder="z.B. Kaffeetasse vor grünem Oldtimer – Symbol für Branding"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ein vollständiger Satz, der das Bild im Kontext beschreibt
            </p>
          </div>
        </>
      )}
    </div>
  );
};
