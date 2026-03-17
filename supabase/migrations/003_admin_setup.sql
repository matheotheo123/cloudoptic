-- Anthropi: jobs + candidates tables

-- ── Jobs table ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jobs (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  platforms   text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  status      text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public can read open jobs (for the /for-experts page)
CREATE POLICY "Public can read open jobs"
  ON public.jobs FOR SELECT USING (status = 'open');

-- Authenticated users (admins) can do everything
CREATE POLICY "Admins can manage jobs"
  ON public.jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Candidates table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.candidates (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  linkedin    text NOT NULL,
  platforms   text[] NOT NULL,
  experience  text NOT NULL,
  resume_url  text,
  job_id      uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS candidates_email_idx ON public.candidates (email);
CREATE INDEX IF NOT EXISTS candidates_created_at_idx ON public.candidates (created_at DESC);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admins) can read candidates
CREATE POLICY "Admins can read candidates"
  ON public.candidates FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can delete candidates"
  ON public.candidates FOR DELETE TO authenticated USING (true);

-- Service role (used in API routes) bypasses RLS automatically
