"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function Drawer({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}): ReactNode {
  return (
    <div
      className={cn("fixed inset-0 z-[200]", open ? "pointer-events-auto" : "pointer-events-none")}
      inert={!open}
    >
      <div className={cn("absolute inset-0 bg-[var(--ecce-color-background-overlay)] transition-opacity", open ? "opacity-100" : "opacity-0")} />
      <aside
        aria-label={title}
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md border-l border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6 shadow-[var(--ecce-shadow-drawer)] transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold">{title}</h2>
          <Button aria-label="Close drawer" onClick={onClose} type="button" variant="secondary">
            <X aria-hidden size={18} />
          </Button>
        </div>
        <div className="mt-8">{children}</div>
      </aside>
    </div>
  );
}
