import { useState, useEffect, useRef, useId } from "react";
 
/* ============================================================
   ASSET
   ============================================================ */
const ASSETS = {
  bottle:    "https://i.postimg.cc/FKwXMHDq/gassosa-bottiglia.png",
  logo:      "./assets/logo-dipasquale-1912.png",
  seal:      "https://i.postimg.cc/RVR7hyGs/tappo-off.png",
  signature: "./assets/firma-giuseppe-dipasquale.png",
  logoWhite: "./assets/logo-bianco.png",
  lifestyle: "./assets/gassosa-lifestyle.jpg",
  storia1:   "https://i.postimg.cc/dV292Dq6/storia-campi.jpg",
  storia2:   "https://i.postimg.cc/2yLQVSc7/storia-piazza.jpg",
  storia3:   "https://i.postimg.cc/YqgPPrrC/storia-famiglia.jpg",
};
 
/* Contatti */
const CONTATTI = {
  email:   "dipasquale1912@gmail.com",
  tel:     "+39 333 381 5608",
  telHref: "+393333815608",
};
 
/* Palette di marca — colori ufficiali */
const C = {
  green:  "#0e4a43",
  greenD: "#092e2a",
  magenta:"#d23566",
  cream:  "#F2E6D2",
  creamD: "#E9D9BE",
  brown:  "#4A3526",
  ink:    "#0e3630",
};
 
const BUBBLES = [
  { l: 18, s: 10, d: 0,   t: 7.5 }, { l: 30, s: 6,  d: 1.2, t: 6.4 },
  { l: 42, s: 14, d: 0.4, t: 8.6 }, { l: 52, s: 8,  d: 2.1, t: 7.0 },
  { l: 62, s: 11, d: 0.8, t: 8.0 }, { l: 72, s: 5,  d: 1.6, t: 5.8 },
  { l: 26, s: 7,  d: 2.6, t: 6.8 }, { l: 48, s: 5,  d: 3.0, t: 6.0 },
  { l: 58, s: 9,  d: 1.0, t: 7.8 }, { l: 36, s: 12, d: 2.3, t: 8.4 },
  { l: 68, s: 6,  d: 0.6, t: 6.6 }, { l: 22, s: 8,  d: 1.9, t: 7.2 },
];
 
