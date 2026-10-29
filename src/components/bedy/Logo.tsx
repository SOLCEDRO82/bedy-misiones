export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-end font-display text-3xl font-semibold leading-none tracking-tight text-foreground ${className}`}>
      bed
      <span className="relative">
        y
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute -right-3 -top-2.5 h-[0.55em] w-[0.55em] fill-primary"
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      </span>
      <span className="sr-only">bedy</span>
    </span>
  );
}
