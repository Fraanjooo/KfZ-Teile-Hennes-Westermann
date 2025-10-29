-- Add new fields to blog_posts table for enhanced editor features
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_image_tag TEXT,
ADD COLUMN IF NOT EXISTS featured_image_caption TEXT;

-- Add comment to explain the new fields
COMMENT ON COLUMN public.blog_posts.author IS 'Author name for the blog post';
COMMENT ON COLUMN public.blog_posts.seo_title IS 'SEO-optimized title (max 60 characters)';
COMMENT ON COLUMN public.blog_posts.seo_image_tag IS 'SEO image tag for accessibility';
COMMENT ON COLUMN public.blog_posts.featured_image_caption IS 'Caption for the featured image';