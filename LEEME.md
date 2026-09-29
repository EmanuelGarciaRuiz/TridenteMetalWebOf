# Tridente Metal — sitio web

Tienda con catálogo y carrito. Los pedidos llegan por WhatsApp con el detalle
ya armado (productos, medidas, cantidades y total).

## Archivos

```
tridente-metal/
├── index.html          El contenido: textos, secciones, pie de página
├── css/
│   └── estilos.css     Colores, tipografía y diseño
└── js/
    ├── productos.js    ← TU NÚMERO Y TUS PRODUCTOS. Es el que vas a editar.
    ├── dibujos.js      Las ilustraciones vectoriales de cada producto
    └── tienda.js       El motor del catálogo y el carrito. No hace falta tocarlo.
```

## Cómo abrirlo en VS Code

1. Descomprimí la carpeta donde quieras (por ejemplo, en Documentos).
2. En VS Code: **Archivo → Abrir carpeta** y elegí la carpeta `tridente-metal`.
3. Instalá la extensión **Live Server** (buscala en el panel de extensiones).
4. Clic derecho sobre `index.html` → **Open with Live Server**.

Se abre en el navegador y cada vez que guardás con `Ctrl+S`, la página se
actualiza sola. Sin Live Server también funciona: doble clic en `index.html`.

## Lo primero que tenés que cambiar

Abrí **`js/productos.js`** y editá la línea de arriba de todo:

```js
const WHATSAPP = "5491100000000";
```

Poné tu número real sin el `+`, sin espacios y sin guiones.
Para Buenos Aires queda así: `54` + `9` + `11` + tu número. Ejemplo:
`5491145678901`.

## Cómo cambiar un precio o una medida

En el mismo archivo, cada producto es un bloque como este:

```js
{
  id:"panel-ramas", cat:"paneles", nombre:"Panel Ramas",
  desc:"Follaje entrelazado, nuestro diseño más pedido...",
  material:"chapa", motivo:"ramas",
  medidas:[
    {nombre:'60 × 60 cm', precio:42000},
    {nombre:'80 × 80 cm', precio:64000}
  ]
},
```

- **precio** va sin `$` ni puntos. Cuarenta y dos mil se escribe `42000`.
- **medidas** puede tener las opciones que quieras; agregá o borrá líneas.
- **material** acepta `"chapa"` o `"mdf"`. Cambia el color de fondo y la etiqueta.

## Cómo agregar un producto nuevo

Copiá un bloque entero (desde `{` hasta `},`), pegalo abajo y cambiale los
datos. Ojo con dos cosas:

- El **`id`** tiene que ser distinto al de todos los demás.
- El **`motivo`** tiene que ser uno de los que existen en `js/dibujos.js`:
  `ramas`, `ondas`, `hexa`, `bambu`, `escudo`, `parrilla`, `disco`, `mapa`,
  `cartel`, `numero`, `perchero`.

Si el producto nuevo no encaja en ninguna categoría existente, agregá una en
la lista `CATEGORIAS` del mismo archivo.

## Cómo poner fotos reales en lugar de los dibujos

Los dibujos son vectores que sirven mientras no tengas fotos. Para
reemplazarlos:

1. Creá una carpeta `img/` y meté ahí las fotos.
2. En el producto, cambiá `motivo:"ramas"` por `foto:"img/panel-ramas.jpg"`.
3. En `js/tienda.js`, dentro de `pintarGrilla()`, buscá la línea
   `${dibujo(p.motivo, p.material)}` y reemplazala por:

```js
${p.foto ? `<img src="${p.foto}" alt="${p.nombre}" style="width:100%;height:100%;object-fit:cover">` : dibujo(p.motivo, p.material)}
```

Así los productos que tengan foto la muestran y los que no, siguen con el dibujo.

## Cómo cambiar los colores

En `css/estilos.css`, arriba de todo está el bloque `:root`. Cambiá ahí los
valores y se actualiza todo el sitio de una:

```css
--acero:#272E35;    gris oscuro de la chapa
--mdf:#C7A067;      tono madera
--corte:#DE5126;    naranja de los botones y acentos
--humo:#E9E6E0;     fondo claro general
```

## Cómo publicarla en internet

**Gratis y en un minuto:** entrá a [app.netlify.com/drop](https://app.netlify.com/drop)
y arrastrá la carpeta `tridente-metal` completa. Te da un link público al
instante. Para actualizar, volvés a arrastrar la carpeta.

**Con dominio propio:** comprá `tridentemetal.com.ar` en
[nic.ar](https://nic.ar) y apuntalo al sitio de Netlify desde la configuración
de dominios.

## Si más adelante querés cobrar con tarjeta

Esto necesita un paso extra que hacés vos desde tu cuenta de Mercado Pago:
generás un link de pago por producto y lo pegás en el archivo. Avisame cuando
quieras hacerlo y te dejo el código preparado para eso.
