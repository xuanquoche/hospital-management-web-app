import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ja'],

  // Used when no locale matches
  defaultLocale: 'en',

  pathnames: {
    '/sign-in': '/sign-in',
    '/sign-up': '/sign-up',
    // Add other non-localized routes here
  },
});
