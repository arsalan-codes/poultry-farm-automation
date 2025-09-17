/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig