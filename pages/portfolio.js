function pullThings(){ // Hacemos una funcion para llamar a la api
    // Devolvemos la promesa de la revisada a la api
    return fetch('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=desafoIntegrador2&include=2')
    .then(data => data.json()) // Convertimos la data obtenida a json
    .then(json => {
        const assetUrls = []; // Luego creamos un array vacio

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
    // Obtenemos los elementos del dom
    const mainImg = document.querySelector('.main__img');
    const servicesBtnImg = document.querySelector('.services__btn-img');

    // Ejecutamos la funcion y hacemos el then que recibe los links
    pullThings().then(links => {
        // Si la longitud de links es mayor o igual a 2
        if (links.length >= 2){
            // Guardamos en cada elemento del dom, el src de la url correspondiente
            servicesBtnImg.src = `${links[0]}`;
            mainImg.src = `${links[1]}`;
        }
    });

    //* CARDS
    const servicesContainer = document.querySelector('.cards-container');
    
    callApi('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=work&include=2').then(works => { // Llamamos la funcion callApi y le hacemos un then que recibe un parametro works
        for (i = 0; i < 4; i++){ // Empezamos un for en 0 y mientras sea menor a 4 (porque hay alguna informacion innecesaria luego)
            createCard(servicesContainer, works[i]); // Llamamos a la funcion createElements con work como parametro y en la posicion de i
        } 

        //* SHOW MORE BUTTON
        // Obtenemos elementos del dom
        const servicesBtn = document.querySelector('.services__btn');
        const cards = document.querySelectorAll('.card');

        // Escuchamos el boton con el evento de click
        servicesBtn.addEventListener('click', ()=>{
            // Y por cada elemento de cards
            cards.forEach(card => { // Recibimos la card 
                // Y le ponemos el display flex
                card.style.display = 'flex';
            });

            // Y quitamos el boton
            servicesBtn.style.display = 'none';
        });
    });

    //* FOOTER
    createFooter(wrapper);
}

main();