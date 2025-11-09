-- ============================================
-- SECURITY HARDENING MIGRATION
-- KFZ-Teile Hennes Westermann
-- ============================================

-- 1. RESTRICT PROFILES TABLE - Only authenticated users can view their own profile
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure policy - users can only view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 2. CREATE ATOMIC VIEW COUNTER FUNCTION (Prevents race conditions)
CREATE OR REPLACE FUNCTION public.increment_view_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$;

-- 3. CREATE PUBLIC PROFILES VIEW (For displaying author info without exposing emails)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Grant SELECT on the view to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;

-- 4. ENSURE BLOG POSTS CAN ONLY BE MODIFIED BY ADMINS
-- Update existing policies to check admin role
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update their posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete their posts" ON public.blog_posts;

-- Only admins can create posts
CREATE POLICY "Admins can create posts"
  ON public.blog_posts
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update posts
CREATE POLICY "Admins can update posts"
  ON public.blog_posts
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete posts
CREATE POLICY "Admins can delete posts"
  ON public.blog_posts
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));