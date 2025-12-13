// [DEPRECATED] This file used to protect /admin routes via a proxy function.
// It referenced a helper `@/auth` that doesn't exist in the repository and
// Next.js middleware uses a `middleware.js` file. The admin routes are already
// protected at layout/server-component level; this proxy file is no longer
// necessary and can be safely removed. Keeping the file as a placeholder to
// avoid accidental deletion until maintainers confirm.

export default function proxy() {
  return null;
}
