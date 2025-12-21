/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Only process files in the current directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Exclude other projects from the build
  webpack: (config, { isServer }) => {
    // Ignore files outside the project directory
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/Downloads/**',
        '**/Projects/paw-or-naw/**',
        '**/Projects/qut-lits-website/**',
        '**/Projects/personal_portfolio/**',
        '**/Projects/Base web app template/**',
        '**/Projects/PawOrNaw/**',
        '**/Projects/a3_group_10/**',
        '**/Projects/aml-app/**',
        '**/Projects/cache-to-the-future/**',
        '**/Projects/chameleon/**',
        '**/Projects/ecoSure/**',
        '**/Projects/evidencia/**',
        '**/Projects/kime/**',
        '**/Projects/odin_project/**',
      ],
    }
    return config
  },
}

module.exports = nextConfig

