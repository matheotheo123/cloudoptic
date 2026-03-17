-- Make linkedin and platforms optional on candidates
ALTER TABLE public.candidates
  ALTER COLUMN linkedin SET DEFAULT '',
  ALTER COLUMN linkedin DROP NOT NULL;
