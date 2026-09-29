/* dibujos.js — los vectores de cada producto.
   Tocá esto solo si querés cambiar las ilustraciones. */

/* ============================================================
   DIBUJOS — cada producto se representa con un vector de corte.
   Cuando tengas fotos reales, reemplazá dibujo() por una <img>.
   ============================================================ */
const MOTIVOS = {
  ramas:`<path d="M20 90V30M20 55l14-12M20 68l-13-11M20 45L9 36M20 78l13-11" /><path d="M60 90V22M60 50l16-14M60 64l-15-13M60 38L46 27M60 76l15-13"/><path d="M100 90V34M100 58l13-11M100 70l-12-10M100 47l-11-9"/>`,
  ondas:`<path d="M2 30c20-16 38 16 58 0s38-16 58 0"/><path d="M2 48c20-16 38 16 58 0s38-16 58 0"/><path d="M2 66c20-16 38 16 58 0s38-16 58 0"/><path d="M2 84c20-16 38 16 58 0s38-16 58 0"/>`,
  hexa:`<path d="M30 16l16 9v18l-16 9-16-9V25zM70 16l16 9v18l-16 9-16-9V25zM110 16l16 9v18l-16 9-16-9V25zM50 52l16 9v18l-16 9-16-9V61zM90 52l16 9v18l-16 9-16-9V61zM10 52l16 9v18l-16 9-16-9V61z"/>`,
  bambu:`<path d="M24 4v92M48 4v92M72 4v92M96 4v92"/><path d="M14 26h20M38 44h20M62 20h20M86 38h20M14 62h20M38 78h20M62 56h20M86 72h20"/>`,
  escudo:`<path d="M60 8l34 12v30c0 22-16 34-34 42-18-8-34-20-34-42V20z"/><path d="M60 26v50M34 46h52"/><path d="M60 8v88"/>`,
  parrilla:`<path d="M10 78h100M16 78l8-42M104 78l-8-42"/><path d="M26 36h68M30 48h60M34 60h52"/><path d="M10 88h100"/>`,
  disco:`<circle cx="60" cy="52" r="42"/><circle cx="60" cy="52" r="26"/><path d="M60 10v20M60 74v20M18 52h20M82 52h20M30 22l14 14M90 22L76 36M30 82l14-14M90 82L76 68"/>`,
  mapa:`<path d="M6 30h108M6 58h108M6 82h108"/><path d="M30 6v88M62 6v88M92 6v88"/><path d="M6 30L62 6M62 94l52-36"/><circle cx="62" cy="58" r="9"/>`,
  cartel:`<path d="M14 62c10-26 18 12 28-10s16 14 26-6 16 16 26-4"/><path d="M8 24h104M8 82h104"/>`,
  numero:`<path d="M30 78V26h-8"/><path d="M52 34c0-6 5-10 12-10s12 4 12 11-6 11-12 17l-12 12v4h26"/><path d="M92 24h20l-12 22c8 0 13 5 13 14 0 10-7 16-16 16-6 0-11-2-14-6"/>`,
  perchero:`<path d="M6 20h108v34H6z"/><path d="M22 54v18a6 6 0 0012 0M52 54v18a6 6 0 0012 0M82 54v18a6 6 0 0012 0"/><path d="M28 30h12M58 30h12M88 30h12"/>`
};

function dibujo(motivo, material){
  const trazo = material === "mdf" ? "#6B4E22" : "#8E9AA6";
  return `<svg viewBox="0 0 120 100" fill="none" stroke="${trazo}" stroke-width="2.6"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MOTIVOS[motivo]||""}</svg>`;
}
