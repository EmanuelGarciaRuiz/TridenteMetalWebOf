/* tienda.js — el funcionamiento del catálogo y el carrito.
   No hace falta que toques nada acá. */

/* ============================================================
   LÓGICA DE LA TIENDA
   ============================================================ */
const pesos = n => "$" + Math.round(n).toLocaleString("es-AR");
let filtroActivo = "todos";
let carrito = [];

// Nombre en singular de cada categoría, para la etiqueta chiquita
// que aparece arriba de la foto en cada tarjeta.
const ETIQUETA_CATEGORIA = {
  paneles: "Panel",
  escudos: "Escudo",
  parrillas: "Parrilla",
  hogar: "Hogar"
};

// Lista de nombres de espesor disponibles para un producto,
// según su material. Si el material no tiene lista en ESPESORES,
// se usa un único espesor "Estándar" (no rompe productos viejos).
function espesoresDe(p){
  return (typeof ESPESORES !== "undefined" && ESPESORES[p.material]) || ["Estándar"];
}

function listaFotos(p){
  if (p.fotos && p.fotos.length) return p.fotos;
  if (p.foto) return [p.foto];
  return [];
}

// Si el producto trae "aspecto" (ej: "491/625"), fuerza esa proporción
// de ancho/alto en el recuadro de la foto/video, en vez del 4:3 de
// siempre. Útil cuando el video (o las fotos) son verticales.
function estiloAspecto(p){
  return p.aspecto ? ` style="aspect-ratio:${p.aspecto}"` : "";
}

// Arma la lista de "slides" del carrusel. Si el producto tiene video,
// se inserta en la posición que le indiques con "videoPosicion"
// (0 = primero, 1 = segundo lugar, etc). Si no ponés nada, va primero.
// Cada slide queda como {tipo, src}.
function listaMedios(p){
  const fotos = listaFotos(p).map(f => ({ tipo:"foto", src:f }));
  if (!p.video) return fotos;
  const pos = Number.isInteger(p.videoPosicion)
    ? Math.max(0, Math.min(p.videoPosicion, fotos.length))
    : 0;
  const medios = fotos.slice();
  medios.splice(pos, 0, { tipo:"video", src:p.video });
  return medios;
}

// Devuelve el HTML de un slide. El video siempre va muteado (sin
// sonido); en la ficha ampliada además tiene controles para que el
// cliente pueda pausarlo, adelantarlo o, si quiere, activar el sonido
// a mano desde el propio reproductor.
function medioHTML(m, p, grande){
  if (m.tipo === "video"){
    return grande
      ? `<video class="foto-activa" src="${m.src}" muted controls playsinline style="object-position:${p.posicion || 'center'}"></video>`
      : `<video class="foto-activa" src="${m.src}" muted loop autoplay playsinline style="object-position:${p.posicion || 'center'}"></video>`;
  }
  return `<img src="${m.src}" alt="${p.nombre}" loading="lazy" class="foto-activa" style="object-position:${p.posicion || 'center'}">`;
}

// --- Filtros ---
document.getElementById("filtros").innerHTML = CATEGORIAS.map(c =>
  `<button class="filtro" aria-pressed="${c.id===filtroActivo}" onclick="filtrar('${c.id}')">${c.nombre}</button>`
).join("");

function filtrar(cat){
  filtroActivo = cat;
  document.querySelectorAll(".filtro").forEach((b,i)=>
    b.setAttribute("aria-pressed", CATEGORIAS[i].id === cat));
  pintarGrilla();
}

/* ============================================================
   CALCULADORA DE PANELES (categoría "paneles", material "chapa")
   El cliente elige medida + espesor una sola vez acá arriba,
   y ese precio se aplica a cualquiera de los diseños de abajo.
   ============================================================ */
let panelMedida = 0;
let panelEspesor = 0;
let panelCantidades = {}; // id de producto -> cantidad elegida (arranca en 1)
let modeloSeleccionado = {}; // id de producto -> índice del modelo elegido (arranca en 0)

