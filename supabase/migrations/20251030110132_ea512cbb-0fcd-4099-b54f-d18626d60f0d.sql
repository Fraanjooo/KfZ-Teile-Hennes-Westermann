-- Update RLS policies for blog_posts to allow any authenticated user to manage posts

-- Drop existing admin-only policies
DROP POLICY IF EXISTS "Admins can create posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;

-- Create new policies for authenticated users
CREATE POLICY "Authenticated users can create posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can view all posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (true);

-- Keep the public view policy for published posts
-- (Already exists: "Published posts are viewable by everyone")