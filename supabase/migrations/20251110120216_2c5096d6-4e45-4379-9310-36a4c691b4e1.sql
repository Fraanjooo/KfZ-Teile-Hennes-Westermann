-- Drop the existing public_profiles view
DROP VIEW IF EXISTS public.public_profiles;

-- Recreate the view with security_invoker=on to respect RLS policies of the querying user
-- This is the correct way to avoid the security definer warning
CREATE VIEW public.public_profiles
WITH (security_invoker=on)
AS
SELECT 
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Grant select permission to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Grant to anon users for public profile viewing
GRANT SELECT ON public.public_profiles TO anon;

-- Add comment to document the security setting
COMMENT ON VIEW public.public_profiles IS 
'Public profile information. Uses security_invoker to respect RLS policies of the querying user.';