import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase-Konfiguration aus Umgebungsvariablen
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://owklmeqqprcovkilwdvx.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93a2xtZXFxcHJjb3ZraWx3ZHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjc3MzksImV4cCI6MjA3NjY0MzczOX0.lcUNG77BPRA6KoWUvj2yaeGNmfaUkROMwEQVwb6WK48';

const supabase = createClient(supabaseUrl, supabaseKey);

const DOMAIN = 'https://www.kfz-teile-hennes-westermann.de';

// Statische Seiten
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/blog', changefreq: 'daily', priority: '0.9' },
  { url: '/datenschutz', changefreq: 'monthly', priority: '0.3' },
  { url: '/impressum', changefreq: 'monthly', priority: '0.3' },
];

async function generateSitemap() {
  try {
    console.log('🔍 Fetching blog posts from database...');
    
    // Blogposts aus Supabase abrufen
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching blog posts:', error.message);
      throw error;
    }

    console.log(`📝 Found ${blogPosts?.length || 0} published blog posts`);

    // XML-Sitemap erstellen
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Statische Seiten hinzufügen
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Blogposts hinzufügen
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        const lastmod = post.updated_at 
          ? new Date(post.updated_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
        
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += '  </url>\n';
      });
    }

    xml += '</urlset>';

    // Sitemap in public/ speichern
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf-8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${staticPages.length + (blogPosts?.length || 0)}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Sitemap generieren
generateSitemap();
