function callApi(url){ // Creamos una funcion llamada callApi que llamara a la API 
    return fetch(url) // En esta direccion
    .then(res => res.json()) // Luego convertira la promesa en un json
    .then(data => { 
        const collection = data.items.map(item => {

            /*
                //* Para validar la imagen es un poco tricky, basicamente debemos de hacer los siguientes pasos:

                //* data (el JSON de la api), trae una propiedad llamada includes, donde se encuentran las cosas como imagenes 

                //* En esta propiedad includes existe otra propiedad llamada Asset, donde se encuentran los links de las imagenes

                //* Luego busca que el asset que coincida ".find(asset => asset.sys.id === item.fields.imagen.sys.id)"

                //* Y si coinciden, sumamos https: y lo que nos devuelva imageAsset.fields.file.url
            */

            const imageAsset = data.includes?.Asset?.find(asset => asset.sys.id === item.fields.imagen.sys.id);

            return {
                title: item.fields.titulo,
                description: item.fields.descripcion,
                image: imageAsset ? `https:${imageAsset.fields.file.url}` : '', // Hacemos un ternario. Si imageAsset es true, devolvemos el link armado. Si no, devolvemos un string vacio
                url: item.fields.url
            }
        })

        return collection;
    }) // Y luego, retornara los datos
}

function createCard(el, params){
    const card = document.getElementById('card');

    card.content.querySelector('.card-title').innerText =  params.title;

    // Hacemos lo mismo con las diferentes propiedaddes de params
    card.content.querySelector('.card-image').src = params.image;
    card.content.querySelector('.card-text').innerText = params.description;

    const clone = document.importNode(card.content, true);
    el.appendChild(clone);
}