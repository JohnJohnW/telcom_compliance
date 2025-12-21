-- Seed initial reading types
-- Note: elevenlabs_agent_id must be configured with actual agent IDs from ElevenLabs
-- Prices are in AUD cents
INSERT INTO reading_types (name, description, price, duration_minutes, elevenlabs_agent_id, is_active)
VALUES
  (
    'Tarot Reading',
    'Discover insights about your past, present, and future through the ancient art of tarot card reading.',
    2999, -- $29.99 AUD
    30,
    'your-tarot-agent-id', -- Must be replaced with actual ElevenLabs agent ID
    true
  ),
  (
    'Astrology Reading',
    'Explore your cosmic blueprint and understand how planetary influences shape your life journey.',
    3999, -- $39.99 AUD (longer duration, more complex)
    45,
    'your-astrology-agent-id', -- Must be replaced with actual ElevenLabs agent ID
    true
  ),
  (
    'Love & Relationship Reading',
    'Gain clarity on your romantic relationships and discover what the universe has in store for your love life.',
    2999, -- $29.99 AUD
    30,
    'your-love-agent-id', -- Must be replaced with actual ElevenLabs agent ID
    true
  ),
  (
    'Career Guidance Reading',
    'Navigate your professional path with spiritual guidance and insights into your career opportunities.',
    3499, -- $34.99 AUD
    35,
    'your-career-agent-id', -- Must be replaced with actual ElevenLabs agent ID
    true
  ),
  (
    'Pet Psychic Reading',
    'Connect with your beloved pet on a spiritual level and gain insights into their thoughts, feelings, and needs.',
    2499, -- $24.99 AUD
    25,
    'your-pet-psychic-agent-id', -- Must be replaced with actual ElevenLabs agent ID
    true
  )
ON CONFLICT DO NOTHING;

