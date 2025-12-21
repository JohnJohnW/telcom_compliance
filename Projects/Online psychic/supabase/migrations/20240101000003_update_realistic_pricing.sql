-- Update reading types with realistic pricing and durations
-- Prices in AUD cents

UPDATE reading_types
SET 
  price = CASE 
    WHEN name = 'Tarot Reading' THEN 2999 -- $29.99
    WHEN name = 'Astrology Reading' THEN 3999 -- $39.99 (longer duration)
    WHEN name = 'Love & Relationship Reading' THEN 2999 -- $29.99
    WHEN name = 'Career Guidance Reading' THEN 3499 -- $34.99
    WHEN name = 'Pet Psychic Reading' THEN 2499 -- $24.99
    ELSE price
  END,
  duration_minutes = CASE
    WHEN name = 'Tarot Reading' THEN 30
    WHEN name = 'Astrology Reading' THEN 45
    WHEN name = 'Love & Relationship Reading' THEN 30
    WHEN name = 'Career Guidance Reading' THEN 35
    WHEN name = 'Pet Psychic Reading' THEN 25
    ELSE duration_minutes
  END
WHERE is_active = true;

