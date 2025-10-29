import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface SeoCheckerProps {
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  slug: string;
  featuredImageAlt: string;
}

export const SeoChecker = ({
  title,
  seoTitle,
  metaDescription,
  keywords,
  content,
  slug,
  featuredImageAlt,
}: SeoCheckerProps) => {
  const checks = [
    {
      label: "SEO-Titel (max. 60 Zeichen)",
      passed: seoTitle.length > 0 && seoTitle.length <= 60,
      warning: seoTitle.length > 60,
      detail: seoTitle.length > 0 ? `${seoTitle.length}/60 Zeichen` : "Nicht ausgefüllt",
    },
    {
      label: "Meta-Description vorhanden",
      passed: metaDescription.length >= 120 && metaDescription.length <= 160,
      warning: metaDescription.length > 0 && metaDescription.length < 120,
      detail: metaDescription.length > 0 ? `${metaDescription.length}/160 Zeichen` : "Nicht ausgefüllt",
    },
    {
      label: "Keywords angegeben",
      passed: keywords.split(",").filter(k => k.trim()).length >= 3,
      warning: keywords.split(",").filter(k => k.trim()).length > 0 && keywords.split(",").filter(k => k.trim()).length < 3,
      detail: `${keywords.split(",").filter(k => k.trim()).length} Keywords`,
    },
    {
      label: "Alt-Text für Hauptbild",
      passed: featuredImageAlt.length > 10,
      warning: featuredImageAlt.length > 0 && featuredImageAlt.length <= 10,
      detail: featuredImageAlt.length > 0 ? "Vorhanden" : "Fehlt",
    },
    {
      label: "URL-Slug korrekt formatiert",
      passed: /^[a-z0-9-]+$/.test(slug) && slug.length > 0,
      warning: false,
      detail: slug.length > 0 ? "Korrekt" : "Nicht ausgefüllt",
    },
    {
      label: "Inhalts-Länge (min. 300 Wörter)",
      passed: content.split(/\s+/).length >= 300,
      warning: content.split(/\s+/).length > 100 && content.split(/\s+/).length < 300,
      detail: `${content.split(/\s+/).length} Wörter`,
    },
  ];

  const passedCount = checks.filter(c => c.passed).length;
  const totalCount = checks.length;
  const score = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">SEO-Checkliste</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Score:</span>
          <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score}%
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-3">
            {check.passed ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : check.warning ? (
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{check.label}</p>
              <p className="text-xs text-muted-foreground">{check.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};