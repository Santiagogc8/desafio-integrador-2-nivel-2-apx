function main(){
    const wrapper = document.querySelector('.wrapper');

    const formContainer = document.querySelector('.form-container');
    createForm(formContainer); // Creamos el form con el formContainer como parametro

    createFooter(wrapper);

    createHeader(wrapper);
}

main();