/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ignore files outside the project directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Exclude other projects from the build
  webpack: (config, { isServer }) => {
    // Ignore files from Downloads and other project directories
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/Downloads/**',
        '**/Projects/paw-or-naw/**',
        '**/Projects/qut-lits-website/**',
        '**/Projects/personal_portfolio/**',
      ],
    }
    return config
  },
}

module.exports = nextConfig

