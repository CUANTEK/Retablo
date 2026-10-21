// ===== Datos del negocio =====
const WHATSAPP = "526251528577";

// ===== Catálogo =====
// Para agregar o cambiar productos edita esta lista.
// "foto" es el nombre del archivo dentro de img/catalogo/
const PRODUCTOS = [
  { nombre: "Comedor rústico", categoria: "Comedores", foto: "comedor-1.jpg", descripcion: "Mesa de madera maciza con sillas a juego. Ideal para reuniones familiares." },
  { nombre: "Comedor moderno", categoria: "Comedores", foto: "comedor-2.jpg", descripcion: "Líneas limpias con el calor de la madera natural." },
  { nombre: "Sala artesanal", categoria: "Salas", foto: "sala-1.jpg", descripcion: "Estructura de madera con cojines cómodos y acabado a mano." },
  { nombre: "Mesa de centro", categoria: "Salas", foto: "mesa-centro.jpg", descripcion: "Pieza única que resalta la veta natural de la madera." },
  { nombre: "Cabecera tallada", categoria: "Recámaras", foto: "cabecera.jpg", descripcion: "Diseño rústico con detalles tallados." },
  { nombre: "Cómoda / buró", categoria: "Recámaras", foto: "comoda.jpg", descripcion: "Cajones amplios, herrajes resistentes y acabado protector." },
  { nombre: "Alacena / trinchador", categoria: "Cocina", foto: "alacena.jpg", descripcion: "Espacio para guardar con estilo tradicional." },
  { nombre: "Barra o isla", categoria: "Cocina", foto: "barra.jpg", descripcion: "Hecha a la medida de tu espacio." },
  { nombre: "Proyecto sobre medida", categoria: "Sobre medida", foto: "medida.jpg", descripcion: "¿Tienes una idea? La diseñamos y fabricamos contigo." },
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
      <div class="foto" data-label="FOTO: ${p.nombre} (img/catalogo/${p.foto})">
        <img src="img/catalogo/${p.foto}" alt="${p.nombre}" loading="lazy">
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

filtros.innerHTML = categorias.map((c, i) =>
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
