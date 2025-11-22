# PawOrNaw

A Tinder-style dog matching app for breeding.

## Setup

1.  **Prerequisites**:
    *   Node.js 18+
    *   Supabase Account

2.  **Supabase Setup**:
    *   Create a new project on [Supabase](https://supabase.com).
    *   Go to the **SQL Editor** and run the contents of `supabase/schema.sql` to set up the database tables and policies.
    *   Go to **Authentication** -> **Providers** and enable **Email**.
    *   Go to **Storage** and verify the `dog-photos` bucket exists (the SQL script should create it).

3.  **Environment Variables**:
    *   Copy `.env.local.example` to `.env.local`.
    *   Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project settings (API section).

4.  **Run the App**:
    ```bash
    npm install
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Deployment

1.  Push to GitHub.
2.  Import the project into **Vercel**.
3.  Add the Environment Variables in Vercel settings.
4.  Deploy!

## Features

*   **Onboarding**: Create a profile for your dog with photos.
*   **Feed**: Swipe right (Paw) or left (Naw) on other dogs.
*   **Matching**: If two dogs paw each other, it's a match!
*   **Chat**: Realtime chat with your matches.
