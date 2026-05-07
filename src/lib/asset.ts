/**
 * Prefix an absolute public path with the configured `basePath` (e.g.
 * "/tc-toulouse" on GitHub Pages, empty string in local dev).
 *
 * Use for `<img src>`, `<video src>`, `<source src>` — anywhere we hand a
 * literal absolute path to the browser. Next.js auto-prefixes routed assets
 * (Next/Image, imported modules) but NOT raw string paths.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
