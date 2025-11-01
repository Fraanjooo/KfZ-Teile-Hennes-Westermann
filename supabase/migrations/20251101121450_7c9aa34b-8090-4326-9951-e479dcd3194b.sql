-- Drop old admin-based policies
DROP POLICY IF EXISTS "Authenticated users can create posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON blog_posts;

-- Create new policies for authenticated users
CREATE POLICY "Authenticated users can create posts"
ON blog_posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update their posts"
ON blog_posts
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete their posts"
ON blog_posts
FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can view all posts"
ON blog_posts
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Published posts are viewable by everyone"
ON blog_posts
FOR SELECT
TO anon
USING (status = 'published');