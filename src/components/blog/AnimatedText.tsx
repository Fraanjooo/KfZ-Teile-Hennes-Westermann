import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export const AnimatedText = ({ words, className }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={cn("inline-block relative", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-500",
            index === currentIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{
            position: index === currentIndex ? "relative" : "absolute"
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};
