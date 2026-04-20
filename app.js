const API_KEY = "2TJcJSZKFexX6zGya89iT5aHaSr6MRiuLBLTU9Sr";
let apodActual = null;
// Esperar a que cargue el HTML
document.addEventListener("DOMContentLoaded", () => {
    const inputFecha = document.getElementById("fecha");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnFavorito = document.getElementById("btnFavorito");
    const img = document.getElementById("imagen");
    const titulo = document.querySelector(".description__title");
    const descripcion = document.querySelector(".description__description");
    // 🔹 Cargar APOD
    async function cargarAPOD(fecha = "") {
        const url = fecha
            ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`
            : `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            if (datos.error) throw new Error(datos.error.message);
            apodActual = datos;
            // Mostrar datos
            titulo.textContent = datos.title;
            descripcion.textContent = datos.explanation;
            if (datos.media_type === "image") {
                img.src = datos.url;
            } else {
                img.src = "";
                alert("Este contenido es un video");
            }
        } catch (error) {
            console.error(error);
            alert("Error al cargar datos");
        }
    }
    // 🔹 Buscar por fecha
    btnBuscar.addEventListener("click", () => {
        const fecha = inputFecha.value;
        if (!fecha) {
            alert("Selecciona una fecha");
            return;
        }
        const hoy = new Date().toISOString().split("T")[0];
        if (fecha > hoy) {
            alert("No puedes elegir una fecha futura");
            return;
        }
        if (fecha < "1995-06-16") {
            alert("Fecha inválida (mínimo 1995)");
            return;
        }
        cargarAPOD(fecha);
    });
    // 🔹 Guardar favoritos
    btnFavorito.addEventListener("click", () => {
        if (!apodActual) return;
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (favoritos.some(f => f.date === apodActual.date)) {
            alert("Ya está en favoritos");
            return;
        }
        favoritos.push(apodActual);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Guardado en favoritos ⭐");
    });
    // 🔥 Cargar al inicio
    cargarAPOD();
});