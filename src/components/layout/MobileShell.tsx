import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
  className?: string;
};

export default function MobileShell({ children, className }: MobileShellProps) {
  return (
    <div className={`min-h-dvh pb-20  text-black ${className || ""}`}>
      {/* This centers a phone-sized canvas on desktop, but fills screen on phones */}
      <div className="mx-auto min-h-dvh w-full max-w-107.5">{children}</div>
    </div>
  );
}
