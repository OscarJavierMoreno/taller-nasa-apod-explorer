//Captando la llave y el enlace
const API_KEY = "2TJcJSZKFexX6zGya89iT5aHaSr6MRiuLBLTU9Sr";
const BASE_URL = "https://api.nasa.gov/planetary/apod";


//Captando la fecha que el usuario digite
const dateInput = document.getElementById("dateInput");

//Captando el contenedor del la descripcion
const descriptionDataContainer = document.getElementById("descriptionDataContainer");

//Captando el título
const titleData = document.getElementById("titleData");

//Captando la descripción
const descriptionData = document.getElementById("descriptionData");

//Captando el boton de busqueda
const buttonSearch = document.getElementById("buttonSearch");

//Captando el boton de favoritos
const buttonFavorites = document.getElementById("buttonFavorites");

//Captando el contendor de la imagen
const imgData = document.getElementById("imgData");

//Captando el contenedor de los favoritos
const favoritescontainer = document.getElementById("favoritescontainer");



// -------- OBTENIDO LA INFORMACION DE LA API --------
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


// -------- AGREGANDO EL EVENTO AL BOTON DE BUSCAR --------
buttonSearch.addEventListener('click', async () =>
{
    const date = dateInput.value;
    const data = await getData(date);

    if (data !== null)
    {
        imgData.src = data.url;
        updateData(data.title, data.explanation);     
    }

    else
    {
        updateData("Error", "No se pudo cargar la información");
    }

    showContainers("block");
});


// -------- FUNCIÓN PARA MOSTRAR LOS DATOS --------
function updateData(dataTitle, dataExplanation)
{
    titleData.textContent = dataTitle;
    descriptionData.textContent = dataExplanation;
}

// -------- FUNCIÓN PARA MOSTRAR LOS CONTENEDORES --------
function showContainers(display)
{
    descriptionDataContainer.style.display = display;
    buttonFavorites.style.display = display;
    imgData.style.display = display; 
}