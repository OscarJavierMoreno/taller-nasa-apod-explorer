
// ======= CONFIGURACIÓN =========
const API_KEY = "2TJcJSZKFexX6zGya89iT5aHaSr6MRiuLBLTU9Sr";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

//Captando elementos
const dateInput = document.getElementById("dateInput");
const titleData = document.getElementById("titleData");
const descriptionData = document.getElementById("descriptionData");
const descriptionDataContainer = document.getElementById("descriptionDataContainer");
const imgData = document.getElementById("imgData");
const buttonSearch = document.getElementById("buttonSearch");
const buttonFavorites = document.getElementById("buttonFavorites");
const favoritescontainer = document.getElementById("favoritescontainer");
const favoritesData = document.getElementById("favoritesData");


// ======== FUNCIÓN QUE TRAE LOS DATOS========
async function getData(date = "")
{
    try
    {
        const url = date 
            ? `${BASE_URL}?api_key=${API_KEY}&date=${date}` 
            : `${BASE_URL}?api_key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    }
    
    catch (error)
    {
        return null;
    }
}


// ======= FUNCIÓN PARA MOSTRAR LOS DATOS =======
function updateData(dataTitle, dataExplanation)
{
    titleData.textContent = dataTitle;
    descriptionData.textContent = dataExplanation;
}


// ======== FUNCIÓN PARA MOSTRAR CONTENEDORES =============
function showContainers(display)
{
    descriptionDataContainer.style.display = display;
    buttonFavorites.style.display = display;
    imgData.style.display = display;
}


// ======== FUNCIÓN PARA MOSTRAR CONTENEDORES =============
function clearData()
{
    titleData.textContent = "";
    descriptionData.textContent = "";
    imgData.src = "";

    // Opcional: ocultar mientras carga
    showContainers("none");
}


// ======== BOTÓN DE BÚSQUEDA ========
buttonSearch.addEventListener('click', async () =>
{
    buttonSearch.disabled = true;
    clearData();

    const selectedDate = dateInput.value;

    //Validación simple: no permitir fechas futuras
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate > today)
    {
        alert("La NASA no tiene imágenes de fechas futuras");
        buttonSearch.disabled = false;
        return;
    }

    const data = await getData(selectedDate);

    if (data !== null)
    {
        imgData.src = data.url;
        updateData(data.title, data.explanation);
    }
    
    else
    {
        updateData("Error al cargar", "La NASA no respondió o llegó al límite de peticiones. Intenta otra fecha.");
        imgData.src = "";
    }

    showContainers("block");

    buttonSearch.disabled = false;
});


// ======== BOTÓN DE FAVORITOS ========