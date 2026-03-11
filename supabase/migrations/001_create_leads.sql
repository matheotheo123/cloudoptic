-- CloudOptic: leads table
-- Run this in the Supabase SQL editor or via the Supabase CLI

CREATE TABLE IF NOT EXISTS public.leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  company     text NOT NULL,
  cloud_spend text NOT NULL,
  message     text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);

-- ── Row Level Security ──────────────────────────────────────────────────────
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No public reads or writes — all access via service role from server functions
-- The anon key cannot read or write leads

-- Authenticated users (admins) can read all leads
CREATE POLICY "Admins can read leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- No direct inserts via client — server API uses service role key which bypasses RLS
-- This ensures the service role is the only path for inserts
