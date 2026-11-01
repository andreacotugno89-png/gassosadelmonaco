import { useState, useEffect, useRef } from "react";

/* ============================================================
   ASSET
   ============================================================ */
const ASSETS = {
  bottle:    "/assets/gassosa-bottiglia.png",
  seal:      "/assets/tappo-off.png",
  signature: "/assets/firma-giuseppe-dipasquale.png",
  logoWhite: "/assets/logo-bianco.png",
  lifestyle: "/assets/gassosa-lifestyle.jpg",
  storia1:   "/assets/storia-campi.jpg",
  storia2:   "/assets/storia-piazza.jpg",
  storia3:   "/assets/storia-famiglia.jpg",
};

/* Contatti */
const CONTATTI = {
  email:     "dipasquale1912@gmail.com",
  tel:       "+39 333 381 5608",
  telHref:   "+393333815608",
  instagram: "dipasquale1912",
};

/* Gli ordini passano per email: oggetto e testo già scritti */
const email = (oggetto, testo) => `mailto:${CONTATTI.email}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(testo)}`;
const MAIL_LOCALI = email("Gassosa del Monaco per il mio locale",
  "Buongiorno,\nho un locale e vorrei informazioni su formati, quantità e condizioni della Gassosa del Monaco.\n\nNome del locale:\nCittà:\nTelefono:\n");
const MAIL_PRIVATI = email("Ordine Gassosa del Monaco",
  "Buongiorno,\nvorrei ordinare la Gassosa del Monaco.\n\nQuante bottiglie:\nCittà:\nTelefono:\n");

/* ---------- icone (tratto unico 1.8) ---------- */
function Icon({ name }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === "chat" && <path {...p} d="M4.5 19.5l1.2-3.6A7.5 7.5 0 1 1 8.6 18.6L4.5 19.5Z M9 10.5h6 M9 13.5h4" />}
      {name === "phone" && <path {...p} d="M6.6 3.5h2.6l1.3 4-1.9 1.3a10.5 10.5 0 0 0 6.6 6.6l1.3-1.9 4 1.3v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />}
      {name === "mail" && <><rect {...p} x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path {...p} d="M4 6.5l8 6 8-6" /></>}
      {name === "camera" && <><rect {...p} x="3.5" y="3.5" width="17" height="17" rx="5" /><circle {...p} cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></>}
      {name === "menu" && <path {...p} d="M4 7h16M4 12h16M4 17h16" />}
      {name === "close" && <path {...p} d="M6 6l12 12M18 6L6 18" />}
    </svg>
  );
}


