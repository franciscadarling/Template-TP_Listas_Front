/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto J   
    comidas = data;                   // Asignar el JSON a la variable comidas
    tarjeta ();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');
function tarjeta () {
  container.innerHTML=""
  comidas.forEach(comida => {
    container.innerHTML += `
    <article  class="card">
    <h2> ${comida.nombre}</h2>
    <h3> ${comida.categoria}</h3>
    <h3> ${comida.provincia}</h3>
    <div class="ingredien"><ul> ${comida.ingredientes.map(ingrediente =>`<li>${ingrediente}</li>`).join(``)}</ul></div>
    </article>
    `
  })}
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