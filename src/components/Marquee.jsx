import { marqueeItems } from '../data/content';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-bg">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[clamp(0.75rem,1vw,0.85rem)] tracking-[0.16em] uppercase text-muted px-12"
          >
            <span className="text-accent mr-12">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
