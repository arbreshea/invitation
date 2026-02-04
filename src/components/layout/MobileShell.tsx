import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
};

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-dvh pb-20 bg-rose-50 text-black">
      {/* This centers a phone-sized canvas on desktop, but fills screen on phones */}
      <div className="mx-auto min-h-dvh w-full max-w-107.5">{children}</div>
    </div>
  );
}
