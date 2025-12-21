-- Remove duplicate reading types, keeping only the most recent one for each name
-- This migration handles cases where duplicate reading types were created

-- First, identify duplicates
-- Then delete older duplicates, keeping the one with the latest created_at

WITH ranked_readings AS (
  SELECT 
    id,
    name,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at DESC) as rn
  FROM reading_types
  WHERE is_active = true
)
DELETE FROM reading_types
WHERE id IN (
  SELECT id FROM ranked_readings WHERE rn > 1
);

-- Now add a unique constraint on name to prevent future duplicates
-- First, check if constraint already exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'reading_types_name_unique'
  ) THEN
    ALTER TABLE reading_types 
    ADD CONSTRAINT reading_types_name_unique UNIQUE (name);
  END IF;
END $$;

