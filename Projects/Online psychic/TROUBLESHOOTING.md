# Troubleshooting Guide

## Homepage Not Loading

### Common Issues:

### 1. **Database Tables Don't Exist**
**Symptom:** Page loads but shows blank/error, or console shows "relation does not exist"

**Solution:**
- Go to your Supabase dashboard → SQL Editor
- Run the migration files in order:
  1. `supabase/migrations/20240101000000_create_reading_tables.sql`
  2. `supabase/migrations/20240101000001_seed_reading_types.sql`

### 2. **Supabase Credentials Incorrect**
**Symptom:** Connection errors, authentication failures

**Check:**
- Verify `.env.local` has correct values:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```
- Make sure there are no extra spaces or quotes
- Restart dev server after changing `.env.local`

### 3. **Environment Variables Not Loaded**
**Symptom:** "undefined" errors, connection refused

**Solution:**
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again
- Check that variables start with `NEXT_PUBLIC_` for client-side access

### 4. **Build/TypeScript Errors**
**Symptom:** Compilation errors in terminal

**Solution:**
- Check terminal for specific error messages
- Run `npm run build` to see all errors
- Make sure all dependencies are installed: `npm install`

### 5. **Port Already in Use**
**Symptom:** "Port 3000 is already in use"

**Solution:**
- Kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```
- Or use a different port: `npm run dev -- -p 3001`

## Quick Diagnostic Steps

1. **Check dev server is running:**
   ```bash
   # Should see Next.js output
   npm run dev
   ```

2. **Check browser console:**
   - Press F12 → Console tab
   - Look for red error messages

3. **Check terminal output:**
   - Look for compilation errors
   - Look for database connection errors

4. **Verify database:**
   - Go to Supabase dashboard
   - Check if `reading_types` table exists
   - Check if it has data (should have 4 rows)

5. **Test database connection:**
   - In Supabase dashboard → SQL Editor
   - Run: `SELECT * FROM reading_types;`
   - Should return 4 reading types

## Still Not Working?

Share these details:
- What you see (blank page, error message, etc.)
- Browser console errors (F12 → Console)
- Terminal errors from dev server
- Whether migrations have been run in Supabase


