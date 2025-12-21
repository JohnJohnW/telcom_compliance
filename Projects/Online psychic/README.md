# Base Web App Template

A production-ready Next.js base template with TypeScript, Tailwind CSS, Supabase authentication, and Vercel deployment configuration.

## Features

- ✅ **Next.js 14+** with App Router
- ✅ **TypeScript** with strict mode
- ✅ **Tailwind CSS** for styling
- ✅ **Supabase** for authentication and database
- ✅ **Vercel** deployment ready
- ✅ Full authentication flow (sign up, sign in, sign out)
- ✅ Protected routes with middleware
- ✅ Example dashboard and profile pages
- ✅ Responsive design
- ✅ Modern UI components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))

### Installation

1. Clone or download this template

2. Install dependencies:
```bash
npm install
```

3. Set up your Supabase project:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project
   - Go to Settings > API
   - Copy your Project URL and anon/public key

4. Set up environment variables:
```bash
cp .env.local.example .env.local
```

5. Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   │   ├── login/         # Login page
│   │   └── signup/        # Sign up page
│   ├── dashboard/         # Protected dashboard
│   ├── profile/           # Protected profile page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── middleware.ts      # Auth middleware
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── auth/             # Auth-related components
├── lib/                   # Utilities
│   └── supabase/         # Supabase client & helpers
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Authentication

The template includes a complete authentication system:

- **Sign Up**: Create a new account with email and password
- **Sign In**: Log in with existing credentials
- **Sign Out**: Log out from your account
- **Protected Routes**: Dashboard and profile pages require authentication
- **Middleware**: Automatic redirect to login for protected routes

## Deployment

### Deploy to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket

2. Import your repository in [Vercel](https://vercel.com)

3. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

The `vercel.json` file is already configured for optimal deployment.

## Customisation

### Adding Database Tables

1. Create tables in your Supabase project
2. Update `types/database.ts` with your table types
3. Use the Supabase client to query your tables

### Styling

The template uses Tailwind CSS. Customise the theme in `tailwind.config.ts` and add global styles in `app/globals.css`.

### Components

Reusable UI components are in `components/ui/`. You can extend these or create new ones following the same patterns.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend and authentication
- [Vercel](https://vercel.com/) - Hosting and deployment

## License

This template is open source and available under the MIT License.

## Support

For issues and questions:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