/* ---------- reveal on scroll ---------- */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setVis(true); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms` }}>
      {children}
    </div>
  );
}
 
/* ---------- scritta ufficiale Gassosa del Monaco (SVG inline) ---------- */
function WordmarkImg({ className = "" }) {
  const G = "#0e4a43", M = "#d23566";
  return (
    <svg viewBox="0 0 422.74 221.71" role="img" aria-label="Gassosa del Monaco"
      className={`w-full max-w-[340px] md:max-w-[440px] h-auto ${className}`}>
      <g fill={G}>
        <path d="M91.82,35.32c-1.15,3.04-1.59,4.34-1.59,24.73v.52s-4.7,2.6-12.72,2.6c-16.66,0-23.91-13.28-23.91-30.37C53.59,10.93,62.56.17,77.95.17c8.71,0,12.34,2.52,12.34,2.52,0,0-.19,1.91-.19,6.6,0,4.17.19,6.94.19,6.94-2.93-5.64-5.6-8.33-11.64-8.33-7.63,0-15.26,4.86-15.26,24.38,0,14.14,3.24,23.34,14.25,23.34,2.48,0,3.75-.35,3.75-.35,0-13.89-.32-16.92-1.59-19.96l-.64-1.48s2.04.17,6.62.17,6.61-.17,6.61-.17l-.57,1.48Z"/>
        <path d="M165.67,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
        <path d="M206.19,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
        <path d="M255.73,63.69c-13.67,0-20.86-11.71-20.86-30.81,0-13.1,3.82-32.89,20.86-32.89,13.67,0,20.86,11.63,20.86,30.81,0,13.11-3.82,32.89-20.86,32.89ZM255.73,7.73c-6.55,0-10.88,6.85-10.88,24.3s4.2,23.95,10.88,23.95,10.87-6.86,10.87-24.39-4.2-23.86-10.87-23.86Z"/>
        <path d="M300.77,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
        <path d="M354.13,62.65c.83-.78,3.62-7.08-.22-13.91l-14.19-.16c-3.73,6.68-1.68,13.29-.86,14.07h-12.91c2.42-3.12,3.56-8.5,6.17-20.56l7.82-36.19c.26-1.04.44-2.08.44-3.21,0-1.21-.38-1.74-.44-1.82h16.03c0,.08-.38.61-.38,1.82,0,1.13.19,2.17.38,3.21l7.25,36.19c2.42,12.15,3.56,17.44,5.91,20.56h-15.01ZM346.57,15.41c-.06.43-5.26,25.76-5.26,25.76l10.54-.11s-5.21-25.05-5.28-25.66Z"/>
        <path d="M129.41,62.56c.83-.78,3.62-7.08-.22-13.91l-14.19-.16c-3.73,6.68-1.68,13.29-.86,14.07h-12.91c2.42-3.12,3.56-8.5,6.17-20.56l7.82-36.19c.26-1.04.44-2.08.44-3.21,0-1.21-.38-1.74-.44-1.82h16.03c0,.08-.38.61-.38,1.82,0,1.13.19,2.17.38,3.21l7.25,36.19c2.42,12.15,3.56,17.44,5.91,20.56h-15.01ZM121.84,15.32c-.06.43-5.26,25.76-5.26,25.76l10.54-.11s-5.21-25.05-5.28-25.66Z"/>
        <path d="M189.56,95.16c-1.27,0-2.42-.09-3.57-.09-1.62,0-2.42.06-2.42.06l.27-.52c.59-1.13.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.8.06,2.42.06c1.18,0,2.74-.09,4.01-.09,3.01,0,11.12.24,11.12,10.43,0,11.2-7.84,11.41-11.56,11.41ZM189.59,75.24c-1.15,0-2.03.09-2.03.09v17.82s1,.09,1.95.09c3.89,0,8.4-.82,8.4-9.12,0-7.84-4.19-8.88-8.31-8.88Z"/>
        <path d="M220.41,94.18l-.06.92h-10.11c-1.59,0-2.27.03-2.27.03l.27-.52c.59-1.16.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.65.03,2.24.03h9.85s-.03.49-.03,1.59c0,1.22.09,1.8.09,1.86-.03-.03-.23-.31-1.06-.82-.71-.43-1.86-.67-3.24-.67h-3.89v7.9h3.18c1.39,0,2.54-.15,3.24-.58.77-.46,1-.73,1.06-.79,0,.03-.09.92-.09,2.38s.09,2.29.09,2.35c-.03-.03-.23-.31-1.06-.82-.71-.43-1.86-.58-3.24-.58h-3.18v7.96h3.6c3.66,0,4.13-.88,5.22-2.53,0,0-.15,1.1-.32,3.57Z"/>
        <path d="M238.75,94.18l-.06.92h-8.82c-1.59,0-2.27.03-2.27.03l.27-.52c.59-1.16.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.68.06,2.45.06,2.51-.06,2.51-.06l-.27.52c-.59,1.16-.74,1.43-.74,10.25v9.03h2.3c3.66,0,4.13-.88,5.22-2.53,0,0-.15,1.1-.32,3.57Z"/>
      </g>
      <g fill={M}>
        <path d="M54.94,204.42c-6.56,1.52-9.53,2.56-9.53,2.55.3-.88.59-1.75.89-2.63,1.7-5.49,2.24-7.28,2.58-49.11.09-11.08.18-22.16.27-33.25-.18.71-1.29,7.22-3.28,14.32-5.28,19.5-10.52,39.72-15.71,60.76-4.88-18.58-9.79-37.86-14.75-57.93-1.9-7.49-3.12-14.24-3.29-15.31-.03,12.62-.06,25.25-.09,37.87-.11,44.98.24,45.52,2.03,51.15.26.8.51,1.59.77,2.39,0,0-2.51.42-7.34,1.89C2.58,218.64,0,219.8,0,219.8c.26-.99.52-1.98.78-2.96,1.64-6.55,2.15-7.8,2.18-55.3.03-46.09-.32-46.69-2.17-53.03C.53,107.6.27,106.7,0,105.79c0,0,3.53.3,10.32.27,6.26-.03,9.17-.34,9.17-.34,3.79,15.4,7.55,30.35,11.29,44.88,1.03,3.7,1.2,5.43,1.2,5.43,0,0,.18-1.5,1.26-5.72,3.95-15.32,7.92-30.2,11.91-44.67,0,0,3.35.27,9.7.25,6.61-.02,9.97-.3,9.97-.3-.27.77-.55,1.54-.82,2.32-1.81,5.06-2.26,6.17-2.64,47.24-.37,39.83-.02,40.33,1.76,45.38.26.72.51,1.43.77,2.15,0,0-2.46.24-8.93,1.72Z"/>
        <path d="M111.31,195.59c-19.04,3.07-28.78-12.47-28.48-41.51.21-19.89,5.82-49.89,29.45-49.57,18.95.14,28.77,16.07,28.54,42.28-.15,18.01-5.75,45.22-29.51,48.8ZM112.16,115.56c-9.09.1-15.19,10.27-15.47,35.95-.28,25.56,5.44,34.31,14.74,33.04,9.12-1.23,15.25-11.45,15.49-35.89.24-24.19-5.49-33.21-14.75-33.1Z"/>
        <path d="M214.67,107.37c-1.58,3.99-2.2,5.13-2.2,39.35v40.26s-2.22-.36-6.96-.32c-5.18.04-8.75.47-8.75.47-7.6-19.38-15.14-38.74-22.62-58.37-1.48-3.91-2.25-7.94-2.34-8.29-.05,8.94-.1,17.89-.15,26.83-.19,33.65.17,34.1,2.01,38.62.26.64.53,1.28.79,1.92,0,0-2.41-.12-7.76.22-5.53.36-7.75.78-7.75.78.27-.68.55-1.37.82-2.05,1.63-4.31,2.26-5.4,2.5-40.34.23-33.9-.12-34.36-1.94-39.02-.26-.66-.52-1.32-.78-1.98,0,0,2.82.23,9.79.22,5.91,0,8.82-.24,8.82-.24,7.34,19.54,14.75,38.82,22.22,58.11,1.95,4.89,2.66,8.76,2.66,8.76.01-8.9.02-17.8.03-26.71.04-33.21-.31-33.67-2.16-38.23-.26-.65-.53-1.29-.79-1.94,0,0,2.38.23,7.67.23,5.47,0,7.67-.23,7.67-.23-.26.65-.53,1.29-.8,1.94Z"/>
        <path d="M333.17,198.39c-25.08-4.59-31.73-27.01-31.93-48.04-.3-30.01,11.35-45.4,31.54-45.58,11.47-.02,16.09,3.86,16.09,3.87,0,0-.15,2.93-.07,10.13.07,6.4.28,10.68.28,10.68-3.87-8.46-7.09-13.25-15.3-13.42-10.67-.15-19.11,10.58-18.85,34.7.21,20.07,5.41,34.22,19.26,36.5,8.29,1.34,11.66-3,15.36-10.7,0,0-.13,4.24-.06,11.57.07,6.53.27,9.63.27,9.63,0,.03-5.75,2.66-16.6.67Z"/>
        <path d="M394.4,213.18c-18.66-5.43-28.77-26.13-29.04-56.32-.19-20.71,4.81-51.91,28.45-52.35,18.98-.36,28.95,21.04,28.92,56.68-.04,24.42-5.14,59.12-28.34,51.98ZM393.89,117.69c-9.07-.2-14.98,10.92-14.76,39.46.22,28.42,6.07,40.53,15.2,42.85,8.95,2.29,14.8-8.23,14.72-39.47-.08-30.92-5.91-42.63-15.16-42.84Z"/>
        <path d="M267.97,189.17c1.12-.94,4.84-9.22-.44-18.81-6.42-.48-12.84-.88-19.27-1.22-5.03,8.66-2.2,17.54-1.07,18.65-5.86-.3-11.72-.53-17.59-.68,3.28-4.03,4.82-11.07,8.3-26.93,3.48-15.86,6.93-31.78,10.36-47.81.34-1.38.58-2.77.58-4.27,0-1.62-.52-2.31-.61-2.42,7.19,0,14.39.01,21.58.02,0,.11-.5.82-.49,2.46.01,1.53.28,2.94.55,4.35,3.39,16.37,6.79,32.9,10.21,49.63,3.42,16.87,5.04,24.34,8.28,29-6.79-.76-13.58-1.41-20.39-1.97ZM257.27,125.15c-.07.63-6.91,34.25-6.92,34.21,4.77.13,9.53.29,14.29.49,0-.07-7.29-33.95-7.38-34.7Z"/>
        <rect x="127.12" y="83.25" width="45.36" height="1.98"/>
        <rect x="251.48" y="83.25" width="45.36" height="1.98"/>
      </g>
    </svg>
  );
}
 
/* ---------- marchio quadrilobo ---------- */
function Quatrefoil({ size = 28, color = C.magenta, className = "", style = {} }) {
  const petal = "M50 50 C 40 38, 38 18, 50 2 C 62 18, 60 38, 50 50 Z";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden>
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={petal} fill={color} transform={`rotate(${r} 50 50)`} />
      ))}
    </svg>
  );
}
 
/* ---------- decori d'archivio: timbro tondo e marca da bollo ---------- */
function StampCircle({ size = 220, color = C.green, className = "", style = {} }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={className} style={{ width: size, height: size, ...style }} aria-hidden>
      <defs>
        <path id={`sc-t-${id}`} d="M 26 100 A 74 74 0 1 1 174 100" fill="none" />
        <path id={`sc-b-${id}`} d="M 30 100 A 70 70 0 0 0 170 100" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="88" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="46" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 4" />
      <text fill={color} style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 16, letterSpacing: 2.5 }}>
        <textPath href={`#sc-t-${id}`} startOffset="50%" textAnchor="middle">COMUNE DI BOVINO</textPath>
      </text>
      <text fill={color} dy="13" style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
        <textPath href={`#sc-b-${id}`} startOffset="50%" textAnchor="middle">PROVINCIA DI FOGGIA</textPath>
      </text>
      <path d="M100 78 l5.6 11.4 12.6 1.8 -9.1 8.9 2.2 12.5 -11.3 -5.9 -11.3 5.9 2.2 -12.5 -9.1 -8.9 12.6 -1.8 Z" fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx="60" cy="100" r="2" fill={color} />
      <circle cx="140" cy="100" r="2" fill={color} />
    </svg>
  );
}
 
