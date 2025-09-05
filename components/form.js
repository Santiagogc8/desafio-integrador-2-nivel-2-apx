function createForm(el, color = '#13171C'){ // Creamos una funcion para crear el form. Esta recibe 2 parametros, un elemento para poder hacer el appendChild y un color (solo es para estilizar el color del svg y es opcional, siendo su valor por defecto #13171C)
    const form = document.createElement('form'); // Creamos un elemento form 
    const sendSvg = document.createElement('span'); // Y creamos un elemento span donde guardaremos el SVG del diseño

    //* Se opto por usar el codigo del svg directamente en el codigo para que sea mas facil de estilizar sin necesidad del CMS
    sendSvg.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_13646_53)">
        <path d="M25.5 2.5L14.5 13.5" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25.5 2.5L18.5 22.5L14.5 13.5L5.5 9.5L25.5 2.5Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <filter id="filter0_d_13646_53" x="-0.5" y="0.5" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13646_53"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13646_53" result="shape"/>
        </filter>
        </defs>
        </svg>
    `

    form.setAttribute('id', 'form'); // Le agregamos un atributo id al form con el string 'form'

    // Le damos un innerHTML al form y le pasamos el span con un outerHTML para que renderice el resultado
    form.innerHTML = `
    <div class="form__name">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" placeholder="Tu nombre"/>
    </div>
    <div class="form__email">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="tu@mail.com"/>
    </div>
    <div class="form__mensaje">
        <label for="mensaje">Mensaje</label>
        <textarea name="mensaje" id="mensaje"></textarea>
    </div>
    <button class="form__submit-btn" type="submit">Enviar ${sendSvg.outerHTML}</button>
    `;

    // Se opto por crear un solo componente form que sera reutilizable en mas de 1 pagina. Como el boton es algo que esta directamente en todos los form y no en otros componentes, se prefirio solo incluirlo en el componente form

    form.addEventListener('submit', (e)=>{ // Escuchamos el evento submit
        e.preventDefault(); // Y del evento hacemos el prevent default para que no recargue la pagina

        // Creamos un objeto FormData a partir del formulario
        const formData = new FormData(form);

        // Obtenemos los valores individuales de los campos
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('mensaje');

        // Guardamos en una variable el body
        const requestBody = {
            "to": "tu-email-de-estudiante@gmail.com",
            "message": `
                De: ${name}
                Email: ${email}
                Mensaje: ${message}
            `
        };

        // Guardamos en una variable la url
        const url = "https://apx.school/api/utils/email-to-student";

        // Hacemos un fetch de la url y le pasamos un objeto con el metodo post
        // Y convertimos en string el body
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(requestBody) // Convertir el objeto a JSON string
        })
        .then(response => {
            // Manejamos la respuesta del servidor
            if (response.ok) { // Si la respuesta es ok
                alert("¡Mensaje enviado con éxito!"); // Enviamos una alerta
                form.reset(); // Limpiamos el formulario
            } else { // Si no, mostramos una alerta negativa (la url parece estar caida entonces no deja enviar)
                alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
            }
        })
        .catch(error => { // Si hay un error
            console.error('Error:', error); // Mostramos por consola el error
            alert("Hubo un problema de conexión. Revisa tu red."); // Y enviamos una alerta
        });
    })

    el.appendChild(form); // Y al parametro recibido en la funcion, le agregamos el form
}