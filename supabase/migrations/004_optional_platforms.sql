-- Make platforms optional on both tables (no longer collected from users)
ALTER TABLE public.candidates
  ALTER COLUMN platforms SET DEFAULT '{}',
  ALTER COLUMN platforms DROP NOT NULL;

ALTER TABLE public.jobs
  ALTER COLUMN platforms SET DEFAULT '{}';