/* ---------- la scritta dell'etichetta, in tre pezzi: GASSOSA, — DEL —, MONACO ---------- */
/* Gli stessi tracciati del marchio, ritagliati riga per riga così la bottiglia può stare davanti. */
function LabelGassosa() {
  return (
    <svg viewBox="53 -1 317 66" className="label-line label-line--gassosa" aria-hidden="true" fill="currentColor">
      <path d="M91.82,35.32c-1.15,3.04-1.59,4.34-1.59,24.73v.52s-4.7,2.6-12.72,2.6c-16.66,0-23.91-13.28-23.91-30.37C53.59,10.93,62.56.17,77.95.17c8.71,0,12.34,2.52,12.34,2.52,0,0-.19,1.91-.19,6.6,0,4.17.19,6.94.19,6.94-2.93-5.64-5.6-8.33-11.64-8.33-7.63,0-15.26,4.86-15.26,24.38,0,14.14,3.24,23.34,14.25,23.34,2.48,0,3.75-.35,3.75-.35,0-13.89-.32-16.92-1.59-19.96l-.64-1.48s2.04.17,6.62.17,6.61-.17,6.61-.17l-.57,1.48Z"/>
      <path d="M165.67,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
      <path d="M206.19,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
      <path d="M255.73,63.69c-13.67,0-20.86-11.71-20.86-30.81,0-13.1,3.82-32.89,20.86-32.89,13.67,0,20.86,11.63,20.86,30.81,0,13.11-3.82,32.89-20.86,32.89ZM255.73,7.73c-6.55,0-10.88,6.85-10.88,24.3s4.2,23.95,10.88,23.95,10.87-6.86,10.87-24.39-4.2-23.86-10.87-23.86Z"/>
      <path d="M300.77,63.17c-7.89,0-11.7-2.6-11.7-2.6,0,0,.13-2.08.13-6.25,0-4.6-.13-7.72-.13-7.72,2.42,4.77,5.28,8.76,11.26,8.76,4.07,0,8.33-1.12,8.33-7.72,0-4.77-2.1-6.68-5.02-9.02l-5.41-4.43c-4.7-3.73-9.09-8.16-9.09-17.44,0-10.24,4.96-16.58,15.52-16.58,7.12,0,10.94,2.52,10.94,2.52,0,0-.13,2.08-.13,6.42s.13,7.29.13,7.29c-2.61-5.21-5.53-8.5-10.56-8.5-3.5,0-7.31,1.04-7.31,7.03,0,4.51,2.29,6.25,5.79,9.02l4.51,3.64c5.34,4.26,9.28,8.24,9.28,18.05,0,13.45-7.12,17.53-16.53,17.53Z"/>
      <path d="M354.13,62.65c.83-.78,3.62-7.08-.22-13.91l-14.19-.16c-3.73,6.68-1.68,13.29-.86,14.07h-12.91c2.42-3.12,3.56-8.5,6.17-20.56l7.82-36.19c.26-1.04.44-2.08.44-3.21,0-1.21-.38-1.74-.44-1.82h16.03c0,.08-.38.61-.38,1.82,0,1.13.19,2.17.38,3.21l7.25,36.19c2.42,12.15,3.56,17.44,5.91,20.56h-15.01ZM346.57,15.41c-.06.43-5.26,25.76-5.26,25.76l10.54-.11s-5.21-25.05-5.28-25.66Z"/>
      <path d="M129.41,62.56c.83-.78,3.62-7.08-.22-13.91l-14.19-.16c-3.73,6.68-1.68,13.29-.86,14.07h-12.91c2.42-3.12,3.56-8.5,6.17-20.56l7.82-36.19c.26-1.04.44-2.08.44-3.21,0-1.21-.38-1.74-.44-1.82h16.03c0,.08-.38.61-.38,1.82,0,1.13.19,2.17.38,3.21l7.25,36.19c2.42,12.15,3.56,17.44,5.91,20.56h-15.01ZM121.84,15.32c-.06.43-5.26,25.76-5.26,25.76l10.54-.11s-5.21-25.05-5.28-25.66Z"/>
    </svg>
  );
}
function LabelDel() {
  return (
    <svg viewBox="181 72 60 24" className="label-line label-line--del" aria-hidden="true" fill="currentColor">
      <path d="M189.56,95.16c-1.27,0-2.42-.09-3.57-.09-1.62,0-2.42.06-2.42.06l.27-.52c.59-1.13.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.8.06,2.42.06c1.18,0,2.74-.09,4.01-.09,3.01,0,11.12.24,11.12,10.43,0,11.2-7.84,11.41-11.56,11.41ZM189.59,75.24c-1.15,0-2.03.09-2.03.09v17.82s1,.09,1.95.09c3.89,0,8.4-.82,8.4-9.12,0-7.84-4.19-8.88-8.31-8.88Z"/>
      <path d="M220.41,94.18l-.06.92h-10.11c-1.59,0-2.27.03-2.27.03l.27-.52c.59-1.16.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.65.03,2.24.03h9.85s-.03.49-.03,1.59c0,1.22.09,1.8.09,1.86-.03-.03-.23-.31-1.06-.82-.71-.43-1.86-.67-3.24-.67h-3.89v7.9h3.18c1.39,0,2.54-.15,3.24-.58.77-.46,1-.73,1.06-.79,0,.03-.09.92-.09,2.38s.09,2.29.09,2.35c-.03-.03-.23-.31-1.06-.82-.71-.43-1.86-.58-3.24-.58h-3.18v7.96h3.6c3.66,0,4.13-.88,5.22-2.53,0,0-.15,1.1-.32,3.57Z"/>
      <path d="M238.75,94.18l-.06.92h-8.82c-1.59,0-2.27.03-2.27.03l.27-.52c.59-1.16.74-1.37.74-10.53s-.12-9-.74-10.22l-.27-.52s.68.06,2.45.06,2.51-.06,2.51-.06l-.27.52c-.59,1.16-.74,1.43-.74,10.25v9.03h2.3c3.66,0,4.13-.88,5.22-2.53,0,0-.15,1.1-.32,3.57Z"/>
      <rect x="127.12" y="83.25" width="45.36" height="1.98"/>
      <rect x="251.48" y="83.25" width="45.36" height="1.98"/>
    </svg>
  );
}
function LabelMonaco() {
  return (
    <svg viewBox="0 104 423 118" className="label-line label-line--monaco" aria-hidden="true" fill="currentColor">
      <path d="M54.94,204.42c-6.56,1.52-9.53,2.56-9.53,2.55.3-.88.59-1.75.89-2.63,1.7-5.49,2.24-7.28,2.58-49.11.09-11.08.18-22.16.27-33.25-.18.71-1.29,7.22-3.28,14.32-5.28,19.5-10.52,39.72-15.71,60.76-4.88-18.58-9.79-37.86-14.75-57.93-1.9-7.49-3.12-14.24-3.29-15.31-.03,12.62-.06,25.25-.09,37.87-.11,44.98.24,45.52,2.03,51.15.26.8.51,1.59.77,2.39,0,0-2.51.42-7.34,1.89C2.58,218.64,0,219.8,0,219.8c.26-.99.52-1.98.78-2.96,1.64-6.55,2.15-7.8,2.18-55.3.03-46.09-.32-46.69-2.17-53.03C.53,107.6.27,106.7,0,105.79c0,0,3.53.3,10.32.27,6.26-.03,9.17-.34,9.17-.34,3.79,15.4,7.55,30.35,11.29,44.88,1.03,3.7,1.2,5.43,1.2,5.43,0,0,.18-1.5,1.26-5.72,3.95-15.32,7.92-30.2,11.91-44.67,0,0,3.35.27,9.7.25,6.61-.02,9.97-.3,9.97-.3-.27.77-.55,1.54-.82,2.32-1.81,5.06-2.26,6.17-2.64,47.24-.37,39.83-.02,40.33,1.76,45.38.26.72.51,1.43.77,2.15,0,0-2.46.24-8.93,1.72Z"/>
      <path d="M111.31,195.59c-19.04,3.07-28.78-12.47-28.48-41.51.21-19.89,5.82-49.89,29.45-49.57,18.95.14,28.77,16.07,28.54,42.28-.15,18.01-5.75,45.22-29.51,48.8ZM112.16,115.56c-9.09.1-15.19,10.27-15.47,35.95-.28,25.56,5.44,34.31,14.74,33.04,9.12-1.23,15.25-11.45,15.49-35.89.24-24.19-5.49-33.21-14.75-33.1Z"/>
      <path d="M214.67,107.37c-1.58,3.99-2.2,5.13-2.2,39.35v40.26s-2.22-.36-6.96-.32c-5.18.04-8.75.47-8.75.47-7.6-19.38-15.14-38.74-22.62-58.37-1.48-3.91-2.25-7.94-2.34-8.29-.05,8.94-.1,17.89-.15,26.83-.19,33.65.17,34.1,2.01,38.62.26.64.53,1.28.79,1.92,0,0-2.41-.12-7.76.22-5.53.36-7.75.78-7.75.78.27-.68.55-1.37.82-2.05,1.63-4.31,2.26-5.4,2.5-40.34.23-33.9-.12-34.36-1.94-39.02-.26-.66-.52-1.32-.78-1.98,0,0,2.82.23,9.79.22,5.91,0,8.82-.24,8.82-.24,7.34,19.54,14.75,38.82,22.22,58.11,1.95,4.89,2.66,8.76,2.66,8.76.01-8.9.02-17.8.03-26.71.04-33.21-.31-33.67-2.16-38.23-.26-.65-.53-1.29-.79-1.94,0,0,2.38.23,7.67.23,5.47,0,7.67-.23,7.67-.23-.26.65-.53,1.29-.8,1.94Z"/>
      <path d="M333.17,198.39c-25.08-4.59-31.73-27.01-31.93-48.04-.3-30.01,11.35-45.4,31.54-45.58,11.47-.02,16.09,3.86,16.09,3.87,0,0-.15,2.93-.07,10.13.07,6.4.28,10.68.28,10.68-3.87-8.46-7.09-13.25-15.3-13.42-10.67-.15-19.11,10.58-18.85,34.7.21,20.07,5.41,34.22,19.26,36.5,8.29,1.34,11.66-3,15.36-10.7,0,0-.13,4.24-.06,11.57.07,6.53.27,9.63.27,9.63,0,.03-5.75,2.66-16.6.67Z"/>
      <path d="M394.4,213.18c-18.66-5.43-28.77-26.13-29.04-56.32-.19-20.71,4.81-51.91,28.45-52.35,18.98-.36,28.95,21.04,28.92,56.68-.04,24.42-5.14,59.12-28.34,51.98ZM393.89,117.69c-9.07-.2-14.98,10.92-14.76,39.46.22,28.42,6.07,40.53,15.2,42.85,8.95,2.29,14.8-8.23,14.72-39.47-.08-30.92-5.91-42.63-15.16-42.84Z"/>
      <path d="M267.97,189.17c1.12-.94,4.84-9.22-.44-18.81-6.42-.48-12.84-.88-19.27-1.22-5.03,8.66-2.2,17.54-1.07,18.65-5.86-.3-11.72-.53-17.59-.68,3.28-4.03,4.82-11.07,8.3-26.93,3.48-15.86,6.93-31.78,10.36-47.81.34-1.38.58-2.77.58-4.27,0-1.62-.52-2.31-.61-2.42,7.19,0,14.39.01,21.58.02,0,.11-.5.82-.49,2.46.01,1.53.28,2.94.55,4.35,3.39,16.37,6.79,32.9,10.21,49.63,3.42,16.87,5.04,24.34,8.28,29-6.79-.76-13.58-1.41-20.39-1.97ZM257.27,125.15c-.07.63-6.91,34.25-6.92,34.21,4.77.13,9.53.29,14.29.49,0-.07-7.29-33.95-7.38-34.7Z"/>
    </svg>
  );
}

