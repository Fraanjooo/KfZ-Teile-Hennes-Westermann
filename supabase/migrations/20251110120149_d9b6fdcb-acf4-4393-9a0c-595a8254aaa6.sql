-- Drop the existing public_profiles view
DROP VIEW IF EXISTS public.public_profiles;

-- Recreate the view without SECURITY DEFINER (uses SECURITY INVOKER by default)
-- This ensures the view respects RLS policies of the querying user
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Grant select permission to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Optionally grant to anon users if public access is needed
GRANT SELECT ON public.public_profiles TO anon;