function RevenueStamp({ size = 150, color = C.magenta, className = "", style = {} }) {
  const teeth = 14;
  const step = 100 / teeth;
  return (
    <svg viewBox="0 0 100 130" className={className} style={{ width: size, height: (size * 130) / 100, ...style }} aria-hidden>
      <rect x="4" y="4" width="92" height="122" fill="none" stroke={color} strokeWidth="2.4" />
      <rect x="11" y="11" width="78" height="108" fill="none" stroke={color} strokeWidth="1" />
      {/* dentellatura */}
      {[...Array(teeth)].map((_, i) => (
        <g key={i}>
          <circle cx={step / 2 + i * step} cy="3" r="2.6" fill="none" stroke={color} strokeWidth="0.9" />
          <circle cx={step / 2 + i * step} cy="127" r="2.6" fill="none" stroke={color} strokeWidth="0.9" />
        </g>
      ))}
      {[...Array(18)].map((_, i) => (
        <g key={`v${i}`}>
          <circle cx="3" cy={4 + i * 7} r="2.6" fill="none" stroke={color} strokeWidth="0.9" />
          <circle cx="97" cy={4 + i * 7} r="2.6" fill="none" stroke={color} strokeWidth="0.9" />
        </g>
      ))}
      <ellipse cx="50" cy="58" rx="26" ry="32" fill="none" stroke={color} strokeWidth="1.4" />
      <ellipse cx="50" cy="58" rx="20" ry="26" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 3" />
      <text x="50" y="112" textAnchor="middle" fill={color} style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.5 }}>LIRE 50</text>
      <text x="50" y="24" textAnchor="middle" fill={color} style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 6.5, letterSpacing: 1 }}>ATTI AMMINISTRATIVI</text>
    </svg>
  );
}
 
