import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** frame width in px */
  width?: number;
  className?: string;
};

/** A pure-CSS smartphone frame. Pass a screen as children. */
export default function PhoneMockup({
  children,
  width = 280,
  className = "",
}: Props) {
  return (
    <div
      style={{ width }}
      className={`relative mx-auto rounded-[2.6rem] border border-white/15 bg-[#0b0b14] p-2.5 shadow-2xl shadow-black/60 ${className}`}
    >
      {/* side buttons */}
      <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-white/15" />
      <div className="absolute -left-[3px] top-40 h-12 w-[3px] rounded-l bg-white/15" />
      <div className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-white/15" />

      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#11111c] to-[#0a0a12]">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
