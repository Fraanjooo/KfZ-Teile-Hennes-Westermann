import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const imageHandler = () => {
    setImageUrl("");
    setImageAlt("");
    setShowImageDialog(true);
  };

  const insertImage = () => {
    const quill = quillRef.current?.getEditor();
    if (quill && imageUrl) {
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'image', imageUrl);
      
      // Set alt text on the inserted image
      const img = quill.root.querySelector(`img[src="${imageUrl}"]`);
      if (img && imageAlt) {
        img.setAttribute('alt', imageAlt);
      }
      
      quill.setSelection(range.index + 1, 0);
    }
    setShowImageDialog(false);
    setImageUrl("");
    setImageAlt("");
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "color",
    "background",
  ];

  return (
    <>
      <div className="rich-text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Beginnen Sie mit dem Schreiben Ihres Artikels..."
          className="bg-background"
        />
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bild einfügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="image-url">Bild-URL *</Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://beispiel.de/bild.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt-Text (Beschreibung für Barrierefreiheit) *</Label>
              <Input
                id="image-alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Beschreiben Sie das Bild"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Wichtig für SEO und Barrierefreiheit
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={insertImage} disabled={!imageUrl || !imageAlt}>
              Einfügen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};