/* ---------- la bottiglia in 3D: un giro completo renderizzato dal file Blender ---------- */
/* 72 fotogrammi, uno ogni 5°, in due serie: "d" per il computer, "m" più piccola per il telefono.
   All'apertura la bottiglia è ferma, di fronte. */
const GIRO_N = 72;
const giroSrc = (serie, i) => `/assets/giro/${serie}/giro-${String(i).padStart(3, "0")}.webp`;
/* l'ordine di caricamento: prima un fotogramma ogni 8, poi ogni 4, ogni 2, infine tutti;
   così il giro funziona presto e si fa via via più pieno */
const ORDINE = [8, 4, 2, 1].flatMap((passo, t, a) =>
  Array.from({ length: GIRO_N / passo }, (_, k) => k * passo).filter((i) => t === 0 || i % a[t - 1] !== 0));

/* ---------- il passaggio dal magenta al verde ----------
   Un solo gesto di scroll (rotella, dito o tasto) dalla cima della pagina fa partire
   l'animazione, che va avanti da sola: il cerchio verde si allarga, la bottiglia fa un giro
   intero, MONACO diventa rosa man mano che il cerchio la copre. Finché dura, la pagina
   non scorre. Tornando in cima, un gesto verso l'alto la riavvolge. */
const PASSAGGIO_MS = 2000;
const PAUSA_MS = 450;                              // dopo l'animazione, il tempo in cui la rotella è ancora ignorata
let heroP = 0;                                     // 0 = magenta, 1 = verde; lo legge anche la bottiglia
function setHeroP(p) {
  heroP = p;
  /* la variabile vive sulla prima schermata: cambiarla sulla radice farebbe ricalcolare tutta la pagina */
  document.getElementById("top")?.style.setProperty("--p", p.toFixed(4));
  /* il menu e i colori del tema passano al verde solo verso la fine, una volta sola */
  const fase = p > 0.9 ? "verde" : "magenta";
  if (document.documentElement.dataset.fase !== fase) document.documentElement.dataset.fase = fase;
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function usePassaggio() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fase = window.scrollY > 4 ? 1 : 0, corre = false, finoA = 0, raf = 0;
    let touchY = null, touchBloccato = false;      // un gesto col dito iniziato durante l'animazione resta bloccato fino a quando si alza il dito
    setHeroP(fase);
    if (reduce) {
      const onScroll = () => setHeroP(window.scrollY > 4 ? 1 : 0);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const bloccato = () => corre || performance.now() < finoA;
    const parti = (verso) => {
      corre = true;
      root.classList.add("passaggio");               // ferma lo scroll anche sui telefoni
      const da = heroP, a = verso, t0 = performance.now();
      const passo = (now) => {
        const t = Math.min(1, (now - t0) / PASSAGGIO_MS);
        setHeroP(da + (a - da) * easeInOut(t));
        if (t < 1) { raf = requestAnimationFrame(passo); return; }
        fase = a; corre = false; finoA = performance.now() + PAUSA_MS;
        root.classList.remove("passaggio");
      };
      raf = requestAnimationFrame(passo);
    };
    /* decide se il gesto va trattenuto: true = la pagina non deve scorrere */
    const gesto = (giu) => {
      if (bloccato()) return true;
      if (window.scrollY > 4) return false;
      if (giu && fase === 0) { parti(1); return true; }
      if (!giu && fase === 1) { parti(0); return true; }
      return false;
    };
    const onWheel = (e) => {
      if (bloccato()) { e.preventDefault(); finoA = Math.max(finoA, performance.now() + 120); return; }   // la coda della rotella non fa scorrere
      if (Math.abs(e.deltaY) > 2 && gesto(e.deltaY > 0)) e.preventDefault();
    };
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; touchBloccato = bloccato(); };
    const onTouchMove = (e) => {
      if (touchBloccato || bloccato()) { e.preventDefault(); return; }
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) > 10 && gesto(dy > 0)) { e.preventDefault(); touchBloccato = true; }
    };
    const onTouchEnd = () => { touchY = null; touchBloccato = false; };
    const TASTI = { ArrowDown: true, PageDown: true, " ": true, ArrowUp: false, PageUp: false };
    const onKey = (e) => {
      if (!(e.key in TASTI) || e.target.closest?.("input, textarea, button, a")) return;
      if (gesto(TASTI[e.key])) e.preventDefault();
    };
    /* un salto con i link del menu porta comunque al verde */
    const onScroll = () => { if (!corre && fase === 0 && window.scrollY > 4) { fase = 1; setHeroP(1); } };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("passaggio");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function BottleSpin() {
  const canvas = useRef(null);
  const [serie] = useState(() => (window.matchMedia("(max-width: 767px)").matches ? "m" : "d"));
  const [ready, setReady] = useState(false);
  const frames = useRef([]);                       // i fotogrammi già pronti, per indice

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let alive = true;
    (async () => {
      /* uno alla volta, nell'ordine scelto: il primo giro grezzo arriva con 9 fotogrammi */
      for (const i of ORDINE) {
        const im = new Image();
        im.decoding = "async";
        im.src = giroSrc(serie, i);
        try { await im.decode(); } catch { continue; }
        if (!alive) return;
        frames.current[i] = im;
        if (i === ORDINE[8]) setReady(true);
      }
    })();
    return () => { alive = false; };
  }, [serie]);

  useEffect(() => {
    if (!ready) return;
    const c = canvas.current, ctx = c.getContext("2d");
    const first = frames.current[0];
    c.width = first.naturalWidth; c.height = first.naturalHeight;
    let target = 0, last = -1, drag = null, spin = 0, raf;   // target: i gradi aggiunti trascinando

    /* sempre un fotogramma intero e nitido: il più vicino tra quelli già arrivati */
    const draw = (deg) => {
      const f = (((deg / (360 / GIRO_N)) % GIRO_N) + GIRO_N) % GIRO_N;
      let k = Math.round(f) % GIRO_N;
      for (const passo of [1, 2, 4, 8]) {
        const q = (Math.round(f / passo) * passo) % GIRO_N;
        if (frames.current[q]) { k = q; break; }
      }
      if (k === last || !frames.current[k]) return;
      last = k;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(frames.current[k], 0, 0);
    };
    const tick = () => {
      if (!drag) spin *= 0.94;                       // inerzia dopo il trascinamento
      target += spin;
      draw(heroP * 360 + target);                    // il giro intero va di pari passo con il cerchio
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      if (drag) { const dx = e.clientX - drag.x; drag.x = e.clientX; target += dx * 0.6; spin = dx * 0.6; }
    };
    const onDown = (e) => { drag = { x: e.clientX }; spin = 0; c.setPointerCapture(e.pointerId); };
    const onUp = () => { drag = null; };
    window.addEventListener("pointermove", onMove);
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
    };
  }, [ready]);

  return (
    <div className="hero__bottle">
      <img src={giroSrc(serie, 0)} alt="Bottiglia di Gassosa del Monaco" fetchPriority="high" className={ready ? "is-hidden" : ""} />
      {ready && <canvas ref={canvas} aria-hidden="true" title="Trascina per girare la bottiglia" />}
    </div>
  );
}

