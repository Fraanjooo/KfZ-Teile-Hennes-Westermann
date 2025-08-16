import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Datenschutz from "./pages/Datenschutz";

/**
 * QueryClient-Instanz für React Query
 * Verwaltet Server-State und Caching für die gesamte Anwendung
 */
const queryClient = new QueryClient();

/**
 * Haupt-App-Komponente
 * 
 * Konfiguriert die gesamte React-Anwendung mit:
 * - React Query für Server-State-Management
 * - React Router für Client-Side-Routing  
 * - Toast-Benachrichtigungssystem (shadcn/ui Toaster + Sonner)
 * - Tooltip-Provider für einheitliche Tooltips
 * 
 * Routing-Struktur:
 * - "/" - Hauptseite (Index) mit allen Komponenten
 * - "/datenschutz" - Datenschutzerklärung
 * - "*" - 404-Fehlerseite für alle anderen Routen
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast-Benachrichtigungen (zwei verschiedene Implementierungen für Flexibilität) */}
      <Toaster />
      <Sonner />
      
      {/* Client-Side-Routing mit React Router */}
      <BrowserRouter>
        <Routes>
          {/* Hauptseite */}
          <Route path="/" element={<Index />} />
          
          {/* Datenschutzerklärung */}
          <Route path="/datenschutz" element={<Datenschutz />} />
          
          {/* 404 Catch-All Route - MUSS am Ende stehen */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
