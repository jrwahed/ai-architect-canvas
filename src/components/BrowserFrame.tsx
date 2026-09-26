interface BrowserFrameProps {
  src: string;
  alt: string;
  className?: string;
}

// A screenshot inside a minimal app-window frame.
const BrowserFrame = ({ src, alt, className = "" }: BrowserFrameProps) => (
  <div className={`overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}>
    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" dir="ltr" aria-hidden="true">
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
    </div>
    <img src={src} alt={alt} loading="lazy" width={1600} height={672} className="block w-full" />
  </div>
);

export default BrowserFrame;
