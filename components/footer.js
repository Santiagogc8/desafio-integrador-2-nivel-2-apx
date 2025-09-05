async function pullAndInject() { // Creamos una funcion asincrona, ya que es mas facil de comprender 
	try { // Intentamos

		// Esperar un fetch de la api y lo guardamos en una variable
		const entriesRes = await fetch('https://cdn.contentful.com/spaces/8l01vzrwfkni/environments/master/entries?access_token=WLtdqNz4IBCfSUIOoOSONxQxc2u3zkGtbt7Xn2HgDzg&content_type=desafoIntegrador2'); 
		const entriesJson = await entriesRes.json(); // A la respuesta del fetch la convertimos en json

		// Luego tenemos que llamar a la imagen
		const assetId = entriesJson.items[0].fields.iconSprite.sys.id; // Entramos a la posicion 0 de items y la ruta para identificar el id del asset y lo guardamos en una variable
		const asset = entriesJson.includes.Asset.find(a => a.sys.id === assetId); // Luego, hacemos un find que valida si el id del a.sys.id === assetId
		const spriteRes = await fetch(`https:${asset.fields.file.url}`); // Si eso es correcto, hacemos un fetch sobre la direccion (ya que es un sprite de iconos)
		const svg = await spriteRes.text(); // Luego, a ese sprite, lo convertimos en html y lo guardamos en la variable svg
		
		const iconWrapper = document.createElement('div'); // Obtenemos el documento y creamos un div
        iconWrapper.style.display = 'none'; // Le ponemos un display none para que no aparezca en pantalla
        iconWrapper.innerHTML = svg; // Le insertamos el codigo de svg
        document.body.prepend(iconWrapper); // Y lo ponemos por encima de todos los elementos

		const arrayTexts = entriesJson.items[0].fields.arrayTexts; // Luego guardamos un array de textos en una variable

		return arrayTexts; // Y retornamos el array de textos
	} catch (err) { // Si eso falla, tomamos el parametro
		console.error(err); // Y lanzamos un error con el parametro 
	}
}

async function createFooter(el){ // Luego, hacemos otra funcion asincrona, para que podamos obtener el array de textos de la funcion pullAndInject
	const footerTexts = await pullAndInject(); // Guardamos el await de pullAndInject en una variable

    const footer = document.createElement('footer'); // Creamos un elemento footer y lo guardamos en una variable

    footer.classList.add('footer'); // Le ponemos una clase 'footer'

	// Y le inyectamos el html. Le pasamos las posiciones de footerTexts en cada uno de los espacios y asignamos los svg correspondientes
    footer.innerHTML = `
        <img src="https://images.ctfassets.net/8l01vzrwfkni/28o4iC18wsvvmmOHMyJMGj/155f7469331a2e13c5a04f18841bdb30/logo.png" alt="logo-santiago-guzman" class="footer__logo">
				<ul class="footer__tabs">
					<li class="footer__tabs-li">
					<a href="./">
					<svg class="footer__tabs-li__icon">
					<use href="#icon-home"></use>
					</svg>
					${footerTexts[0]}</a>
					</li>
					<li class="footer__tabs-li">
					<a href="./servicios.html">
					<svg class="footer__tabs-li__icon">
					<use href="#icon-user"></use>
					</svg>
					${footerTexts[1]}</a>
					</li>
					<li class="footer__tabs-li">
					<a href="./contacto.html">
					<svg class="footer__tabs-li__icon">
					<use href="#icon-phone"></use>
					</svg>
					${footerTexts[2]}</a>
					</li>
				</ul>
				<ul class="footer__socials">
					<li class="footer__socials-li">
					<a href="https://www.linkedin.com/in/santiago-guzm%C3%A1n-326b3321a/" target="_blank">
					<svg class="footer__socials-li__icon">
					<use href="#icon-linkedin"></use>
					</svg>
					</a></li>
					<li class="footer__socials-li">
					<a href="https://github.com/Santiagogc8" target="_blank">
					<svg class="footer__socials-li__icon">
					<use href="#icon-github"></use>
					</svg>
					</a></li>
					<li class="footer__socials-li">
					<a href="#" target="_blank">
					<svg class="footer__socials-li__icon">
					<use href="#icon-twitter"></use>
					</svg>
					</a></li>
				</ul>
				<p class="footer__copyright">${footerTexts[3]} - <a href="https://santiagoguzman.dev" target="_blank">${footerTexts[4]}</a></p>
    `

    el.appendChild(footer); // Por ultimo, mandamos al final el footer
}