/* ---------- la foto come una stampa ---------- */
function Print({ src, alt, caption, label, width, height, tilt = "-2deg", className = "" }) {
  return (
    <figure className={`print ${className}`} style={{ "--tilt": tilt }}>
      <div className="print__frame">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption>{label && <><b>{label}</b> · </>}{caption}</figcaption>}
    </figure>
  );
}

/* ---------- le bollicine della prima schermata ---------- */
/* Come sull'etichetta: tante sferette lucide di misure diverse che salgono dal centro,
   ognuna con il suo passo e un leggero ondeggiare. Posizioni fisse (niente casuale a ogni render). */
const BUBBLES = Array.from({ length: 28 }, (_, i) => {
  const r = (n) => { const v = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return v - Math.floor(v); };
  return {
    s: 5 + Math.round(r(1) ** 2 * 26),
    x: `${40 + r(2) * 20}%`,
    y: `${58 + r(3) * 34}%`,
    d: `${(2.2 + r(4) * 2.4).toFixed(2)}s`,
    delay: `${(r(5) * 4).toFixed(2)}s`,
    dx: `${Math.round((r(6) - 0.5) * 70)}px`,
  };
});

/* ---------- il nastro che scorre ---------- */
/* la frase del retro dell'etichetta, come è stampata: parole verdi e magenta, virgole e punto verdi */
const NASTRO = [
  ["Una ricetta ", ""], ["semplice", "m"], [", ", ""],
  ["custodita dal ", ""], ["tempo", "m"], [", ", ""],
  ["ritrovata nel ", ""], ["gusto", "m"], [".", ""],
];
function Ribbon() {
  const group = (hidden) => (
    <div className="ribbon__group" aria-hidden={hidden || undefined}>
      <span className="ribbon__item">{NASTRO.map(([t, c], i) => <span key={i} className={c ? "is-m" : undefined}>{t}</span>)}</span>
    </div>
  );
  return (
    <div className="ribbon">
      <p className="sr-only">Una ricetta semplice, custodita dal tempo, ritrovata nel gusto.</p>
      <div className="ribbon__track" aria-hidden="true">{group()}{group(true)}{group(true)}{group(true)}</div>
    </div>
  );
}

