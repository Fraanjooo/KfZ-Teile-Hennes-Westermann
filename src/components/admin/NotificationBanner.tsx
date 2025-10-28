import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationBannerProps {
  type: "info" | "warning" | "success";
  message: string;
  className?: string;
}

export const NotificationBanner = ({ type, message, className }: NotificationBannerProps) => {
  const icons = {
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />
  };

  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800"
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 border rounded-lg font-roboto",
        styles[type],
        className
      )}
    >
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};
