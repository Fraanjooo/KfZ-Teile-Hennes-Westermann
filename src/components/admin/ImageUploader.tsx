import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // In a real implementation, this would upload to Supabase Storage
    // For now, we'll just show a message
    alert("Drag & Drop Upload: Bitte verwenden Sie vorerst die URL-Eingabe");
  }, []);

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
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Ziehen Sie ein Bild hierher oder geben Sie eine URL ein
              </p>
              <Input
                placeholder="https://beispiel.de/bild.jpg"
                value={imageUrl}
                onChange={(e) => onImageUrlChange(e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
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