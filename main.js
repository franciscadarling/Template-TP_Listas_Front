/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto J   
    comidas = data;                   // Asignar el JSON a la variable comidas
    tarjeta (comidas);
    actualizarFiltros();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function tarjeta(listaComidas = comidas) {
  container.innerHTML = "";
  listaComidas.forEach(comida => {
    container.innerHTML += `
      <article class="card">
        <h2>${comida.nombre}</h2>
        <h3>${comida.categoria}</h3>
        <h3>${comida.provincia}</h3>
        <div class="ingredien">
          <ul>${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join(``)}</ul>
        </div>
      </article>
    `;
  });
}
  let form = document.getElementById("formulario");
  form.addEventListener("submit",  (event) => {
    event.preventDefault()
    let nuevacomida = {
      nombre: event.target.nombre.value,
      categoria: event.target.categoria.value,
      provincia: event.target.provincia.value,
      ingredientes: event.target.ingredientes.value.split(",")
    }
    comidas.push (nuevacomida);
    tarjeta ()
    event.target.reset()
  })
 const buscador = document.getElementById("inputBusqueda");
 const filtroCategoria = document.getElementById("filtroTipo");
 const filtroProvincia = document.getElementById("filtroLugar");
filtroProvincia.addEventListener("change", filtrar);
filtroTipo.addEventListener("change", filtrar);

function filtrar() {
  const categoriaSeleccionada = filtroTipo.value;
  const provinciaSeleccionada = filtroProvincia.value;

  const comidasFiltradas = comidas.filter(comida => {
  const coincideCategoria = categoriaSeleccionada === "" || comida.categoria === categoriaSeleccionada;
  const coincideProvincia = provinciaSeleccionada === "" || comida.provincia === provinciaSeleccionada;

    return coincideCategoria && coincideProvincia;
  });

  tarjeta(comidasFiltradas);
}
buscador.addEventListener("input", buscar)
function buscar () {
  const texto = buscador.value.toLowerCase();
  const comidasFiltradas = comidas.filter(comida => {
    return comida.nombre.toLowerCase().includes(texto)
    || comida.provincia.toLowerCase().includes(texto)
    || comida.categoria.toLowerCase().includes(texto)
})
tarjeta(comidasFiltradas)
}


 /*function actualizarFiltros(){
  filtroCategoria.innerHTML += `option value ="">Todas las categorías</option>`
  let categorias = []
  comidas.forEach(comida => {
    if(!categorias.includes(comida.categoria)){
      categorias.push(comida.categoria)
    }
  })
  categorias.forEach(categoria => {
    filtroCategoria.innerHTML+=`<option value ="${categoria}">${categoria}</option>`
  })

  filtroProvincia.innerHTML += `option value ="">Todas las provincias</option>`
  let provincias = []
  comidas.forEach(comida => {
    if(!provincias.includes(comida.provincia)){
      categorias.push(comida.provincia)
    }
  })
  provincias.forEach(provincia => {
    filtroProvincia.innerHTML+=`<option value ="${provincia}">${provincia}</option>`
  })
 } mi código con errores*/ 
  //código corregido por gemini:
  function actualizarFiltros(){
    filtroCategoria.innerHTML = `<option value="">Todas las categorías</option>`
    let categorias = []
    comidas.forEach(comida => {
      if(!categorias.includes(comida.categoria)){
        categorias.push(comida.categoria)
      }
    })
    categorias.forEach(categoria => {
      filtroCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
    })
    filtroProvincia.innerHTML = `<option value="">Todas las provincias</option>`
    let provincias = []
    comidas.forEach(comida => {
      if(!provincias.includes(comida.provincia)){
        provincias.push(comida.provincia)
      }
    })
    provincias.forEach(provincia => {
      filtroProvincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
    })
  }