/* ---------- icone ingredienti ---------- */
function IngredientIcon({ kind, size = 34, color = C.green }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden style={{ display: "block" }}>
      {kind === "acqua" && (
        <path d="M20 6 C 20 6, 30 17, 30 24 a10 10 0 0 1 -20 0 C 10 17, 20 6, 20 6 Z" {...common} />
      )}
      {kind === "zucchero" && (
        <>
          <rect x="8" y="14" width="24" height="16" rx="2" {...common} />
          <path d="M8 20 h24 M20 14 v16" {...common} />
          <path d="M14 14 V9 h12 v5" {...common} />
        </>
      )}
      {kind === "limone" && (
        <>
          <ellipse cx="20" cy="22" rx="12" ry="9" {...common} />
          <path d="M20 13 v18 M8 22 h24 M12 16 l16 12 M28 16 l-16 12" {...common} />
          <path d="M20 13 c 2 -5, 6 -6, 8 -6" {...common} />
        </>
      )}
    </svg>
  );
}
 
/* ---------- sigillo Di Pasquale (immagine ufficiale + fallback SVG) ---------- */
function SealLogo({ size = 200, className = "", style = {} }) {
  const [err, setErr] = useState(false);
  const id = useId().replace(/:/g, "");
  if (!err) {
    return (
      <img src={ASSETS.seal} onError={() => setErr(true)} alt="Di Pasquale dal 1912 — Bovino"
        className={className}
        style={{ width: size, height: size, objectFit: "contain", display: "block", ...style }} />
    );
  }
  const petal = "M100 100 C 88 82, 86 56, 100 30 C 114 56, 112 82, 100 100 Z";
  return (
    <svg viewBox="0 0 200 200" className={className} style={{ width: size, height: size, display: "block", ...style }} role="img" aria-label="Di Pasquale dal 1912 — Bovino">
      <defs>
        <path id={`top-${id}`} d="M 22 100 A 78 78 0 1 1 178 100" fill="none" />
        <path id={`bot-${id}`} d="M 22 100 A 78 78 0 0 0 178 100" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="100" fill="#000000" />
      <text fill="#ffffff" style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 19, letterSpacing: 2 }}>
        <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">DI PASQUALE DAL 1912</textPath>
      </text>
      <text fill="#ffffff" dy="15" style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 19, letterSpacing: 2 }}>
        <textPath href={`#bot-${id}`} startOffset="50%" textAnchor="middle">BOVINO</textPath>
      </text>
      <circle cx="32" cy="134" r="2.6" fill="#ffffff" />
      <circle cx="168" cy="134" r="2.6" fill="#ffffff" />
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={petal} fill="#ffffff" transform={`rotate(${r} 100 100)`} />
      ))}
    </svg>
  );
}
 
