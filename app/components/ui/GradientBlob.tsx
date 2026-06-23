type Props = {
  className?: string;
  /** tailwind color, e.g. "bg-accent-purple" */
  color?: string;
  size?: string;
  opacity?: string;
};

/** Decorative, non-interactive blurred gradient orb used in section backgrounds. */
export default function GradientBlob({
  className = "",
  color = "bg-accent-purple",
  size = "h-72 w-72",
  opacity = "opacity-30",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl animate-blob ${color} ${size} ${opacity} ${className}`}
    />
  );
}
