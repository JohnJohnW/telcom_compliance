# PawOrNaw

A Tinder-style dog matching app for breeding.

## Setup

1.  **Prerequisites**:
    *   Node.js 18+

2.  **Environment Variables**:
    *   Create a `.env.local` file.
    *   Add `REPLICATE_API_TOKEN=your_replicate_token` for image generation.

3.  **Run the App**:
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
