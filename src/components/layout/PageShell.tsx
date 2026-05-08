import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }): ReactNode {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] px-5 py-16 lg:px-24" id="main">
      {children}
    </main>
  );
}
