"use client";

import { ReactNode } from "react";

/**
 * StackingSections — wraps children sections so each becomes sticky-pinned.
 * Each child must be a section that uses `min-height: 100vh`.
 * As the user scrolls, the next section slides up over the previous one.
 */
export function StackingSections({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}
