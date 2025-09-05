function pullThings(){ // Hacemos una funcion para llamar a la api
    // Devolvemos la promesa de la revisada a la api
    return fetch('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=desafoIntegrador2&include=2')
    .then(data => data.json()) // Convertimos la data obtenida a json
    .then(json => { // Luego creamos un array vacio
        const assetUrls = []

        // Y por cada imagen en json.items[0].fields.servicesImages
        for(image of json.items[0].fields.servicesImages){
            const assetId = image.sys.id // Guardamos el id en una variable

            // Y guardamos en una variable la validacion del find en el que pregunta si el a.sys.id es el mismo que el assetId
            const asset = json.includes.Asset.find(a => a.sys.id === assetId);

            // Guardamos la url en una variable
            const assetRes = `https:${asset.fields.file.url}`;

            // Y hacemos el push en el array
            assetUrls.push(assetRes);
        }

        return assetUrls; // Y retornamos el array de urls
    })
}

function main(){ // Creamos la funcion main
    //* HEADER
    const wrapper = document.querySelector('.wrapper'); // Que obtiene el elemento .wrapper y lo guarda en una variable
    createHeader(wrapper); // Llamamos a la funcion createHeader y le pasamos wrapper como parametro

    //* CARGA DE IMAGENES
    const mainImg = document.querySelector('.main__img');

    pullThings().then(links => {
        if (links.length >= 2){
            mainImg.src = `${links[1]}`;
        }
    });

    //* CARDS
    const servicesContainer = document.querySelector('.cards-container');
    
    callApi('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=work&include=2').then(works => { // Llamamos la funcion callApi y le hacemos un then que recibe un parametro works
        for (i = 4; i < works.length; i++){ // Por cada work de works 
            createCard(servicesContainer, works[i]); // Llamamos a la funcion createElements con work como parametro
        } 

        
    });

    //* FOOTER
    createFooter(wrapper);
}

main();