/* ---------- texture archi déco (pattern SVG generato) ---------- */
function BrandTexture({ opacity = 1, className = "", bg = null, line = null }) {
  const id = useId().replace(/:/g, "");
  const BG = bg ?? "#f5e9d7", LINE = line ?? "#ebe2d5";
  const S = 3;
  const W = 41.28 * S, ROW = 20.64 * S;
  const R = [20.27, 16.84, 13.4, 9.96, 6.51, 3.07].map((r) => r * S);
  const SW = 0.73 * S;
  const LEG = ROW;
  const Fan = ({ cx, cy }) => (
    <g>
      <path d={`M ${cx - R[0] - SW} ${cy} A ${R[0] + SW} ${R[0] + SW} 0 0 1 ${cx + R[0] + SW} ${cy} L ${cx + R[0] + SW} ${cy + LEG} L ${cx - R[0] - SW} ${cy + LEG} Z`} fill={BG} />
      <g opacity="0.75">
        {R.map((r) => (
          <path key={r}
            d={`M ${cx - r} ${cy + LEG} L ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx + r} ${cy + LEG}`}
            fill="none" stroke={LINE} strokeWidth={SW} />
        ))}
      </g>
    </g>
  );
  return (
    <svg className={className} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}>
      <defs>
        <pattern id={id} width={W} height={ROW * 2} patternUnits="userSpaceOnUse">
          <rect width={W} height={ROW * 2} fill={BG} />
          <Fan cx={0} cy={0} /><Fan cx={W} cy={0} />
          <Fan cx={W / 2} cy={ROW} />
          <Fan cx={0} cy={ROW * 2} /><Fan cx={W} cy={ROW * 2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
 
/* ---------- logo ---------- */
function Logo({ onDark = false, className = "h-9 w-auto md:h-10" }) {
  const [err, setErr] = useState(false);
  if (!err) return <img src={ASSETS.logo} onError={() => setErr(true)} alt="Di Pasquale 1912" className={className} style={onDark ? { filter: "brightness(0) invert(1)" } : undefined} />;
  return (
    <div className="gdm-cinzel leading-none">
      <div style={{ color: onDark ? C.cream : C.green, letterSpacing: "0.04em" }} className="text-base md:text-lg font-bold">DI PASQUALE</div>
      <div style={{ color: onDark ? C.cream : C.magenta }} className="text-sm md:text-base font-bold">1912</div>
    </div>
  );
}
 
/* ---------- logo bianco per fondi scuri (footer) ---------- */
function LogoWhite({ className = "h-14 md:h-16 w-auto" }) {
  const [err, setErr] = useState(false);
  if (!err) return <img src={ASSETS.logoWhite} onError={() => setErr(true)} alt="Di Pasquale 1912" className={className} />;
  return (
    <div className="gdm-cinzel leading-none">
      <div style={{ color: C.cream, letterSpacing: "0.04em" }} className="text-lg md:text-xl font-bold">DI PASQUALE</div>
      <div style={{ color: C.magenta }} className="text-base md:text-lg font-bold">1912</div>
    </div>
  );
}
 
/* ---------- bottiglia ---------- */
function BottleArt({ className = "" }) {
  return (
    <svg viewBox="0 0 220 660" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Gassosa del Monaco">
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cfdbd9" />
          <stop offset="0.16" stopColor="#f5f9f8" />
          <stop offset="0.5" stopColor="#eaf2f0" />
          <stop offset="0.84" stopColor="#dde7e5" />
          <stop offset="1" stopColor="#c3d0cd" />
        </linearGradient>
      </defs>
      <path
        d="M86 62 L86 132 C70 152 42 176 40 218 L40 604 Q40 628 64 628 L156 628 Q180 628 180 604 L180 218 C178 176 150 152 134 132 L134 62 Z"
        fill="url(#glass)" stroke="#b4c2bf" strokeWidth="1.5"
      />
      <line x1="88" y1="118" x2="132" y2="118" stroke="#aebfbc" strokeWidth="2" opacity="0.65" />
      <rect x="80" y="14" width="60" height="50" rx="8" fill="#1c1c1c" />
      {[28, 36, 44, 52].map((y) => <rect key={y} x="82" y={y} width="56" height="2" fill="#3a3a3a" opacity="0.6" />)}
      <rect x="80" y="58" width="60" height="7" rx="3" fill="#0f0f0f" />
      {[[70, 250, 4], [96, 230, 3], [120, 270, 5], [150, 240, 3], [84, 300, 3], [140, 310, 4], [110, 340, 3]].map(
        ([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity="0.5" />
      )}
      <rect x="50" y="380" width="120" height="196" rx="6" fill={C.cream} stroke="#dccdb0" strokeWidth="1" />
      <text x="110" y="408" textAnchor="middle" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, letterSpacing: 1 }} fill={C.green}>GASSOSA</text>
      <text x="110" y="422" textAnchor="middle" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 7, letterSpacing: 3 }} fill={C.green}>— DEL —</text>
      <text x="110" y="446" textAnchor="middle" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 24 }} fill={C.magenta}>MONACO</text>
      <circle cx="110" cy="508" r="34" fill={C.magenta} />
      {[[100, 480, 3], [112, 474, 4], [122, 482, 2.5], [106, 470, 2]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity="0.85" />
      ))}
      <text x="110" y="560" textAnchor="middle" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 8, letterSpacing: 2 }} fill={C.magenta}>ANTICA RICETTA</text>
    </svg>
  );
}
 
function HeroBottle() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: "gdm-float 7s ease-in-out infinite" }}>
        <BottleArt className="h-full w-auto" />
      </div>
    );
  }
  return (
    <img
      src={ASSETS.bottle}
      alt="Bottiglia Gassosa del Monaco"
      onError={() => setErr(true)}
      className="absolute inset-0 m-auto h-full w-auto object-contain"
      style={{ filter: "drop-shadow(0 24px 40px rgba(14,74,67,0.28))", animation: "gdm-float 7s ease-in-out infinite" }}
    />
  );
}
 
/* ---------- immagine d'archivio ---------- */
function ArchiveImg({ src, alt, caption, className = "" }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className}`}
        style={{ background: "linear-gradient(135deg,#cbb389 0%,#9d8b6e 60%,#7d6f57 100%)" }}>
        <div className="relative text-center px-6" style={{ color: "#3c3324" }}>
          <Quatrefoil size={30} color="#6b5b3e" className="mx-auto mb-3 opacity-70" />
          <div className="gdm-body text-lg italic" style={{ color: "#4a3f2c" }}>{caption}</div>
          <div className="gdm-cinzel text-[10px] tracking-[0.3em] mt-2 opacity-70">ARCHIVIO DI PASQUALE</div>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErr(true)} loading="lazy" className={`object-cover ${className}`} style={{ filter: "sepia(0.12) contrast(1.02)" }} />;
}
 
/* ---------- carosello d'archivio ---------- */
function ArchiveCarousel({ slides }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-sm" style={{ boxShadow: "0 20px 55px rgba(14,74,67,0.18)" }}>
        <div className="flex" style={{ transform: `translateX(-${i * 100}%)`, transition: "transform .8s cubic-bezier(.2,.7,.2,1)" }}>
          {slides.map((s, k) => (
            <div key={k} className="w-full shrink-0">
              <ArchiveImg src={s.src} alt={s.alt} caption={s.cap} className="w-full h-[340px] md:h-[560px]" />
            </div>
          ))}
        </div>
 
        <div className="absolute left-0 right-0 bottom-0 px-6 py-6 md:px-10 md:py-8"
          style={{ background: "linear-gradient(to top, rgba(14,74,67,0.9), rgba(14,74,67,0))" }}>
          <div className="gdm-cinzel text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: C.magenta }}>{slides[i].label}</div>
          <div className="gdm-display text-xl md:text-3xl leading-snug" style={{ color: C.cream }}>{slides[i].cap}</div>
        </div>
 
        {[["‹", -1, "left-3 md:left-6"], ["›", 1, "right-3 md:right-6"]].map(([g, d, pos]) => (
          <button key={pos} onClick={() => go(d)} aria-label={d < 0 ? "Precedente" : "Successiva"}
            className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
            style={{ background: "rgba(242,230,210,0.92)", color: C.green, fontSize: "1.6rem", paddingBottom: 6 }}>
            {g}
          </button>
        ))}
      </div>
 
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Foto ${k + 1}`}
            className="rounded-full transition-all duration-300"
            style={{ width: k === i ? 28 : 8, height: 8, background: k === i ? C.magenta : "rgba(14,74,67,0.22)" }} />
        ))}
      </div>
    </div>
  );
}
 
