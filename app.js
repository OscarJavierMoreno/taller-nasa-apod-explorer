// =============================================
// 1. CONFIGURACIÓN
// =============================================
const API_KEY = "2TJcJSZKFexX6zGya89iT5aHaSr6MRiuLBLTU9Sr";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

// Captando elementos
const dateInput = document.getElementById("dateInput");
const titleData = document.getElementById("titleData");
const descriptionData = document.getElementById("descriptionData");
const descriptionDataContainer = document.getElementById("descriptionDataContainer");
const imgData = document.getElementById("imgData");
const buttonSearch = document.getElementById("buttonSearch");
const buttonFavorites = document.getElementById("buttonFavorites");
const favoritescontainer = document.getElementById("favoritescontainer");
const favoritesList = document.getElementById("favoritesList");

// =============================================
// 2. FUNCIÓN QUE TRAE LOS DATOS (ya estaba buena)
// =============================================
async function getData(date = "")
{
    try
    {
        const url = date 
            ? `${BASE_URL}?api_key=${API_KEY}&date=${date}` 
            : `${BASE_URL}?api_key=${API_KEY}`;

        console.log("🌍 Consultando NASA →", url);

        const response = await fetch(url);

        if (!response.ok)
        {
            console.error(`❌ NASA error ${response.status}`);
            return null;
        }

        const data = await response.json();
        console.log("✅ Datos recibidos:", data.title);
        return data;

    }
    
    catch (error)
    {
        console.error("❌ Error de conexión:", error);
        return null;
    }
}

// =============================================
// 3. FUNCIÓN PARA MOSTRAR TÍTULO Y DESCRIPCIÓN
// =============================================
function updateData(dataTitle, dataExplanation)
{
    titleData.textContent = dataTitle;
    descriptionData.textContent = dataExplanation || "Sin explicación disponible";
}

// =============================================
// 4. FUNCIÓN PARA MOSTRAR LOS CONTENEDORES (CORREGIDA)
// =============================================
function showContainers()
{
    descriptionDataContainer.style.display = "block";
    buttonFavorites.style.display = "block";
    imgData.style.display = "block";
    favoritescontainer.style.display = "block";
}

// =============================================
// 5. BOTÓN DE BÚSQUEDA
// =============================================
buttonSearch.addEventListener('click', async () =>
{
    const selectedDate = dateInput.value;

    if (!selectedDate)
    {
        alert("Por favor selecciona una fecha");
        return;
    }

    // Validación de fecha futura
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate > today)
    {
        alert("La NASA no tiene imágenes de fechas futuras");
        return;
    }

    const data = await getData(selectedDate);

    if (data !== null)
    {
        imgData.src = data.url;                    // ← imagen del día
        updateData(data.title, data.explanation);
        console.log("🎉 APOD cargada correctamente");
    }
    
    else
    {
        updateData("Error al cargar", "La NASA no respondió o llegó al límite de peticiones. Prueba otra fecha.");
        imgData.src = "";
    }

    showContainers();   // ← ahora sí muestra todo
});

// =============================================
// 6. CARGAR LA FOTO DEL DÍA AUTOMÁTICAMENTE (lo que faltaba)
// =============================================
document.addEventListener('DOMContentLoaded', async () =>
{
    console.log("📄 Página cargada → mostrando APOD del día");
    const data = await getData();   // sin fecha = hoy

    if (data !== null) {
        imgData.src = data.url;
        updateData(data.title, data.explanation);
        showContainers();
    } else {
        updateData("Error", "No se pudo cargar la APOD del día");
    }
});