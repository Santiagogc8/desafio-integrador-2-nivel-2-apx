function main(){ // Iniciamos la funcion main
    const wrapper = document.querySelector('.wrapper'); // Que obtiene el elemento .wrapper y lo guarda en una variable
    createHeader(wrapper); // Llamamos a la funcion createHeader y le pasamos wrapper como parametro

    const servicesContainer = document.querySelector('.cards-container');
    
    callApi('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=czXoFyjisb7wysKAWFnzFBFVg38pWqv2QgyK0RczVvc&content_type=work&include=2').then(works => { // Llamamos la funcion callApi y le hacemos un then que recibe un parametro works
        for (i = 4; works.length; i++){ // Por cada work de works 
            createCard(servicesContainer, works[i]); // Llamamos a la funcion createElements con work como parametro
        } 
    });

    const formContainer = document.querySelector('.form-container'); // Obtenemos el formContainer y lo guardamos en una variable
    createForm(formContainer); // Creamos el form con el formContainer como parametro

    createFooter(wrapper);
}

main();