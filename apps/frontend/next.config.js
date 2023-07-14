/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'de', 'pl', 'ar', 'it', 'zh', 'ja', 'vi', 'fr', 'es', 'tr'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
