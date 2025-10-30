import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Editor from "./pages/admin/Editor";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

/**
 * QueryClient-Instanz für React Query
 */
const queryClient = new QueryClient();

/**
 * Komponente zum Abfangen von ?scroll=... Query-Parametern
 * und Smooth-Scrolling zur Zielsektion
 */
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // kleiner Delay, damit DOM sicher geladen ist
      }
    }
  }, [location]);

  return null;
};

/**
 * Haupt-App-Komponente
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* Scroll-Handler wird global eingebunden */}
        <ScrollHandler />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/blog" element={<Dashboard />} />
          <Route path="/admin/blog/editor" element={<Editor />} />
          <Route path="/admin/blog/editor/:id" element={<Editor />} />
          <Route path="/admin/editor" element={<Editor />} />
          <Route path="/admin/editor/:id" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
