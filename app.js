
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
const favoritesList = document.getElementById("favoritesList");

//Declarando varibles elementos
let currentData = null;


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

    descriptionData.textContent = "";
    imgData.src = "";
    showContainers("none");
}


// ======== FUNCIÓN PARA AGREGAR A FAVORITOS =============
function addFavorite(data)
{
    //Creando los elementos
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const button = document.createElement("button");

    //Creando clases
    li.classList.add("favorites-box");

    img.classList.add("favorites__img");
    p.classList.add("favorites__description");
    button.classList.add("favorites__button-delete", "data__search-button", "data__styles");

    //Guardando el contenido
    img.src = data.url;
    img.alt = data.title;
    p.textContent = data.title;
    button.textContent = "Eliminar";

    // Evento eliminar
    button.addEventListener("click", () =>
    {
        li.remove();
    });

    //Armando la estructura
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(button);

    //Insertando en el DOM
    favoritesList.appendChild(li);

    //Mostrar contenedor porque está oculto
    favoritescontainer.style.display = "block";
}

// ======== BOTÓN DE BÚSQUEDA (Evento) ========
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
        currentData = data;
        imgData.src = data.url;
        img.alt = data.title;
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


// ======== BOTÓN DE FAVORITOS (Evento) ========
buttonFavorites.addEventListener('click', () =>
{
    if (!currentData) return;

    addFavorite(currentData);
});