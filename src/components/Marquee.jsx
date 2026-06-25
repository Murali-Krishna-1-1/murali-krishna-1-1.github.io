import { marqueeItems } from '../data/content';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-strip" aria-label="Capabilities">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}><i />{item}</span>
        ))}
      </div>
    </div>
  );
}
