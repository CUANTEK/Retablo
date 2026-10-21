// ===== Datos del negocio =====
const WHATSAPP = "526251528577";

// ===== Catálogo =====
// Para agregar o cambiar productos edita esta lista.
// "fotos" son los archivos dentro de img/catalogo/ (si hay varias, se cambian con clic)
const PRODUCTOS = [
  { nombre: "Baúl grande", categoria: "Baúles", fotos: ["baul-1.jpg", "baul-2.jpg"], descripcion: "Baúl de madera con acabado envejecido, herrajes y base de metal. Amplio espacio para guardar." },
  { nombre: "Panera", categoria: "Cocina", fotos: ["panera-1.jpg", "panera-2.jpg"], descripcion: "Panera con puerta de persiana y repisa superior para especieros." },
  { nombre: "Juego de cocina", categoria: "Cocina", fotos: ["juego-cocina.jpg"], descripcion: "Charola, tabla para picar y rodillo de madera." },
  { nombre: "Porta biblia", categoria: "Porta biblias", fotos: ["porta-biblia-1.jpg", "porta-biblia-4.jpg"], descripcion: "Atril con cajón, disponible en acabado envejecido o natural." },
  { nombre: "Cuadro marco azul", categoria: "Cuadros y marcos", fotos: ["cuadro-azul.jpg"], descripcion: "Marco rústico doble con acabado desgastado en azul y natural." },
  { nombre: "Cuadro marco nogal", categoria: "Cuadros y marcos", fotos: ["cuadro-nogal.jpg"], descripcion: "Marco rústico doble en tono nogal y natural." },
  { nombre: "Portarretratos", categoria: "Cuadros y marcos", fotos: ["portarretratos.jpg"], descripcion: "Portarretratos de madera en varios tamaños y acabados." },
];

const grid = document.querySelector(".catalogo-grid");
const filtros = document.querySelector(".filtros");
const categorias = ["Todos", ...new Set(PRODUCTOS.map(p => p.categoria))];

function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function pintarCatalogo(categoria) {
  const lista = categoria === "Todos" ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === categoria);
  grid.innerHTML = lista.map(p => `
    <article class="producto">
      <div class="foto" data-label="FOTO: ${p.nombre} (img/catalogo/${p.fotos[0]})"
           data-fotos="${p.fotos.join(",")}" data-nombre="${p.nombre}">
        <img src="img/catalogo/${p.fotos[0]}" alt="${p.nombre}" loading="lazy">
        ${p.fotos.length > 1 ? `<span class="foto-contador">${p.fotos.length} fotos</span>` : ""}
      </div>
      <div class="producto-info">
        <span class="producto-cat">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="btn btn-chico" target="_blank" rel="noopener"
           href="${linkWhatsApp(`Hola, me interesa: ${p.nombre}. ¿Me pueden dar información?`)}">Cotizar</a>
      </div>
    </article>`).join("");
  prepararFotos(grid);
}

// ===== Visor de fotos en grande =====
const visor = document.getElementById("visor");
const visorImg = visor.querySelector(".visor-img");
const visorTitulo = visor.querySelector(".visor-titulo");
const visorContador = visor.querySelector(".visor-contador");
let visorFotos = [], visorI = 0;

function mostrarFoto(i) {
  visorI = (i + visorFotos.length) % visorFotos.length;
  visorImg.src = `img/catalogo/${visorFotos[visorI]}`;
  visorContador.textContent = visorFotos.length > 1 ? `${visorI + 1} / ${visorFotos.length}` : "";
}
function abrirVisor(fotos, nombre) {
  visorFotos = fotos;
  visorTitulo.textContent = nombre;
  visor.classList.toggle("una-foto", fotos.length < 2);
  mostrarFoto(0);
  visor.hidden = false;
  document.body.style.overflow = "hidden";
}
function cerrarVisor() {
  visor.hidden = true;
  document.body.style.overflow = "";
}

grid.addEventListener("click", e => {
  const caja = e.target.closest(".foto[data-fotos]");
  if (caja && !caja.classList.contains("vacia")) abrirVisor(caja.dataset.fotos.split(","), caja.dataset.nombre);
});
visor.addEventListener("click", e => {
  if (e.target.closest(".visor-ant")) mostrarFoto(visorI - 1);
  else if (e.target.closest(".visor-sig")) mostrarFoto(visorI + 1);
  else if (e.target === visor || e.target.closest(".visor-cerrar")) cerrarVisor();
});
document.addEventListener("keydown", e => {
  if (visor.hidden) return;
  if (e.key === "Escape") cerrarVisor();
  if (e.key === "ArrowLeft") mostrarFoto(visorI - 1);
  if (e.key === "ArrowRight") mostrarFoto(visorI + 1);
});
// Deslizar con el dedo en el celular
let toqueX = null;
visor.addEventListener("touchstart", e => { toqueX = e.touches[0].clientX; }, { passive: true });
visor.addEventListener("touchend", e => {
  if (toqueX === null || visorFotos.length < 2) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) mostrarFoto(visorI + (dx < 0 ? 1 : -1));
  toqueX = null;
});

filtros.innerHTML =categorias.map((c, i) =>
  `<button class="filtro${i === 0 ? " activo" : ""}" data-cat="${c}">${c}</button>`).join("");
filtros.addEventListener("click", e => {
  const boton = e.target.closest(".filtro");
  if (!boton) return;
  filtros.querySelectorAll(".filtro").forEach(b => b.classList.toggle("activo", b === boton));
  pintarCatalogo(boton.dataset.cat);
});

// ===== Fotos: si el archivo no existe, se muestra el aviso "FOTO: ..." =====
function prepararFotos(raiz = document) {
  raiz.querySelectorAll(".foto img").forEach(img => {
    const marcar = () => img.parentElement.classList.add("vacia");
    if (img.complete && img.naturalWidth === 0) marcar();
    else img.addEventListener("error", marcar, { once: true });
  });
}

pintarCatalogo("Todos");
prepararFotos();

// ===== Menú móvil =====
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const abierto = links.classList.toggle("abierto");
  toggle.setAttribute("aria-expanded", abierto);
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    links.classList.remove("abierto");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Correo (se oculta mientras esté vacío) =====
const correo = document.querySelector(".dato-correo");
if (correo.dataset.correo) {
  const a = correo.querySelector("a");
  a.href = `mailto:${correo.dataset.correo}`;
  a.textContent = correo.dataset.correo;
} else {
  correo.remove();
}

// ===== Formulario -> WhatsApp =====
document.getElementById("formulario").addEventListener("submit", e => {
  e.preventDefault();
  const datos = new FormData(e.target);
  const texto = `Hola, soy ${datos.get("nombre")}${datos.get("ciudad") ? ` de ${datos.get("ciudad")}` : ""}.\n${datos.get("mensaje")}`;
  window.open(linkWhatsApp(texto), "_blank");
});

document.getElementById("anio").textContent = new Date().getFullYear();
