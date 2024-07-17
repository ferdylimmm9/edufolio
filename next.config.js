// const { withSentryConfig } = require('@sentry/nextjs');
const runtimeCaching = require('@ducanh2912/next-pwa').runtimeCaching;
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  workboxOptions: {
    runtimeCaching,
    maximumFileSizeToCacheInBytes: 10485760, // increase to 10 MB
  },
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  disable: process.env.NODE_ENV !== 'production',
  dynamicStartUrl: false,
});
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withTranslation = require('next-translate-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

const { defaultLocale, locales } = require('./i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: { locales, defaultLocale },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
  async headers() {
    // https://github.com/vercel/next.js/issues/1791#issuecomment-805595853
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = async (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const plugins = [withTranslation, withVanillaExtract, withPWA];
  if (!isDev) {
    // plugins.push(withSentryConfig);
  }
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