/* ---------- i tre ingredienti: entrano uno alla volta ---------- */
function Ingredients({ items }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <ul ref={ref} className="ingredients">
      {items.map((it) => (
        <li key={it} className="display"><span>{it}</span></li>
      ))}
    </ul>
  );
}

/* ---------- la linea del tempo: foto d'archivio e bottiglie di famiglia, alternate ---------- */
/* I fatti vengono dal racconto della famiglia, come riportato da TeleBovino (8 agosto 2026).
   Le bottiglie sono ritagliate dal volantino "Dal 1912" con la stessa altezza, così restano in scala. */
const TAPPE = [
  { quando: "1912", anno: true, titolo: "Tutto comincia nell'osteria", bottiglia: "1912", w: 230,
    alt: "Sifone da seltz in vetro blu con la testa incisa Di Pasquale Bovino",
    testo: "Nell'osteria di famiglia si vendevano il vino e il ghiaccio delle neviere. Qui Giuseppe di Pasquale cominciò a fare le prime gassose insieme a suo zio, «il Monaco». Ma questa è un'altra storia." },
  { titolo: "Le prime bottiglie", foto: ASSETS.storia1, w: 1280, h: 927, tilt: "-2deg",
    alt: "Ragazzi e uomini in posa durante la trebbiatura, con un cavallo e la trebbiatrice",
    sottotitolo: "Una pausa nei campi",
    testo: "La gassosa era fatta per momenti così, semplici, di tutti i giorni." },
  { quando: "Anni 30", titolo: "La bottiglia con la pallina", sottotitolo: "Un'icona di quegli anni", bottiglia: "1930", w: 124,
    alt: "Bottiglia in vetro con la biglia nel collo e la scritta in rilievo Di Pasquale Giuseppe Gassose Bovino",
    testo: "La chiusura a pallina era il segno delle gassose di quel tempo, e anche i Di Pasquale la producevano così, con il nome della famiglia in rilievo sul vetro." },
  { titolo: "Insieme", sottotitolo: "Una bibita per tutti", foto: ASSETS.storia2, w: 511, h: 800, tilt: "2deg",
    alt: "Giovani in festa davanti alla chiesa, con le bottiglie alzate",
    testo: "Dalle pause nei campi alle feste in paese: la gassosa era di tutti." },
  { quando: "Anni 40", titolo: "Il tappo a leva", bottiglia: "1949", w: 156,
    alt: "Bottiglia con tappo meccanico e la scritta in rilievo Giuseppe di Pasquale Gassose Bovino",
    testo: "La bottiglia cambiava nel tempo, ma dentro la gassosa restava sempre la stessa." },
  { quando: "Anni 60", titolo: "Tempi nuovi", foto: ASSETS.storia3, w: 1280, h: 883, tilt: "-1.5deg",
    alt: "La famiglia riunita attorno a un tavolo con le bottiglie di gassosa al centro",
    testo: "Arrivarono i frigoriferi e le bibite industriali. La gassosa si fece ancora per qualche anno, ma piano piano la famiglia si dedicò soltanto alla distribuzione di bevande. La ricetta restò in casa, in attesa." },
  { quando: "2026", anno: true, oggi: true, titolo: "Di nuovo in bottiglia", sottotitolo: "Una storia che continua", bottiglia: "2026", w: 146,
    alt: "La bottiglia di oggi, Gassosa del Monaco",
    testo: "Oggi la famiglia riporta in bottiglia la gassosa di allora, e nasce la Gassosa del Monaco." },
];

