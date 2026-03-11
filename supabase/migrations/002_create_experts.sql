-- CloudOptic: experts table + resume storage

-- ── Experts table ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.experts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  linkedin    text NOT NULL,
  platforms   text[] NOT NULL,
  experience  text NOT NULL,
  resume_url  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS experts_email_idx ON public.experts (email);
CREATE INDEX IF NOT EXISTS experts_created_at_idx ON public.experts (created_at DESC);

ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read experts"
  ON public.experts FOR SELECT TO authenticated USING (true);

-- ── Supabase Storage: expert-resumes bucket ───────────────────────────────────
-- Run this in the Supabase Storage section or via the dashboard:
-- 1. Create bucket named "expert-resumes" (private)
-- 2. Service role key (used server-side) has full access by default

INSERT INTO storage.buckets (id, name, public)
VALUES ('expert-resumes', 'expert-resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Only service role can upload (no public access)
-- No additional RLS policy needed — service role bypasses RLS
