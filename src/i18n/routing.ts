import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ja', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',

  pathnames: {
    '/sign-in': '/sign-in',
    '/sign-up': '/sign-up',
    // Add other non-localized routes here
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