/* il fondo di ogni tappa, in ordine: la pagina cambia colore mentre si scorre la storia
   (il 2026 sta sul beige, dove il magenta dell'anno si legge bene) */
const TEMI_TAPPE = ["bianco", "beige", "verde", "magenta", "bianco", "verde", "beige"];

function Timeline() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0.3 }
    );
    el.querySelectorAll(".tappa").forEach((t) => io.observe(t));
    /* la linea si riempie man mano che si scorre */
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const v = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
        el.style.setProperty("--tl", v.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <ol ref={ref} className="timeline">
      <span className="timeline__fill" aria-hidden="true" />
      {TAPPE.map((t, i) => (
        <li key={t.titolo} data-theme={TEMI_TAPPE[i]} className={`tappa ${i % 2 ? "tappa--flip" : ""}`}>
          <div className="tappa__media">
            {t.bottiglia ? (
              <figure className="nicchia">
                <div className="nicchia__fondo">
                  <img src={`/assets/bottiglie/bottiglia-${t.bottiglia}.webp`} width={t.w} height="695" loading="lazy" decoding="async"
                    alt={t.alt} style={{ aspectRatio: `${t.w} / 695` }} />
                </div>
              </figure>
            ) : (
              <Print src={t.foto} width={t.w} height={t.h} tilt={t.tilt} alt={t.alt} />
            )}
          </div>
          <div className="tappa__testo">
            {t.quando && <p className={`tappa__quando display ${t.anno ? "is-anno" : ""} ${t.oggi ? "is-oggi" : ""}`}>{t.quando}</p>}
            <h3 className={`display h-md ${t.quando ? "mt-4" : ""}`}>{t.titolo}</h3>
            {t.sottotitolo && <p className="tappa__sotto display h-md">{t.sottotitolo}</p>}
            <p className="soft measure">{t.testo}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- il colore della pagina segue la sezione al centro dello schermo ---------- */
/* Ogni sezione dichiara il suo colore (data-theme). La prima schermata ha il suo passaggio
   dal magenta al verde (usePassaggio). */
const TONO = { hero: "dark", magenta: "dark", verde: "dark", beige: "light", bianco: "light" };
function useTemaScorrendo() {
  useEffect(() => {
    const root = document.documentElement;
    const set = (t) => { if (root.dataset.theme !== t) { root.dataset.theme = t; root.dataset.tone = TONO[t]; } };
    set("hero");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) set(e.target.dataset.theme); }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("body [data-theme]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [menu, setMenu] = useState(false);

  useTemaScorrendo();
  usePassaggio();

  /* le entrate degli ingredienti partono solo se JavaScript gira */
  useEffect(() => { document.documentElement.classList.add("js"); }, []);

  /* Esc chiude il menu */
  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const NAV = [
    ["La storia", "#storia"],
    ["La ricetta", "#ricetta"],
    ["Contatti", "#contatti"],
  ];

  return (
    <div className="min-h-screen w-full overflow-x-clip">
      <a href="#storia" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn--theme btn--sm">Vai ai contenuti</a>

      {/* ===================== NAV ===================== */}
      <nav aria-label="Principale" className="nav fixed top-0 left-0 right-0 z-50">
        <div className="wrap flex items-center justify-between gap-4" style={{ height: "var(--nav-h)" }}>
          <a href="#top" aria-label="Di Pasquale 1912, torna all'inizio">
            <img src={ASSETS.logoWhite} alt="Di Pasquale 1912" width="1200" height="360" className="logo-paper h-9 w-auto md:h-10" />
          </a>
          <div className="flex items-center gap-2 md:gap-8">
            <ul className="hidden md:flex items-center gap-8 m-0 p-0 list-none">
              {NAV.map(([label, href]) => (
                <li key={href}><a href={href} className="nav-link">{label}</a></li>
              ))}
            </ul>
            <a href="#contatti" className="btn btn--theme btn--sm">Ordina</a>
            <button type="button" className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center"
              onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="menu-mobile" aria-label={menu ? "Chiudi il menu" : "Apri il menu"}>
              <span className="block w-6 h-6"><Icon name={menu ? "close" : "menu"} /></span>
            </button>
          </div>
        </div>
        {menu && (
          <ul id="menu-mobile" className="md:hidden m-0 list-none px-5 pb-6 pt-2 flex flex-col">
            {NAV.map(([label, href]) => (
              <li key={href} style={{ borderTop: "2px solid var(--t-line)" }}>
                <a href={href} onClick={() => setMenu(false)} className="display block py-4 text-4xl no-underline">{label}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <main>
        {/* ===================== PRIMA SCHERMATA ===================== */}
        <header id="top" className="hero" data-theme="hero">
          <div className="hero__stage">
            {/* il cerchio verde, dietro la scritta */}
            <div className="hero__cerchio" aria-hidden="true" />
            <h1 className="hero__word">
              <span className="sr-only">Gassosa del Monaco</span>
              <span className="l1"><LabelGassosa /></span>
              <span className="hero__del"><LabelDel /></span>
              <span className="l2"><LabelMonaco /></span>
            </h1>
            {/* sopra la scritta, solo MONACO rosa, ritagliato dallo stesso cerchio */}
            <div className="hero__rosa" aria-hidden="true">
              <div className="hero__word">
                <span className="l1"><LabelGassosa /></span>
                <span className="hero__del"><LabelDel /></span>
                <span className="l2"><LabelMonaco /></span>
              </div>
            </div>
            <BottleSpin />
            {BUBBLES.map((b, i) => (
              <i key={i} className="bubble" aria-hidden="true"
                style={{ width: b.s, height: b.s, left: b.x, top: b.y, "--d": b.d, "--delay": b.delay, "--dx": b.dx }} />
            ))}
          </div>
        </header>

        <Ribbon />

        {/* ===================== STORIA: la linea del tempo ===================== */}
        <section id="storia" className="pt-24 md:pt-36 pb-10 md:pb-16">
          <div className="wrap">
            <div data-theme="bianco">
              <h2 className="display h-xl">Dal 1912. <span className="acc">Una storia che continua.</span></h2>
              <p className="lead measure mt-8 mb-0">Dall'osteria alla bottiglia di oggi: la nostra gassosa, la nostra storia.</p>
            </div>
            <Timeline />
          </div>
        </section>

        {/* ===================== IL NOME ===================== */}
        <section id="monaco" data-theme="magenta" className="py-24 md:py-36">
          <div className="wrap flex flex-col items-center text-center">
            <h2 className="display name-q">E il <span className="acc">monaco?</span></h2>
            <p className="lead mt-8 mb-0 max-w-xl">L'abito che non è stato mai indossato.</p>
            <div className="monaco-racconto mt-12 space-y-5 text-left">
              <p>Secondo il racconto di famiglia, lo zio di Giuseppe, «il Monaco», voleva farsi monaco davvero ed entrò in monastero. Lo misero in cucina e lo sottoposero a una prova di pazienza: ogni giorno i frati gli chiedevano che cosa avrebbe preparato. La risposta doveva essere sempre la stessa: pasta e fagioli, se fossero arrivati gli ingredienti.</p>
              <p>Giorno dopo giorno, la stessa domanda. Finché la pazienza finì: la risposta non fu proprio da monaco, e la prova di pazienza non la superò affatto. Lasciò il monastero e tornò a Bovino: per tutti, da allora, fu il Monaco.</p>
            </div>
            <img src={ASSETS.signature} alt="Firma di Giuseppe di Pasquale" width="2340" height="523" loading="lazy"
              className="mt-12 h-14 md:h-16 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="soft mt-3 mb-0 font-medium">Giuseppe di Pasquale · Bovino (FG)</p>
          </div>
        </section>

        {/* ===================== RICETTA ===================== */}
        <section id="ricetta" data-theme="verde" className="py-24 md:py-36">
          <div className="wrap grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-x-16 gap-y-16 items-center">
            <div>
              <h2 className="display h-lg">Tre ingredienti. <span className="acc">Nient'altro.</span></h2>
              <div className="mt-12"><Ingredients items={["Acqua", "Zucchero", "Succo di limone"]} /></div>
              <p className="soft lead mt-10 mb-0 measure">
                Una ricetta semplice, custodita dal tempo, ritrovata nel gusto.
              </p>
            </div>
            <div className="photo">
              <img src={ASSETS.lifestyle} alt="Gassosa del Monaco servita in due bicchieri con limone e menta, accanto a una ciotola di limoni"
                width="1122" height="1402" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        {/* ===================== ORDINI: la cartolina ===================== */}
        {/* Come le foto d'archivio, una cartolina un po' storta: a sinistra si sceglie chi si è
           (la email parte già scritta), a destra i recapiti al posto dell'indirizzo, il logo nero come francobollo. */}
        <section id="contatti" data-theme="beige" className="py-24 md:py-36">
          <div className="wrap">
            <h2 className="display h-xl text-center">Ordinala<span className="acc">.</span></h2>
            <div className="cartolina">
              <div className="cartolina__msg">
                <p>Per ordinare la Gassosa del Monaco basta scriverci.</p>
                <a href={MAIL_LOCALI} className="cartolina__btn is-pieno">Ho un bar, un ristorante, un negozio <span aria-hidden="true">→</span></a>
                <a href={MAIL_PRIVATI} className="cartolina__btn">La voglio per casa <span aria-hidden="true">→</span></a>
              </div>
              <div className="cartolina__indirizzo">
                <img src={ASSETS.seal} alt="" width="800" height="800" loading="lazy" className="cartolina__francobollo" />
                <dl className="cartolina__righe">
                  {[
                    ["Email", `mailto:${CONTATTI.email}`, CONTATTI.email],
                    ["Telefono", `tel:${CONTATTI.telHref}`, CONTATTI.tel],
                    ["Da", null, "Bovino (FG)"],
                  ].map(([label, href, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{href ? <a href={href}>{value}</a> : value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER: il logo e Instagram, sempre sul verde ===================== */}
      <footer className="footer py-12">
        <div className="wrap flex flex-col items-center gap-6">
          <img src={ASSETS.logoWhite} alt="Di Pasquale 1912" width="1200" height="360" loading="lazy" className="h-12 md:h-14 w-auto" />
          <a href={`https://www.instagram.com/${CONTATTI.instagram}/`} target="_blank" rel="noopener"
            aria-label={`Instagram, @${CONTATTI.instagram}`} className="footer__ig"><Icon name="camera" /></a>
        </div>
      </footer>
    </div>
  );
}
