export default function SectionLabel({ children, center = false }) {
  return (
    <div
      className={`font-mono text-[0.65rem] tracking-[0.22em] uppercase text-accent mb-10 flex items-center gap-3 ${
        center ? 'justify-center' : ''
      }`}
    >
      {children}
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
