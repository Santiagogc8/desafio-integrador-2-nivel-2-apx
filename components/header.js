function createHeader(el){ // Creamos la funcion createHeader, que recibe un elemento (el wrapper)
    const header = document.createElement('header'); // Creamos un elemento header y lo guardamos en una variable

    header.classList.add('header'); // A header, le agregamos la clase 'header'

    // Luego, agregamos el HTML al elemento header
    header.innerHTML = `
    <img src="https://images.ctfassets.net/8l01vzrwfkni/28o4iC18wsvvmmOHMyJMGj/155f7469331a2e13c5a04f18841bdb30/logo.png" alt="logo" class="header__logo">
    <ul class="header__ul">
        <li class="header__ul-li"><a href="./portfolio.html">Portfolio</a></li>
        <li class="header__ul-li"><a href="./servicios.html">Servicios</a></li>
        <li class="header__ul-li"><a href="./contacto.html">Contacto</a></li>
    </ul>

    <button class="header__burguer-menu">
        <div class="header__burguer-menu-line"></div>
        <div class="header__burguer-menu-line"></div>
        <div class="header__burguer-menu-line"></div>
    </button>

    <div class="header__burguer-menu--open">
        <button class="header__burguer-menu--open__close"></button>
        <ul class="header__burguer-menu--open__ul">
            <li class="header__burguer-menu--open__ul-li"><a href="./portfolio.html">Portfolio</a></li>
            <li class="header__burguer-menu--open__ul-li"><a href="./servicios.html">Servicios</a></li>
            <li class="header__burguer-menu--open__ul-li"><a href="./contacto.html">Contacto</a></li>
        </ul>
    </div>
    `
    
    el.prepend(header); // Usamos prepend (un metodo que nos permite poner al principio un elemento)

    const burguerBtn = header.querySelector('.header__burguer-menu'); // Obtenemos el boton de hamburguesa y lo guardamos en una variable
    const burguerMenuOpen = header.querySelector('.header__burguer-menu--open'); // Obtenemos el menu de hamburguesa abierto
    const burguerBtnClose = header.querySelector('.header__burguer-menu--open__close'); // Obtenemos tambien el boton de cerrar el menu de hamburguesa

    burguerBtn.addEventListener('click', (e)=> { // Al boton de hamburguesa le agregamos un escuchador de eventos
        burguerMenuOpen.classList.add('menu--visible'); // Le agregamos la clase "menu--visible" para mostrar el menu
        document.body.classList.add('no-scroll'); // Y agreamos una clase no-scroll (para que no pueda hacer scroll y se pierda)
    });

    burguerBtnClose.addEventListener('click', (e) =>{ // Luego, escuchamos un evento de click en el boton burguerBtnClose
        burguerMenuOpen.classList.remove('menu--visible'); // Donde removemos la clase "menu--visible"
        document.body.classList.remove('no-scroll'); // Y le quitamos la clase no-scroll
    });
}