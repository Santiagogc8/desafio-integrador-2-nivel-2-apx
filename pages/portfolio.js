function pullThings(){
    return fetch('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=desafoIntegrador2&include=2')
    .then(data => data.json())
    .then(json => {
        const assetUrls = []

        for(image of json.items[0].fields.servicesImages){
            const assetId = image.sys.id

            const asset = json.includes.Asset.find(a => a.sys.id === assetId);

            const assetRes = `https:${asset.fields.file.url}`;

            assetUrls.push(assetRes);
        }

        return assetUrls;
    })
}

function main(){
    //* HEADER
    const wrapper = document.querySelector('.wrapper'); // Que obtiene el elemento .wrapper y lo guarda en una variable
    createHeader(wrapper); // Llamamos a la funcion createHeader y le pasamos wrapper como parametro

    //* CARGA DE IMAGENES
    const mainImg = document.querySelector('.main__img');
    const servicesBtnImg = document.querySelector('.services__btn-img');

    pullThings().then(links => {
        if (links.length >= 2){
            servicesBtnImg.src = `${links[0]}`;
            mainImg.src = `${links[1]}`;
        }
    });

    //* CARDS
    const servicesContainer = document.querySelector('.cards-container');
    
    callApi('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=work&include=2').then(works => { // Llamamos la funcion callApi y le hacemos un then que recibe un parametro works
        for (i = 0; i < 4; i++){ // Por cada work de works 
            createCard(servicesContainer, works[i]); // Llamamos a la funcion createElements con work como parametro
        } 

        //* SHOW MORE BUTTON
        const servicesBtn = document.querySelector('.services__btn');
        const cards = document.querySelectorAll('.card');

        servicesBtn.addEventListener('click', ()=>{
            cards.forEach(card => {
                card.style.display = 'flex';
            });

            servicesBtn.style.display = 'none';
        });
    });

    //* FOOTER
    createFooter(wrapper);
}

main();