/* ---------- firma ---------- */
function Signature() {
  const [err, setErr] = useState(false);
  if (!err) return <img src={ASSETS.signature} onError={() => setErr(true)} alt="Giuseppe di Pasquale" className="h-16 w-auto" />;
  return <div className="gdm-script text-4xl" style={{ color: C.green }}>Giuseppe di Pasquale</div>;
}
 
/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [menu, setMenu] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
 
  /* header: si nasconde scorrendo giù, riappare scorrendo su */
  useEffect(() => {
    let last = window.scrollY;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) > 6) {
          setNavHidden(delta > 0 && y > 120);
          last = y;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
 
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Cinzel:wght@400;500;600;700;800;900&family=Dancing+Script:wght@600;700&display=swap";
    document.head.appendChild(link);
 
    const style = document.createElement("style");
    style.textContent = `
      .gdm-display{font-family:'Montserrat',system-ui,sans-serif;font-weight:900;}
      .gdm-cinzel{font-family:'Cinzel',serif;}
      .gdm-body{font-family:'Montserrat',system-ui,sans-serif;font-weight:500;}
      .gdm-script{font-family:'Dancing Script',cursive;}
      html{scroll-behavior:smooth;}
      @keyframes gdm-rise{0%{transform:translateY(0) scale(.5);opacity:0;}18%{opacity:.6;}82%{opacity:.35;}100%{transform:translateY(-300px) scale(1.15);opacity:0;}}
      @keyframes gdm-float{0%,100%{transform:translateY(0) rotate(0);}50%{transform:translateY(-16px) rotate(2deg);}}
      @keyframes gdm-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
      @keyframes gdm-scroll-l{from{transform:translateX(0);}to{transform:translateX(-50%);}}
      @keyframes gdm-scroll-r{from{transform:translateX(-50%);}to{transform:translateX(0);}}
      .gdm-marquee-l{animation:gdm-scroll-l 26s linear infinite;}
      .gdm-marquee-r{animation:gdm-scroll-r 30s linear infinite;}
      .gdm-bubble{position:absolute;bottom:8%;border-radius:9999px;background:radial-gradient(circle at 32% 28%, rgba(255,255,255,.95), rgba(210,53,102,.24));box-shadow:0 0 8px rgba(255,255,255,.45);pointer-events:none;animation-name:gdm-rise;animation-timing-function:ease-in;animation-iteration-count:infinite;}
      .gdm-link{position:relative;}
      .gdm-link::after{content:"";position:absolute;left:0;bottom:-4px;width:0;height:1.5px;background:${C.magenta};transition:width .35s ease;}
      .gdm-link:hover::after{width:100%;}
    `;
    document.head.appendChild(style);
 
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
 
  const NAV = [
    ["La Storia", "#storia"],
    ["L'Antica Ricetta", "#ricetta"],
    ["Contatti", "#contatti"],
  ];
 
  const SLIDES = [
    { src: ASSETS.storia1, alt: "Il lavoro nei campi", cap: "Il ristoro dopo il lavoro nei campi", label: "Archivio di famiglia" },
    { src: ASSETS.storia2, alt: "Festa di paese", cap: "La bibita delle feste di paese", label: "Bovino" },
    { src: ASSETS.storia3, alt: "La famiglia attorno al tavolo", cap: "Le bottiglie al centro, la famiglia intorno", label: "Archivio di famiglia" },
  ];
 
  return (
    <div className="gdm-body min-h-screen w-full overflow-x-hidden" style={{ background: C.cream, color: C.ink, fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 500 }}>
      {/* ===================== NAV ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "transparent", transform: navHidden ? "translateY(-110%)" : "translateY(0)", transition: "transform .45s cubic-bezier(.2,.7,.2,1)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#top"><Logo /></a>
          <div className="hidden md:flex items-center gap-9">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="gdm-link gdm-display uppercase"
                style={{ color: C.green, fontSize: "0.9rem", fontWeight: 900, letterSpacing: "0.06em" }}>
                {label}
              </a>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMenu((m) => !m)} aria-label="Menu">
            <div className="space-y-[5px]">
              {[0, 1, 2].map((i) => <span key={i} className="block h-[2px] w-6" style={{ background: C.green }} />)}
            </div>
          </button>
        </div>
        {menu && (
          <div className="md:hidden px-6 pb-6" style={{ background: "rgba(242,230,210,0.97)" }}>
            <div className="flex flex-col gap-5 pt-3">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenu(false)}
                  className="gdm-display uppercase"
                  style={{ color: C.green, fontSize: "1.35rem", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1.1 }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
 
      {/* ===================== HERO ===================== */}
      <header id="top" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.cream }}>
        <BrandTexture />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col-reverse gap-10 items-center w-full md:grid md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <Reveal delay={80}><WordmarkImg /></Reveal>
          </div>
 
          <div className="relative flex items-center justify-center">
            <div className="relative" style={{ width: "min(82vw, 360px)", height: "min(96vw, 540px)" }}>
              <div className="absolute left-1/2 top-1/2 rounded-full" style={{ width: "76%", aspectRatio: "1 / 1", height: "auto", transform: "translate(-50%,-32%)", background: C.magenta }} />
              <div className="absolute inset-0 overflow-hidden">
                {BUBBLES.map((b, i) => (
                  <span key={i} className="gdm-bubble" style={{ left: `${b.l}%`, width: b.s, height: b.s, animationDuration: `${b.t}s`, animationDelay: `${b.d}s` }} />
                ))}
              </div>
              <HeroBottle />
            </div>
          </div>
        </div>
 
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" />
      </header>
 
      {/* ===================== STORIA ===================== */}
      <section id="storia" className="relative scroll-mt-20 py-24 md:py-32 overflow-hidden" style={{ background: C.cream }}>
        <div className="gdm-display pointer-events-none select-none absolute top-6 md:top-8 right-0 md:right-4"
          style={{ color: C.green, opacity: 0.12, fontSize: "clamp(4.5rem, 17vw, 13rem)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>
          1912
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <Reveal className="max-w-2xl">
            <div className="gdm-cinzel text-[12px] tracking-[0.32em] uppercase mb-4" style={{ color: C.magenta }}>La nostra storia</div>
            <h2 className="gdm-display text-4xl md:text-6xl leading-tight" style={{ color: C.green }}>
              Bovino, 1912
            </h2>
            <p className="text-xl leading-relaxed mt-6" style={{ color: "#3a4a45" }}>
              Giuseppe di Pasquale e il nipote omonimo cominciarono a produrre gassosa. Acqua, zucchero, succo di limone: da lì nacque il mestiere di famiglia.
            </p>
          </Reveal>
 
          <Reveal delay={100} className="mt-14">
            <ArchiveCarousel slides={SLIDES} />
          </Reveal>
 
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-20">
            <Reveal>
              <div className="gdm-cinzel text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: C.magenta }}>Fino agli anni Sessanta</div>
              <p className="text-lg leading-relaxed" style={{ color: "#3a4a45" }}>
                Il nipote Giuseppe, con i suoi figli, continuò a produrla e a portarla in giro: le feste, le tavole di casa, la sosta all'ombra durante la mietitura. Andò avanti così fino agli anni Cinquanta e Sessanta. Poi il mercato cambiò e la famiglia si dedicò alla distribuzione di bevande.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="gdm-cinzel text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: C.magenta }}>Oggi</div>
              <p className="text-lg leading-relaxed" style={{ color: "#3a4a45" }}>
                La ricetta rimase in famiglia, invariata, mentre attorno cambiava tutto. Oggi è stata ripresa, e con lei quel lavoro. Con lo stesso approccio di allora nasce Gassosa del Monaco.
              </p>
            </Reveal>
          </div>
 
          <Reveal delay={140} className="mt-14 md:mt-16 max-w-2xl mx-auto text-center">
            <p className="gdm-display leading-snug" style={{ fontSize: "clamp(1.15rem,2.6vw,1.6rem)", fontWeight: 900 }}>
              <span style={{ color: C.magenta }}>E il monaco?</span>{" "}
              <span style={{ color: C.green }}>L'abito che non è stato mai indossato.</span>
            </p>
          </Reveal>
 
          <Reveal className="mt-16 flex flex-col items-center text-center" delay={160}>
            <Signature />
            <div className="gdm-cinzel text-[12px] tracking-[0.24em] uppercase mt-4" style={{ color: C.green }}>
              Giuseppe di Pasquale — Bovino (FG)
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* ===================== QUOTE BAND ===================== */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: C.green }}>
        <BrandTexture bg={C.green} line="rgba(255,255,255,0.10)" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Quatrefoil size={26} color={C.magenta} className="mx-auto mb-8" />
            <p className="gdm-display leading-tight" style={{ color: C.cream, fontSize: "clamp(1.75rem,4.6vw,3.1rem)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Una ricetta <span style={{ color: C.magenta, fontWeight: 700 }}>semplice</span>, custodita dal{" "}
              <span style={{ color: C.magenta, fontWeight: 700 }}>tempo</span>, ritrovata nel{" "}
              <span style={{ color: C.magenta, fontWeight: 700 }}>gusto</span>.
            </p>
          </Reveal>
        </div>
      </section>
 
      {/* ===================== FOTO ===================== */}
      <section className="relative overflow-hidden" style={{ background: C.cream }}>
        <img
          src={ASSETS.lifestyle}
          alt="Gassosa del Monaco servita con limoni e menta"
          loading="lazy"
          className="w-full h-auto"
          style={{ display: "block" }}
        />
      </section>
 
      {/* ===================== ANTICA RICETTA ===================== */}
      <section id="ricetta" className="relative scroll-mt-20 py-24 md:py-32 overflow-hidden" style={{ background: C.cream }}>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="gdm-cinzel text-[12px] tracking-[0.32em] uppercase mb-4" style={{ color: C.magenta }}>L'antica ricetta</div>
            <h2 className="gdm-display leading-[0.95]" style={{ color: C.green, fontSize: "clamp(2.4rem,7vw,4.6rem)", fontWeight: 800 }}>
              Tre ingredienti.<br />
              <span style={{ color: C.magenta }}>Nient'altro.</span>
            </h2>
          </Reveal>
 
          {/* ingredienti attorno al sigillo — composizione a raggiera */}
          <Reveal delay={120} className="mt-14 md:mt-24">
            <div className="relative mx-auto" style={{ width: "min(92vw, 620px)", aspectRatio: "1 / 1" }}>
              {/* anelli sottili + raggi */}
              <svg viewBox="0 0 660 660" className="absolute inset-0 w-full h-full" aria-hidden>
                <circle cx="330" cy="330" r="196" fill="none" stroke={C.green} strokeWidth="2.6" opacity="0.22" />
                {[...Array(3)].map((_, i) => {
                  const a = (-90 + 120 * i) * (Math.PI / 180);
                  return (
                    <line key={i}
                      x1={330 + 128 * Math.cos(a)} y1={330 + 128 * Math.sin(a)}
                      x2={330 + 190 * Math.cos(a)} y2={330 + 190 * Math.sin(a)}
                      stroke={C.green} strokeWidth="2.6" opacity="0.22" />
                  );
                })}
                {[...Array(3)].map((_, i) => {
                  const a = (-90 + 120 * i) * (Math.PI / 180);
                  return <circle key={i} cx={330 + 196 * Math.cos(a)} cy={330 + 196 * Math.sin(a)} r="3" fill={C.magenta} />;
                })}
              </svg>
 
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "31%" }}>
                <SealLogo size="100%" />
              </div>
 
              {["Acqua", "Zucchero", "Succo di limone"]
                .map((it, i, arr) => {
                  const deg = -90 + (360 / arr.length) * i;
                  const a = deg * (Math.PI / 180);
                  const R = 40;
                  return (
                    <div key={i} className="absolute flex flex-col items-center"
                      style={{
                        left: `${50 + R * Math.cos(a)}%`,
                        top: `${50 + R * Math.sin(a)}%`,
                        transform: "translate(-50%,-50%)",
                        textAlign: "center",
                        width: "30%",
                      }}>
                      <Quatrefoil color={C.magenta} style={{ width: "clamp(20px,4.6vw,30px)", height: "auto" }} />
                      <div className="gdm-display" style={{ color: C.green, fontSize: "clamp(0.9rem,3.2vw,1.5rem)", fontWeight: 900, lineHeight: 1.2, marginTop: 8 }}>
                        {it}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* ===================== CONTATTI ===================== */}
      <section id="contatti" className="relative scroll-mt-20 py-24 md:py-32 overflow-hidden" style={{ background: C.green }}>
        <BrandTexture bg={C.green} line="rgba(255,255,255,0.10)" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Quatrefoil size={26} color={C.magenta} className="mx-auto mb-8" />
            <h2 className="gdm-display text-4xl md:text-5xl leading-tight" style={{ color: C.cream }}>
              Ritrova il gusto di una volta
            </h2>
            <p className="text-lg mt-5" style={{ color: "rgba(242,230,210,0.8)" }}>
              Per informazioni e ordini.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-col items-center gap-3 mt-10">
              <a href={`mailto:${CONTATTI.email}`} className="gdm-display transition-opacity duration-300 hover:opacity-70"
                style={{ color: C.cream, fontSize: "clamp(1.05rem,3vw,1.5rem)", fontWeight: 600, letterSpacing: "0.01em" }}>
                {CONTATTI.email}
              </a>
              <a href={`tel:${CONTATTI.telHref}`} className="gdm-display transition-opacity duration-300 hover:opacity-70"
                style={{ color: C.magenta, fontSize: "clamp(1.05rem,3vw,1.5rem)", fontWeight: 700, letterSpacing: "0.01em" }}>
                {CONTATTI.tel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* ===================== FOOTER ===================== */}
      <footer className="py-12" style={{ background: C.greenD }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <LogoWhite />
            <div className="gdm-cinzel text-[11px] tracking-[0.18em] uppercase text-center" style={{ color: "rgba(242,230,210,0.65)" }}>
              Bibita analcolica gassata
            </div>
          </div>
 
          <div className="mt-8 pt-8 text-center space-y-2" style={{ borderTop: "1px solid rgba(242,230,210,0.12)" }}>
            <p className="text-sm" style={{ color: "rgba(242,230,210,0.6)" }}>
              Ricetta originale ideata da Giuseppe di Pasquale — Bovino (FG), 1912
            </p>
            <p className="text-xs pt-3" style={{ color: "rgba(242,230,210,0.4)" }}>
              © {new Date().getFullYear()} Gassosa del Monaco · Di Pasquale 1912
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
