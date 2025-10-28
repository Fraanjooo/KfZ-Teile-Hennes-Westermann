import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

interface InfoBoxProps {
  type?: "info" | "warning" | "success";
  children: React.ReactNode;
  className?: string;
}

export const InfoBox = ({ type = "info", children, className }: InfoBoxProps) => {
  const icons = {
    info: <Info className="h-5 w-5 text-blog-accent" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    success: <CheckCircle className="h-5 w-5 text-green-600" />
  };

  const styles = {
    info: "bg-gray-50 border-l-4 border-blog-accent",
    warning: "bg-yellow-50 border-l-4 border-yellow-600",
    success: "bg-green-50 border-l-4 border-green-600"
  };

  return (
    <div 
      className={cn(
        "flex gap-4 p-4 rounded-lg my-6 font-roboto",
        styles[type],
        className
      )}
    >
      <div className="flex-shrink-0 pt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1 text-blog-text leading-relaxed">
        {children}
      </div>
    </div>
  );
};