function precioPanelActual(){
  const medida = PANELES.medidas[panelMedida];
  const nombreEspesor = PANELES.espesores[panelEspesor];
  return medida.precios[nombreEspesor] ?? 0;
}

function htmlCalculadoraPaneles(){
  return `
    <div class="calc-paneles">
      <div class="calc-paneles-info">
        <h3>Elegí medida y espesor</h3>
        <p>Este precio aplica a cualquiera de los diseños en chapa que ves abajo.</p>
      </div>
      <div class="calc-paneles-selectores">
        <div>
          <label for="panel-sel-medida">Medida</label>
          <select id="panel-sel-medida" onchange="actualizarCalculadoraPaneles()">
            ${PANELES.medidas.map((m,i)=>`<option value="${i}" ${i===panelMedida?"selected":""}>${m.nombre}</option>`).join("")}
          </select>
        </div>
        <div>
          <label for="panel-sel-espesor">Espesor</label>
          <select id="panel-sel-espesor" onchange="actualizarCalculadoraPaneles()">
            ${PANELES.espesores.map((e,i)=>`<option value="${i}" ${i===panelEspesor?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="calc-paneles-precio">
        <small>Precio por panel</small>
        <b id="panel-precio-calc">${pesos(precioPanelActual())}</b>
      </div>
    </div>`;
}

function actualizarCalculadoraPaneles(){
  panelMedida = +document.getElementById("panel-sel-medida").value;
  panelEspesor = +document.getElementById("panel-sel-espesor").value;
  const precio = precioPanelActual();
  const elCalc = document.getElementById("panel-precio-calc");
  if (elCalc) elCalc.textContent = pesos(precio);
  document.querySelectorAll(".precio-panel-modelo").forEach(el => {
    const id = el.id.replace("precio-panel-", "");
    const cant = panelCantidades[id] || 1;
    el.textContent = pesos(precio * cant);
  });
}

function tarjetaPanelSimplificada(p){
  const medios = listaMedios(p);
  const cant = panelCantidades[p.id] || 1;
  return `
    <article class="pieza" onclick="abrirDetalle('${p.id}')">
      <div class="pieza-visual" data-indice="0"${estiloAspecto(p)}>
        ${medios.length
          ? medioHTML(medios[0], p, false)
          : dibujo(p.motivo, p.material)}
        ${medios.some(m=>m.tipo==="video") ? `<span class="etiqueta-video" style="display:${medios[0].tipo==="video"?"flex":"none"}">&#9654; video</span>` : ""}
        ${medios.length > 1 ? `
          <button class="flecha flecha-izq" aria-label="Anterior" onclick="event.stopPropagation();moverFoto(this,'${p.id}',-1)">&#8249;</button>
          <button class="flecha flecha-der" aria-label="Siguiente" onclick="event.stopPropagation();moverFoto(this,'${p.id}',1)">&#8250;</button>
          <div class="puntos">
            ${medios.map((m,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver ${i+1} de ${p.nombre}" onclick="event.stopPropagation();cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
          </div>` : ""}
      </div>
      <div class="pieza-cuerpo">
        <h3>${p.nombre}</h3>
        ${p.desc ? `<p class="pieza-desc">${p.desc}</p>` : ""}
        <div class="pieza-opciones" onclick="event.stopPropagation()">
          <div class="pieza-pie">
            <span class="precio precio-panel-modelo" id="precio-panel-${p.id}">${pesos(precioPanelActual() * cant)}</span>
            <div class="cant">
              <button onclick="cambiarCantPanel('${p.id}',-1)" aria-label="Restar una unidad">−</button>
              <span id="cant-panel-num-${p.id}">${cant}</span>
              <button onclick="cambiarCantPanel('${p.id}',1)" aria-label="Sumar una unidad">+</button>
            </div>
          </div>
          <button class="btn-sumar" style="width:100%" id="btn-panel-${p.id}" onclick="seleccionarPanel('${p.id}')">Seleccionar</button>
        </div>
      </div>
    </article>`;
}

function cambiarCantPanel(id, delta){
  const actual = panelCantidades[id] || 1;
  const nuevo = Math.max(1, actual + delta);
  panelCantidades[id] = nuevo;
  const el = document.getElementById("cant-panel-num-" + id);
  if (el) el.textContent = nuevo;
  const elPrecio = document.getElementById("precio-panel-" + id);
  if (elPrecio) elPrecio.textContent = pesos(precioPanelActual() * nuevo);
}

function seleccionarPanel(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const medida = PANELES.medidas[panelMedida];
  const nombreEspesor = PANELES.espesores[panelEspesor];
  const precio = precioPanelActual();
  const cant = panelCantidades[id] || 1;
  const clave = id + "::panel::" + panelMedida + "::" + panelEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant += cant;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:medida.nombre, espesor:nombreEspesor, precio, cant
  });

  panelCantidades[id] = 1;
  const num = document.getElementById("cant-panel-num-" + id);
  if (num) num.textContent = 1;
  const elPrecio = document.getElementById("precio-panel-" + id);
  if (elPrecio) elPrecio.textContent = pesos(precio);

  const btn = document.getElementById("btn-panel-" + id);
  if (btn){
    btn.textContent = "Seleccionado";
    btn.classList.add("listo");
    setTimeout(() => { btn.textContent = "Seleccionar"; btn.classList.remove("listo"); }, 1300);
  }

  pintarCarrito();
}

/* ============================================================
   TARJETA DE MODELOS — para productos que en vez de medida+espesor
   se eligen con 2 (o más) botones, tipo "Modelo Estándar / Premium".
   Para usarla, en productos.js poné "modelos:[...]" en vez de "medidas:[...]",
   con cada modelo como {nombre, spec, precio}.
   ============================================================ */
function tarjetaModelos(p){
  const medios = listaMedios(p);
  const idxSel = modeloSeleccionado[p.id] || 0;
  const modelo = p.modelos[idxSel];
  return `
    <article class="pieza" onclick="abrirDetalle('${p.id}')">
      <div class="pieza-visual ${p.material==='mdf'?'es-mdf':''}" data-indice="0"${estiloAspecto(p)}>
        ${medios.length
          ? medioHTML(medios[0], p, false)
          : dibujo(p.motivo, p.material)}
        ${medios.some(m=>m.tipo==="video") ? `<span class="etiqueta-video" style="display:${medios[0].tipo==="video"?"flex":"none"}">&#9654; video</span>` : ""}
        ${medios.length > 1 ? `
          <button class="flecha flecha-izq" aria-label="Anterior" onclick="event.stopPropagation();moverFoto(this,'${p.id}',-1)">&#8249;</button>
          <button class="flecha flecha-der" aria-label="Siguiente" onclick="event.stopPropagation();moverFoto(this,'${p.id}',1)">&#8250;</button>
          <div class="puntos">
            ${medios.map((m,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver ${i+1} de ${p.nombre}" onclick="event.stopPropagation();cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
          </div>` : ""}
        <span class="etiqueta-mat">${ETIQUETA_CATEGORIA[p.cat] || p.cat}</span>
      </div>
      <div class="pieza-cuerpo">
        <h3>${p.nombre}</h3>
        ${p.desc ? `<p class="pieza-desc">${p.desc}</p>` : ""}
        <div class="pieza-opciones" onclick="event.stopPropagation()">
          <div class="modelos-botones" role="group" aria-label="Modelo de ${p.nombre}">
            ${p.modelos.map((m,i)=>`<button type="button" class="btn-modelo ${i===idxSel?'activo':''}" onclick="elegirModelo('${p.id}',${i})">${m.nombre}</button>`).join("")}
          </div>
          <p class="modelo-spec" id="spec-${p.id}">${modelo.spec}</p>
          <div class="pieza-pie">
            <span class="precio" id="precio-${p.id}">${pesos(modelo.precio)}</span>
            <button class="btn-sumar" id="btn-${p.id}" onclick="sumarModelo('${p.id}')">Agregar</button>
          </div>
        </div>
      </div>
    </article>`;
}

function elegirModelo(id, idx){
  modeloSeleccionado[id] = idx;
  const p = PRODUCTOS.find(x => x.id === id);
  const modelo = p.modelos[idx];

  document.getElementById("spec-" + id).textContent = modelo.spec;
  document.getElementById("precio-" + id).textContent = pesos(modelo.precio);
  document.querySelectorAll(`[onclick^="elegirModelo('${id}',"]`).forEach((btn, i) =>
    btn.classList.toggle("activo", i === idx));
}

function sumarModelo(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const idx = modeloSeleccionado[id] || 0;
  const modelo = p.modelos[idx];
  const clave = id + "::modelo::" + idx;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant++;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:modelo.nombre, espesor:modelo.spec, precio:modelo.precio, cant:1
  });

  const btn = document.getElementById("btn-" + id);
  btn.textContent = "Agregado";
  btn.classList.add("listo");
  setTimeout(() => { btn.textContent = "Agregar"; btn.classList.remove("listo"); }, 1300);

  pintarCarrito();
}

/* ============================================================
   TARJETA GENÉRICA — para todo lo que NO sea un panel de chapa
   (escudos, parrillas, cuadros, hogar, y Panel Hexágonos que es
   MDF y sigue con su propio selector de medida + espesor).
   ============================================================ */
function precioDe(p, indiceMedida, indiceEspesor){
  const espesores = espesoresDe(p);
  const nombreEspesor = espesores[indiceEspesor] || espesores[0];
  const medida = p.medidas[indiceMedida];
  if (medida.precios[nombreEspesor] === undefined){
    console.warn(`Falta el precio de "${nombreEspesor}" en la medida "${medida.nombre}" del producto "${p.id}"`);
    return 0;
  }
  return medida.precios[nombreEspesor];
}

function tarjetaGenerica(p){
  const medios = listaMedios(p);
  const espesores = espesoresDe(p);
  return `
    <article class="pieza" onclick="abrirDetalle('${p.id}')">
      <div class="pieza-visual ${p.material==='mdf'?'es-mdf':''}" data-indice="0"${estiloAspecto(p)}>
        ${medios.length
          ? medioHTML(medios[0], p, false)
          : dibujo(p.motivo, p.material)}
        ${medios.some(m=>m.tipo==="video") ? `<span class="etiqueta-video" style="display:${medios[0].tipo==="video"?"flex":"none"}">&#9654; video</span>` : ""}
        ${medios.length > 1 ? `
          <button class="flecha flecha-izq" aria-label="Anterior" onclick="event.stopPropagation();moverFoto(this,'${p.id}',-1)">&#8249;</button>
          <button class="flecha flecha-der" aria-label="Siguiente" onclick="event.stopPropagation();moverFoto(this,'${p.id}',1)">&#8250;</button>
          <div class="puntos">
            ${medios.map((m,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver ${i+1} de ${p.nombre}" onclick="event.stopPropagation();cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
          </div>` : ""}
        <span class="etiqueta-mat">${ETIQUETA_CATEGORIA[p.cat] || p.cat}</span>
      </div>
      <div class="pieza-cuerpo">
        <h3>${p.nombre}</h3>
        ${p.desc ? `<p class="pieza-desc">${p.desc}</p>` : ""}
        <div class="pieza-opciones" onclick="event.stopPropagation()">
          <div class="pieza-selectores">
            <select id="sel-${p.id}" onchange="refrescarPrecio('${p.id}')" aria-label="Medida de ${p.nombre}">
              ${p.medidas.map((m,i)=>`<option value="${i}">${m.nombre}</option>`).join("")}
            </select>
            <select id="esp-${p.id}" onchange="refrescarPrecio('${p.id}')" aria-label="Espesor de ${p.nombre}">
              ${espesores.map((e,i)=>`<option value="${i}">${e}</option>`).join("")}
            </select>
          </div>
          <div class="pieza-pie">
            <span class="precio" id="precio-${p.id}">${pesos(precioDe(p,0,0))}</span>
            <button class="btn-sumar" id="btn-${p.id}" onclick="sumar('${p.id}')">Agregar</button>
          </div>
        </div>
      </div>
    </article>`;
}

function refrescarPrecio(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("sel-" + id).value;
  const iEspesor = +document.getElementById("esp-" + id).value;
  document.getElementById("precio-" + id).textContent = pesos(precioDe(p, iMedida, iEspesor));
}

function sumar(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("sel-" + id).value;
  const iEspesor = +document.getElementById("esp-" + id).value;
  const espesores = espesoresDe(p);
  const nombreEspesor = espesores[iEspesor] || espesores[0];
  const precio = precioDe(p, iMedida, iEspesor);
  const clave = id + "::" + iMedida + "::" + iEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant++;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:p.medidas[iMedida].nombre, espesor:nombreEspesor, precio, cant:1
  });

  const btn = document.getElementById("btn-" + id);
  btn.textContent = "Agregado";
  btn.classList.add("listo");
  setTimeout(() => { btn.textContent = "Agregar"; btn.classList.remove("listo"); }, 1300);

  pintarCarrito();
}

/* ============================================================
   GRILLA — decide qué tarjeta usar según la categoría
   ============================================================ */
// Decide qué tarjeta usar: si el producto tiene "modelos" usa los 2 botones,
// si no, la tarjeta genérica de medida + espesor.
function tarjetaProducto(p){
  return p.modelos ? tarjetaModelos(p) : tarjetaGenerica(p);
}

// Intercala productos de distintas categorías (un panel, un escudo,
// una parrilla, algo de hogar, y así) en vez de mostrarlos agrupados.
function intercalarPorCategoria(productos){
  const grupos = {};
  const orden = [];
  productos.forEach(p => {
    if (!grupos[p.cat]) { grupos[p.cat] = []; orden.push(p.cat); }
    grupos[p.cat].push(p);
  });
  const resultado = [];
  let quedan = true;
  while (quedan){
    quedan = false;
    for (const cat of orden){
      if (grupos[cat].length){
        resultado.push(grupos[cat].shift());
        quedan = true;
      }
    }
  }
  return resultado;
}

function pintarGrilla(){
  let lista = PRODUCTOS.filter(p => filtroActivo === "todos" || p.cat === filtroActivo);
  if (filtroActivo === "todos") lista = intercalarPorCategoria(lista);
  const contenedorCalc = document.getElementById("grilla-calc");

  if (filtroActivo === "paneles"){
    const panelesChapa = lista.filter(p => p.material === "chapa");
    const otros = lista.filter(p => p.material !== "chapa");

    contenedorCalc.innerHTML = htmlCalculadoraPaneles();
    document.getElementById("grilla").innerHTML =
      panelesChapa.map(tarjetaPanelSimplificada).join("") +
      otros.map(tarjetaProducto).join("");
  } else {
    contenedorCalc.innerHTML = "";
    document.getElementById("grilla").innerHTML = lista.map(tarjetaProducto).join("");
  }
}

// --- Fotos y video: cambiar y mover (usado por todas las tarjetas y la ficha) ---
function cambiarFoto(boton, id, indice){
  const p = PRODUCTOS.find(x => x.id === id);
  const medios = listaMedios(p);
  const visual = boton.closest(".pieza-visual");
  visual.dataset.indice = indice;
  const grande = visual.classList.contains("pieza-visual-grande");
  const actual = visual.querySelector(".foto-activa");
  const nuevoMedio = medios[indice];

  const reemplazo = document.createElement(nuevoMedio.tipo === "video" ? "video" : "img");
  reemplazo.className = "foto-activa";
  reemplazo.style.objectPosition = p.posicion || "center";
  reemplazo.src = nuevoMedio.src;
  if (nuevoMedio.tipo === "video"){
    reemplazo.muted = true;
    reemplazo.playsInline = true;
    if (grande) reemplazo.controls = true;
    else { reemplazo.loop = true; reemplazo.autoplay = true; }
  } else {
    reemplazo.alt = p.nombre;
    reemplazo.loading = "lazy";
  }
  actual.replaceWith(reemplazo);

  visual.querySelectorAll(".punto").forEach((b,i) => b.classList.toggle("activo", i === indice));
  const chip = visual.querySelector(".etiqueta-video");
  if (chip) chip.style.display = nuevoMedio.tipo === "video" ? "flex" : "none";
}

function moverFoto(boton, id, delta){
  const p = PRODUCTOS.find(x => x.id === id);
  const medios = listaMedios(p);
  const visual = boton.closest(".pieza-visual");
  const actual = +visual.dataset.indice;
  const nuevo = (actual + delta + medios.length) % medios.length;
  cambiarFoto(boton, id, nuevo);
}

/* ============================================================
   FICHA DE PRODUCTO (vista ampliada) — se abre al tocar cualquier
   parte de una publicación, igual que en Mercado Libre. Muestra la
   foto grande, la descripción completa y las mismas opciones de
   compra, para poder elegir y agregar al carrito sin volver atrás.
   ============================================================ */
function opcionesDetalle(p){
  if (p.modelos){
    const idxSel = modeloSeleccionado[p.id] || 0;
    const modelo = p.modelos[idxSel];
    return `
      <div class="modelos-botones" role="group" aria-label="Modelo de ${p.nombre}">
        ${p.modelos.map((m,i)=>`<button type="button" class="btn-modelo ${i===idxSel?'activo':''}" onclick="elegirModeloDetalle('${p.id}',${i})">${m.nombre}</button>`).join("")}
      </div>
      <p class="modelo-spec" id="d-spec-${p.id}">${modelo.spec}</p>
      <div class="pieza-pie">
        <span class="precio" id="d-precio-${p.id}">${pesos(modelo.precio)}</span>
        <button class="btn-sumar" id="d-btn-${p.id}" onclick="sumarModeloDetalle('${p.id}')">Agregar</button>
      </div>`;
  }
  if (p.cat === "paneles" && p.material === "chapa"){
    const cant = panelCantidades[p.id] || 1;
    return `
      <div class="pieza-pie">
        <span class="precio" id="d-precio-panel-${p.id}">${pesos(precioPanelActual() * cant)}</span>
        <div class="cant">
          <button onclick="cambiarCantPanelDetalle('${p.id}',-1)" aria-label="Restar una unidad">−</button>
          <span id="d-cant-panel-num-${p.id}">${cant}</span>
          <button onclick="cambiarCantPanelDetalle('${p.id}',1)" aria-label="Sumar una unidad">+</button>
        </div>
      </div>
      <button class="btn-sumar" style="width:100%" id="d-btn-panel-${p.id}" onclick="seleccionarPanelDetalle('${p.id}')">Seleccionar</button>`;
  }
  const espesores = espesoresDe(p);
  return `
    <div class="pieza-selectores">
      <select id="d-sel-${p.id}" onchange="refrescarPrecioDetalle('${p.id}')" aria-label="Medida de ${p.nombre}">
        ${p.medidas.map((m,i)=>`<option value="${i}">${m.nombre}</option>`).join("")}
      </select>
      <select id="d-esp-${p.id}" onchange="refrescarPrecioDetalle('${p.id}')" aria-label="Espesor de ${p.nombre}">
        ${espesores.map((e,i)=>`<option value="${i}">${e}</option>`).join("")}
      </select>
    </div>
    <div class="pieza-pie">
      <span class="precio" id="d-precio-${p.id}">${pesos(precioDe(p,0,0))}</span>
      <button class="btn-sumar" id="d-btn-${p.id}" onclick="sumarDetalle('${p.id}')">Agregar</button>
    </div>`;
}

function tarjetaDetalle(p){
  const medios = listaMedios(p);
  return `
    <div class="pieza-visual pieza-visual-grande ${p.material==='mdf'?'es-mdf':''}" data-indice="0"${estiloAspecto(p)}>
      ${medios.length
        ? medioHTML(medios[0], p, true)
        : dibujo(p.motivo, p.material)}
      ${medios.some(m=>m.tipo==="video") ? `<span class="etiqueta-video" style="display:${medios[0].tipo==="video"?"flex":"none"}">&#9654; video</span>` : ""}
      ${medios.length > 1 ? `
        <button class="flecha flecha-izq" aria-label="Anterior" onclick="moverFoto(this,'${p.id}',-1)">&#8249;</button>
        <button class="flecha flecha-der" aria-label="Siguiente" onclick="moverFoto(this,'${p.id}',1)">&#8250;</button>
        <div class="puntos">
          ${medios.map((m,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver ${i+1} de ${p.nombre}" onclick="cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
        </div>` : ""}
    </div>
    <div class="detalle-info">
      <span class="etiqueta-mat etiqueta-mat-inline">${ETIQUETA_CATEGORIA[p.cat] || p.cat}</span>
      <h2>${p.nombre}</h2>
      ${p.desc ? `<p class="detalle-desc">${p.desc}</p>` : ""}
      <div class="pieza-opciones">
        ${opcionesDetalle(p)}
      </div>
    </div>`;
}

function abrirDetalle(id){
  const p = PRODUCTOS.find(x => x.id === id);
  if (!p) return;
  document.getElementById("detalle-cuerpo").innerHTML = tarjetaDetalle(p);
  document.getElementById("detalle-velo").classList.add("abierto");
  document.body.style.overflow = "hidden";
}

function cerrarDetalle(){
  document.getElementById("detalle-velo").classList.remove("abierto");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarDetalle(); });

// --- Refrescar precio / agregar, versión de la ficha ampliada (tarjeta genérica) ---
function refrescarPrecioDetalle(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("d-sel-" + id).value;
  const iEspesor = +document.getElementById("d-esp-" + id).value;
  document.getElementById("d-precio-" + id).textContent = pesos(precioDe(p, iMedida, iEspesor));
}

function sumarDetalle(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("d-sel-" + id).value;
  const iEspesor = +document.getElementById("d-esp-" + id).value;
  const espesores = espesoresDe(p);
  const nombreEspesor = espesores[iEspesor] || espesores[0];
  const precio = precioDe(p, iMedida, iEspesor);
  const clave = id + "::" + iMedida + "::" + iEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant++;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:p.medidas[iMedida].nombre, espesor:nombreEspesor, precio, cant:1
  });

  const btn = document.getElementById("d-btn-" + id);
  btn.textContent = "Agregado";
  btn.classList.add("listo");
  setTimeout(() => { btn.textContent = "Agregar"; btn.classList.remove("listo"); }, 1300);

  pintarCarrito();
}

// --- Versión de la ficha ampliada para productos con "modelos" ---
function elegirModeloDetalle(id, idx){
  modeloSeleccionado[id] = idx;
  const p = PRODUCTOS.find(x => x.id === id);
  const modelo = p.modelos[idx];

  document.getElementById("d-spec-" + id).textContent = modelo.spec;
  document.getElementById("d-precio-" + id).textContent = pesos(modelo.precio);
  document.querySelectorAll(`[onclick^="elegirModeloDetalle('${id}',"]`).forEach((btn, i) =>
    btn.classList.toggle("activo", i === idx));
}

function sumarModeloDetalle(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const idx = modeloSeleccionado[id] || 0;
  const modelo = p.modelos[idx];
  const clave = id + "::modelo::" + idx;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant++;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:modelo.nombre, espesor:modelo.spec, precio:modelo.precio, cant:1
  });

  const btn = document.getElementById("d-btn-" + id);
  btn.textContent = "Agregado";
  btn.classList.add("listo");
  setTimeout(() => { btn.textContent = "Agregar"; btn.classList.remove("listo"); }, 1300);

  pintarCarrito();
}

// --- Versión de la ficha ampliada para paneles de chapa con calculadora ---
function cambiarCantPanelDetalle(id, delta){
  const actual = panelCantidades[id] || 1;
  const nuevo = Math.max(1, actual + delta);
  panelCantidades[id] = nuevo;
  const el = document.getElementById("d-cant-panel-num-" + id);
  if (el) el.textContent = nuevo;
  const elPrecio = document.getElementById("d-precio-panel-" + id);
  if (elPrecio) elPrecio.textContent = pesos(precioPanelActual() * nuevo);
}

function seleccionarPanelDetalle(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const medida = PANELES.medidas[panelMedida];
  const nombreEspesor = PANELES.espesores[panelEspesor];
  const precio = precioPanelActual();
  const cant = panelCantidades[id] || 1;
  const clave = id + "::panel::" + panelMedida + "::" + panelEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant += cant;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:medida.nombre, espesor:nombreEspesor, precio, cant
  });

  panelCantidades[id] = 1;
  const num = document.getElementById("d-cant-panel-num-" + id);
  if (num) num.textContent = 1;
  const elPrecio = document.getElementById("d-precio-panel-" + id);
  if (elPrecio) elPrecio.textContent = pesos(precio);

  const btn = document.getElementById("d-btn-panel-" + id);
  if (btn){
    btn.textContent = "Seleccionado";
    btn.classList.add("listo");
    setTimeout(() => { btn.textContent = "Seleccionar"; btn.classList.remove("listo"); }, 1300);
  }

  pintarCarrito();
}

/* ============================================================
   CARRITO
   ============================================================ */
function cambiarCant(clave, delta){
  const l = carrito.find(x => x.clave === clave);
  if (!l) return;
  l.cant += delta;
  if (l.cant < 1) carrito = carrito.filter(x => x.clave !== clave);
  pintarCarrito();
}

function quitar(clave){
  carrito = carrito.filter(x => x.clave !== clave);
  pintarCarrito();
}

function totalPedido(){
  return carrito.reduce((s,l) => s + l.precio * l.cant, 0);
}

function pintarCarrito(){
  const unidades = carrito.reduce((s,l) => s + l.cant, 0);
  document.getElementById("globo").textContent = unidades;
  document.getElementById("total").textContent = pesos(totalPedido());
  document.getElementById("precio-carrito").textContent = pesos(totalPedido());

  const caja = document.getElementById("cajon-lista");
  if (!carrito.length){
    caja.innerHTML = `<div class="vacio"><b>Todavía no elegiste nada</b>
      Sumá piezas del catálogo y las vas a ver acá.</div>`;
    return;
  }
  caja.innerHTML = carrito.map(l => `
    <div class="linea">
      <div class="linea-mini ${l.material==='mdf'?'es-mdf':''}">${l.foto
        ? `<img src="${l.foto}" alt="">`
        : dibujo(l.motivo,l.material)}</div>
      <div class="linea-info">
        <b>${l.nombre}</b>
        <small>${l.medida} · ${l.espesor} · ${l.material === "mdf" ? "MDF" : "Chapa"}</small>
        <div class="linea-abajo">
          <div class="cant">
            <button onclick="cambiarCant('${l.clave}',-1)" aria-label="Quitar una unidad">−</button>
            <span>${l.cant}</span>
            <button onclick="cambiarCant('${l.clave}',1)" aria-label="Sumar una unidad">+</button>
          </div>
          <span class="precio" style="font-size:1rem">${pesos(l.precio * l.cant)}</span>
        </div>
        <button class="quitar" onclick="quitar('${l.clave}')">Quitar del pedido</button>
      </div>
    </div>`).join("");
}

function abrirCarrito(){
  document.getElementById("cajon").classList.add("abierto");
  document.getElementById("velo").classList.add("abierto");
}
function cerrarCarrito(){
  document.getElementById("cajon").classList.remove("abierto");
  document.getElementById("velo").classList.remove("abierto");
}
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarCarrito(); });

// --- Pedido por WhatsApp ---
function pedirPorWhatsApp(){
  if (!carrito.length){
    alert("Elegí al menos una pieza del catálogo antes de enviar el pedido.");
    return;
  }
  const detalle = carrito.map(l =>
    `• ${l.cant}× ${l.nombre} — ${l.medida}, espesor ${l.espesor} (${l.material === "mdf" ? "MDF" : "Chapa"}) — ${pesos(l.precio * l.cant)}`
  ).join("\n");

  const texto =
`Hola Tridente Metal, quiero hacer este pedido:

${detalle}

Total estimado: ${pesos(totalPedido())}

Mi nombre:
Localidad para el envío:`;

  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank");
}

// --- Arranque ---
document.getElementById("anio").textContent = new Date().getFullYear();
pintarGrilla();
pintarCarrito();