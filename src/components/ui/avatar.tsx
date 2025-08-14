// Importiert React und die Avatar-Komponenten von Radix UI
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// Importiert eine Hilfsfunktion zum Kombinieren von CSS-Klassen
import { cn } from "@/lib/utils"

// Haupt-Avatar-Komponente, stellt den Container für das Avatar-Bild bereit
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// AvatarImage-Komponente, zeigt das eigentliche Bild an
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// AvatarFallback-Komponente, zeigt einen Platzhalter, wenn kein Bild geladen werden kann
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Exportiert alle Avatar-Komponenten für die Verwendung in anderen Dateien
export { Avatar, AvatarImage, AvatarFallback }
