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
           data-fotos="${p.fotos.join(",")}" data-i="0">
        <img src="img/catalogo/${p.fotos[0]}" alt="${p.nombre}" loading="lazy">
        ${p.fotos.length > 1 ? `<span class="foto-contador">1 / ${p.fotos.length}</span>` : ""}
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

// Clic en la foto de un producto: pasa a la siguiente
grid.addEventListener("click", e => {
  const caja = e.target.closest(".foto[data-fotos]");
  if (!caja) return;
  const fotos = caja.dataset.fotos.split(",");
  if (fotos.length < 2) return;
  const i = (Number(caja.dataset.i) + 1) % fotos.length;
  caja.dataset.i = i;
  caja.querySelector("img").src = `img/catalogo/${fotos[i]}`;
  caja.querySelector(".foto-contador").textContent = `${i + 1} / ${fotos.length}`;
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
