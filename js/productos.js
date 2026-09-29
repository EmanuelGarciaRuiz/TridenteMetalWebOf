/* productos.js — ACÁ EDITÁS TODO: número de WhatsApp, productos y precios.
   Es el único archivo que necesitás tocar para el día a día. */

/* ============================================================
   CONFIGURACIÓN — editá solo esta parte
   ============================================================ */

// Tu número de WhatsApp. Sin +, sin espacios, sin guiones.
// Ejemplo Buenos Aires: 5491123456789
const WHATSAPP = "5491123119414";

/* ------------------------------------------------------------
   ESPESORES POR MATERIAL
   Es solo la LISTA DE NOMBRES disponible para cada material
   (define qué opciones aparecen en el selector). El precio de
   cada espesor NO se calcula acá: lo escribís vos, a mano, en
   el objeto "precios" de cada medida, más abajo.
   Si cambiás un nombre acá, tenés que usar el mismo nombre,
   letra por letra, como clave en "precios".
   ------------------------------------------------------------ */
const ESPESORES = {
  chapa: ["0,9 mm", "1,2 mm","1,6 mm", "2 mm", "2,5 mm", "3 mm"]
};

/* ------------------------------------------------------------
   PANELES — calculadora única para los paneles decorativos EN CHAPA
   (Panel Ramas, Panel Ondas, Divisor Bambú, y cualquier panel
   nuevo en chapa que agregues). El cliente elige medida y espesor
   UNA sola vez, acá, y ese mismo precio aplica a cualquiera de
   esos diseños. Para cambiar precios, tocás solo esta tabla.

   Todos los paneles decorativos usan esta misma tabla, ya que
   por ahora trabajás solo en chapa.

   Para agregar una medida nueva: copiá una línea entera de
   "medidas" y cambiale el nombre y los precios. Tiene que traer
   un precio para cada espesor de la lista ESPESORES.chapa.
   ------------------------------------------------------------ */
