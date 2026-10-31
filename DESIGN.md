---
name: Gassosa del Monaco
description: Lo stile Limone. Pop e fresco su fondo magenta, scritte enormi, la bottiglia al centro tra le bollicine.
colors:
  magenta: "#d23566"
  magenta-deep: "#b02653"
  magenta-ink: "#c42a5c"
  pink: "#f08cad"
  green: "#0e4a43"
  green-deep: "#0a3833"
  cream: "#fbefdd"
  paper: "#fff6ea"
  paper-soft: "rgba(255, 246, 234, 0.9)"
typography:
  hero:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(4.4rem, 16.5vw, 16.5rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.045em"
    textTransform: uppercase
  display-xl:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 9vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    textTransform: uppercase
  display-lg:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(2.8rem, 6.4vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    textTransform: uppercase
  display-md:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    textTransform: uppercase
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
rounded:
  pill: "999px"
  card: "28px"
  print: "18px"
  print-inner: "11px"
  focus: "6px"
---

# Gassosa del Monaco: lo stile Limone

Scelto dalla famiglia il 31 ottobre 2026 tra tre proposte e quattro colori di fondo. Sostituisce lo stile "saio e breviario".

## Il mondo

Una bibita pop, fresca e allegra. Il fondo è il magenta del sole dell'etichetta; le scritte sono enormi, maiuscole, strette; la bottiglia, renderizzata dal modello 3D di famiglia, sta al centro, un po' inclinata, gira su se stessa e galleggia piano tra bollicine che salgono. Il verde dell'inchiostro dell'etichetta e il crema della sua carta fanno da secondo e terzo colore.

## Colori

- **Magenta** `#d23566`: fondo della pagina, della prima schermata, del nome e degli ordini.
- **Verde** `#0e4a43`: la parola MONACO, il nastro, la ricetta, il footer, i pulsanti sul magenta.
- **Crema** `#fbefdd`: il fondo della storia, il testo sul verde.
- **Carta** `#fff6ea`: il testo sul magenta (4,9:1) e il fondo dei riquadri ordini.
- **Magenta per testo** `#c42a5c`: titoli e pulsanti su crema e carta.
- **Rosa** `#f08cad`: accenti sul verde ("Nient'altro.", le icone delle bollicine).

Il verde sul magenta ha poco contrasto (2:1): si usa solo per parole giganti come MONACO, mai per testo da leggere.

### I quattro fondi, scorrendo

Le quattro proposte di colore (magenta, verde, rosa `#f6cfd9`, menta `#cde8dc`) convivono: ogni sezione dichiara il suo fondo (`data-theme`) e la pagina sfuma verso il colore della sezione al centro dello schermo, testi e pulsanti compresi (variabili `--t-*` registrate con `@property`).

- **Prima schermata**: resta ferma per due schermate e mezza di scroll. Il verde si allarga a cerchio dalla bottiglia, la scritta resta ferma e MONACO passa da verde a rosa, la bottiglia cresce un poco e fa un giro intero. Niente testo né pulsanti in basso: l'ordine resta nel menu.
- **Nastro**: carta, sopra il verde.
- **Storia, linea del tempo**: il titolo su menta, poi ogni tappa ha il suo fondo (menta, rosa, verde, magenta, menta, verde, rosa) e la pagina cambia colore a ogni tappa. **E il monaco?** (con il racconto di Montevergine): magenta. **Ricetta**: verde. **Ordini**: rosa. **Footer**: verde.
- Il logo nel menu resta sempre bianco, su ogni fondo (scelta della famiglia). Sui fondi chiari gli accenti al magenta per testo `#c42a5c` (solo su testo grande; il testo piccolo resta verde).

## Caratteri

- **La scritta dell'etichetta** (i tracciati originali del marchio, in tre pezzi: GASSOSA, — DEL —, MONACO): solo nella prima schermata, GASSOSA in carta e MONACO in verde, con le proporzioni dell'etichetta. Il DEL resta al centro, come sull'etichetta, e si legge attraverso il vetro. Sul telefono la scritta sta in alto e la bottiglia sotto.
- **Bricolage Grotesque 800**, maiuscolo, interlinea 0,88, spaziatura stretta: tutti gli altri titoli.
- **Figtree**: testo, pulsanti, didascalie.

## Componenti

- **Ordini**: tutti i pulsanti d'ordine aprono un'email già scritta a dipasquale1912@gmail.com (oggetto e traccia diversi per locali e privati).
- **Pulsanti**: a pillola. Verde sul magenta, magenta sulla carta. Al passaggio del mouse salgono di 2px con un'ombra morbida.
- **Pastiglie**: gli ingredienti in pillole bordate.
- **Nastro**: banda carta con scritte verdi che scorre con la frase del retro dell'etichetta, "Una ricetta semplice · custodita dal tempo · ritrovata nel gusto", separata dal fiore magenta del tappo.
- **Stampe**: le foto d'archivio su carta bianca con angoli morbidi, un po' storte; si raddrizzano al passaggio del mouse.
- **Riquadri ordini**: carta, angoli da 28px, ombra lunga e morbida.
- **Linea del tempo** (la storia): una linea al centro che si riempie scorrendo, con sette tappe alternate tra bottiglie di famiglia (1912 sifone, 1930 biglia, 1949 tappo meccanico, 2026) e foto d'archivio. Le bottiglie sono scontornate dal volantino "Dal 1912" alla stessa scala (il vetro chiaro resta semitrasparente e lascia vedere il fondo) e stanno in piedi con un'ombra morbida; le foto sono stampe storte. Ogni tappa entra di lato quando arriva in vista. Sul telefono la linea passa a sinistra.
- **Tappo**: il sigillo nero del tappo, che gira piano sull'angolo della foto della ricetta.

## Movimento

La bottiglia entra dal basso, fa un giro e mezzo e si ferma di fronte, poi galleggia; segue il mouse, gira con lo scroll e si fa girare trascinandola (36 fotogrammi WebP in `public/assets/giro/`, renderizzati in Cycles dal file Blender); le due righe del titolo si svelano dal basso; le bollicine, disegnate come sull'etichetta (sfere trasparenti con il bordo verde acqua più pieno in basso e un riflesso bianco in alto a destra; una trentina, di misure diverse), salgono veloci ondeggiando; gli ingredienti entrano uno dopo l'altro quando la lista compare. Con "riduci movimento" attivo tutto resta fermo.

## Da non fare

- Niente fondo giallo: scartato dalla famiglia.
- Niente marrone saio né oro come colori della pagina.
- Niente etichette sopra i titoli, niente numeri 01/02/03 sugli ingredienti.