const PANELES = {
  medidas: [
    { nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
    { nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
    { nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    { nombre:'600 × 2400 mm',  precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }}
  ],
  espesores: ESPESORES.chapa
};

/* ------------------------------------------------------------
   PRODUCTOS
   material: "chapa" o "mdf" (define el color del fondo Y qué
             lista de ESPESORES de arriba se usa)
   motivo: qué dibujo se usa (la lista está en js/dibujos.js)
   medidas: cada opción tiene "nombre" y un objeto "precios" con
            el precio final EXACTO para cada espesor de ese
            material. Poné el número que quieras cobrar: no hay
            ninguna fórmula ni porcentaje aplicándose por detrás.

   OJO con los productos de categoría "paneles" y material "chapa"
   (Panel Ramas, Panel Ondas, Divisor Bambú): su campo "medidas"
   de acá abajo YA NO SE USA para el precio — ese precio ahora
   sale de la tabla PANELES de arriba. Lo dejamos escrito solo
   como referencia, no hace falta que lo borres ni que lo
   mantengas actualizado.

   Si en vez de "medidas" un producto tiene "modelos", se muestra
   con 2 (o más) botones en vez de menús desplegables — ver el
   ejemplo en "parrilla-rocket" más abajo.

   video: opcional. Si lo agregás, se suma al carrusel de fotos de
          ese producto: SIEMPRE va muteado (sin sonido) al reproducirse.
          Poné la ruta al archivo .mp4, igual que hacés con "fotos".

   videoPosicion: opcional, solo se usa junto con "video". Define en
          qué lugar del carrusel aparece: 0 = primero (por defecto si
          no lo escribís), 1 = segundo, 2 = tercero, etc. Si querés
          que vaya SIEMPRE al final (fotos primero, video al final),
          poné un número alto como 99 — así no importa si más
          adelante agregás o sacás fotos, el video sigue quedando
          último.

   aspecto: opcional. Fuerza la proporción ancho/alto del recuadro de
          foto/video para ESE producto, en vez del 4:3 de siempre.
          Se escribe como "ancho/alto", por ejemplo "491/625" si tu
          video (o tus fotos) son verticales de 491×625 px.

   Ver el ejemplo de los 3 campos en "parrilla-rocket" más abajo.
   ------------------------------------------------------------ */
const PRODUCTOS = [
  {
    id:"panel-ramas", cat:"paneles", nombre:"Panel Ramas",
    desc: "Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"ramas",
    fotos: ["img/paneles/panel-ramas-1.png", "img/paneles/panel-ramas-2.png", "img/panel-ramas-3.jpg"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm',  precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-hojas", cat:"paneles", nombre:"Panel Hojas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"hojas",
    fotos: ["img/paneles/panel-hojas-1.png", "img/panel-hojas-2.png", "img/panel-hojas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-flores", cat:"paneles", nombre:"Panel Flores",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"flores",
    fotos: ["img/paneles/panel-flores-1.png", "img/panel-ondas-2.jpg", "img/panel-ondas-3.jpg"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-acanto", cat:"paneles", nombre:"Panel Acanto",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"acanto",
    fotos: ["img/paneles/panel-acanto-1.png", "img/panel-ondas-2.png", "img/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-palmera", cat:"paneles", nombre:"Panel Palmera",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"palmera",
    fotos: ["img/paneles/panel-palmera-1.png", "img/paneles/panel-ondas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-rosas", cat:"paneles", nombre:"Panel Rosas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"rosas",
    fotos: ["img/paneles/panel-rosas-1.png", "img/panel-ondas-2.png", "img/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-petalos", cat:"paneles", nombre:"Panel Petalos",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"petalos",
    fotos: ["img/paneles/panel-petalos-1.png", "img/paneles/panel-petalos-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-tropical", cat:"paneles", nombre:"Panel Tropical",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"tropical",
    fotos: ["img/paneles/panel-tropical-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-abanico", cat:"paneles", nombre:"Panel Abanico",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"abanico",
    fotos: ["img/paneles/panel-abanico-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-monstera", cat:"paneles", nombre:"Panel Monstera",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"monstera",
    fotos: ["img/paneles/panel-monstera-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-frondas", cat:"paneles", nombre:"Panel Frondas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"frondas",
    fotos: ["img/paneles/panel-frondas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-floreado", cat:"paneles", nombre:"Panel Floreado",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"floreado",
    fotos: ["img/paneles/panel-floreado-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-organico", cat:"paneles", nombre:"Panel Organico",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"organico",
    fotos: ["img/paneles/panel-organico-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-jazmin", cat:"paneles", nombre:"Panel Jazmín",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"jazmin",
    fotos: ["img/paneles/panel-jazmin-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-volutas", cat:"paneles", nombre:"Panel Volutas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"volutas",
    fotos: ["img/paneles/panel-volutas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-hoja", cat:"paneles", nombre:"Panel Hoja", //hablar con mama y nano el nombre
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"hoja",
    fotos: ["img/paneles/panel-hoja-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-margarita", cat:"paneles", nombre:"Panel Margarita",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"margarita",
    fotos: ["img/paneles/panel-margarita-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-enredadera", cat:"paneles", nombre:"Panel Enredadera",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"enredadera",
    fotos: ["img/paneles/panel-enredadera-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-coral", cat:"paneles", nombre:"Panel Coral",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"coral",
    fotos: ["img/paneles/panel-coral-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-selva", cat:"paneles", nombre:"Panel Selva",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"selva",
    fotos: ["img/paneles/panel-selva-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-olas", cat:"paneles", nombre:"Panel Olas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"olas",
    fotos: ["img/paneles/panel-olas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-exotico", cat:"paneles", nombre:"Panel Exotico",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"exotico",
    fotos: ["img/paneles/panel-exotico-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-arbol", cat:"paneles", nombre:"Panel Arbol",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"arbol",
    fotos: ["img/paneles/panel-arbol-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-primavera", cat:"paneles", nombre:"Panel Primavera",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"arbol",
    fotos: ["img/paneles/panel-primavera-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-hojascaidas", cat:"paneles", nombre:"Panel Hojas Caidas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"hojascaidas",
    fotos: ["img/paneles/panel-hojascaidas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-remolino", cat:"paneles", nombre:"Panel Remolino",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"remolino",
    fotos: ["img/paneles/panel-remolino-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-rustico", cat:"paneles", nombre:"Panel Rustico",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"rustico",
    fotos: ["img/paneles/panel-rustico-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-constelacion", cat:"paneles", nombre:"Panel Constelacion",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"constelacion",
    fotos: ["img/paneles/panel-constelacion-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-estrellas", cat:"paneles", nombre:"Panel Estrellas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"estrellas",
    fotos: ["img/paneles/panel-estrellas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-bambu", cat:"paneles", nombre:"Panel Bambu",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"bambu",
    fotos: ["img/paneles/panel-bambu-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-bosque", cat:"paneles", nombre:"Panel Bosque",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"bosque",
    fotos: ["img/paneles/panel-bosque-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-semillas", cat:"paneles", nombre:"Panel Semillas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"semillas",
    fotos: ["img/paneles/panel-semillas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-ondas", cat:"paneles", nombre:"Panel Ondas",
    desc:"Se realizan a medida de forma personalizada y se entregan sin pintar. El precio puede variar según el tamaño y el espesor, sin importar el modelo elegido.",
    material:"chapa", motivo:"ondas",
    fotos: ["img/paneles/panel-ondas-1.png", "img/paneles/panel-rosas-2.png", "img/paneles/panel-ondas-3.png"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"escudo-club", cat:"escudos", nombre:"Escudo de tu club",
    desc:"Cortado a partir del escudo oficial, en el color que elijas. Decinos cuál en el pedido.",
    material:"chapa", motivo:"escudo",
    medidas:[
      {nombre:'30 cm de alto', precios:{ '0,9 mm':21000, '1,2 mm':23500, '2 mm':27000, '3 mm':30500 }},
      {nombre:'45 cm de alto', precios:{ '0,9 mm':33000, '1,2 mm':37000, '2 mm':42000, '3 mm':48000 }},
      {nombre:'60 cm de alto', precios:{ '0,9 mm':48000, '1,2 mm':54000, '2 mm':61000, '3 mm':70000 }}
    ]
  },
  {
    id:"escudo-luz", cat:"escudos", nombre:"Escudo retroiluminado",
    desc:"Mismo corte, montado sobre base con tira LED cálida. Se enchufa a 220 V y trae ficha.",
    material:"chapa", motivo:"escudo",
    medidas:[
      {nombre:'40 cm de alto', precios:{ '0,9 mm':52000, '1,2 mm':58000, '2 mm':67000, '3 mm':75000 }},
      {nombre:'55 cm de alto', precios:{ '0,9 mm':71000, '1,2 mm':80000, '2 mm':91000, '3 mm':103000 }}
    ]
  },
  {
    id:"parrilla-rocket", cat:"parrillas", nombre:"Parrilla Rocket",
    desc:"Hierros en V con canaleta recolectora de grasa. Incluye asador y regulación de altura.",
    material:"chapa", motivo:"parrilla",
    video: "img/parrillas/cocina-rocket.mp4",
    videoPosicion: 99,
    aspecto: "491/625",
    fotos: ["img/parrillas/cocina-rocket-1.png", "img/parrillas/cocina-rocket-2.png", "img/parrillas/cocina-rocket-3.png"],
    modelos:[
      {nombre:"Modelo Estándar", spec:"45 cm × 2,5 mm", precio:85000},
      {nombre:"Modelo Premium",  spec:"55 cm × 3,2 mm", precio:130000}
    ]
  },
  {
    id:"tapa-disco", cat:"parrillas", nombre:"Tapa de disco calada",
    desc:"Tapa con calado decorativo y manija de hierro macizo. Entra en discos de arado estándar.",
    material:"chapa", motivo:"disco",
    medidas:[
      {nombre:'Disco de 40 cm', precios:{ '0,9 mm':38000, '1,2 mm':43000, '2 mm':49000, '3 mm':55000 }},
      {nombre:'Disco de 50 cm', precios:{ '0,9 mm':47000, '1,2 mm':53000, '2 mm':60000, '3 mm':68000 }}
    ]
  },
  {
    id:"numeros-casa", cat:"hogar", nombre:"Número de casa",
    desc:"Dígitos en chapa de 3 mm con separadores para que proyecten sombra sobre la pared.",
    material:"chapa", motivo:"numero",
    medidas:[
      {nombre:'15 cm de alto (por dígito)', precios:{ '0,9 mm':8500,  '1,2 mm':9500,  '2 mm':11000, '3 mm':12500 }},
      {nombre:'25 cm de alto (por dígito)', precios:{ '0,9 mm':13500, '1,2 mm':15000, '2 mm':17500, '3 mm':19500 }}
    ]
  },
  {
    id:"perchero", cat:"hogar", nombre:"Perchero de pared",
    desc:"Placa calada con cinco ganchos rebatibles. Viene con tarugos y tornillos.",
    material:"chapa", motivo:"perchero",
    medidas:[
      {nombre:'50 × 15 cm', precios:{ '0,9 mm':26000, '1,2 mm':29000, '2 mm':33000, '3 mm':38000 }},
      {nombre:'80 × 15 cm', precios:{ '0,9 mm':37000, '1,2 mm':41000, '2 mm':47000, '3 mm':54000 }}
    ]
  }
];

const CATEGORIAS = [
  {id:"todos",     nombre:"Todo el catálogo"},
  {id:"paneles",   nombre:"Paneles decorativos"},
  {id:"escudos",   nombre:"Escudos"},
  {id:"parrillas", nombre:"Parrillas"},
  {id:"hogar",     nombre:"Hogar"}
];