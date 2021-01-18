const card = document.querySelector('.js-card');
const form = document.querySelector('.js-form');
const btnReset = document.querySelector('.js-reset');

const palettes = document.querySelectorAll('.js-palettes > li');
/* Almacena la clase de la paleta seleccionada y lo pasa a 'dataStored'. */
let selectedPalette;

const inputName = document.querySelector('.js-name');
const inputJob = document.querySelector('.js-job');
const inputAddress = document.querySelector('.js-address');
const inputCity = document.querySelector('.js-city');
const inputPhone = document.querySelector('.js-phone');
const inputEmail = document.querySelector('.js-email');

const cardFrontName = document.querySelector('.card-front .js-card-name');
const cardBackName = document.querySelector('.card-back .js-card-name');
const cardFrontJob = document.querySelector('.card-front .js-card-job');
const cardBackJob = document.querySelector('.card-back .js-card-job');
const cardAddress = document.querySelector('.js-card-address');
const cardCity = document.querySelector('.js-card-city');
const cardPhone = document.querySelector('.js-card-phone');
const cardEmail = document.querySelector('.js-card-email');

const defaultCardData = {
  palette: 'palette-a',
  name: 'Nombre Apellidos',
  job: 'Ocupación',
  address: 'Dirección',
  city: 'Ciudad',
  phone: '000 000 000',
  email: 'hola@email.com',
};

/*
* choosePalette() --> Aplica estilos al <li> seleccionado y los colores a la
* de la paletta seleccionada a la tarjeta
*/

const handleClick = (event) => {
  selectedPalette = event.currentTarget.className;
  choosePalette(selectedPalette);
};

const choosePalette = (paletteClass) => {
  card.className = `card js-card ${paletteClass}`;

  /*
  * Añadir primero la clase de la paleta seleccionada a la tarjeta antes
  * que añadir la clase 'selected' si no "selectedPaletteName" devolverá
  * la paleta y 'selected'
  */

  palettes.forEach((palette) => palette.classList.remove('selected'));
  const paletteTarget = document.querySelector(`.${paletteClass}`);
  paletteTarget.classList.add('selected');
};

/*
* fillCard() --> Muestra los datos introducidos en la tarjeta
* -----------------------------------------------------------
* 1) Al cargarse la página el contenido mostrado en la tarjeta es el texto
*    del archivo HTML.
* 2) Al introducir datos en los campos de texto se muestran estos, si no
*    los establecidos por defecto en el objeto 'defaultCardData'
*/

const fillCard = (event) => {
  const userName = inputName.value;
  const job = inputJob.value;
  const address = inputAddress.value;
  const city = inputCity.value;
  const phone = inputPhone.value;
  const email = inputEmail.value;

  if (event.target === inputName) {
    cardFrontName.innerHTML = userName !== '' ? userName : defaultCardData.name;
    cardBackName.innerHTML = userName !== '' ? userName : defaultCardData.name;
  }

  if (event.target === inputJob) {
    cardFrontJob.innerHTML = job !== '' ? job : defaultCardData.job;
    cardBackJob.innerHTML = job !== '' ? job : defaultCardData.job;
  }
  if (event.target === inputAddress) {
    cardAddress.innerHTML = address !== '' ? address : defaultCardData.job;
  }
  if (event.target === inputCity) {
    cardCity.innerHTML = city !== '' ? city : defaultCardData.address;
  }
  if (event.target === inputPhone) {
    cardPhone.innerHTML = phone !== '' ? phone : defaultCardData.phone;
  }
  if (event.target === inputEmail) {
    cardEmail.innerHTML = email !== '' ? email : defaultCardData.email;
  }

  storeData();
};

/*
* getDefaultData() --> Muestra los datos del obj 'defaultCardData' en la tarjeta
* ------------------------------------------------------------------------------
* Muestra la información por defecto en la tarjeta. Si no, al empezar
* a rellenar un campo del formulario se que borran automaticamente la
* información del index.html que muestra la tarjeta.
*/

const getDefaultData = () => {
  const {
    palette, name, job, address, city, phone, email,
  } = defaultCardData;

  cardFrontName.innerHTML = name;
  cardBackName.innerHTML = name;
  cardFrontJob.innerHTML = job;
  cardBackJob.innerHTML = job;
  cardAddress.innerHTML = address;
  cardCity.innerHTML = city;
  cardPhone.innerHTML = phone;
  cardEmail.innerHTML = email;

  localStorage.removeItem('userData');
  choosePalette(palette);
};

/*
* storeData() --> Guarda los datos en localStorage
* ------------------------------------------------------------------------------
* Crea un objeto con los datos introducidos y la paleta seleccionada,
* convierte estos datos en una cadena y los guarda een localStorage para
* que puedan ser recuperados si se cierra la app y se vuelve a ella.
*/

const storeData = () => {
  const dataStored = {
    palette: selectedPalette,
    name: inputName.value,
    job: inputJob.value,
    address: inputAddress.value,
    city: inputCity.value,
    phone: inputPhone.value,
    email: inputEmail.value,
  };

  localStorage.setItem('userData', JSON.stringify(dataStored));
};

/*
* getStoredData() --> recupera los datos de localStorage
* ------------------------------------------------------
* Si hay datos guardados en localStorage los muestra, tanto en los campos
* del formulario como en la tarjeta. Si algún dato no se ha guardado
* muestra en su lugar los datos por defecto del objeto 'defaultCardData'.
*/

const getStoredData = () => {
  const stringUserData = localStorage.getItem('userData');
  const userData = JSON.parse(stringUserData);

  if (userData) {
    const {
      palette, name, job, address, city, phone, email,
    } = userData;

    inputName.value = name;
    inputJob.value = job;
    inputAddress.value = address;
    inputCity.value = city;
    inputPhone.value = phone;
    inputEmail.value = email;

    cardFrontName.innerHTML = inputName.value || defaultCardData.name;
    cardBackName.innerHTML = inputName.value || defaultCardData.name;
    cardFrontJob.innerHTML = inputJob.value || defaultCardData.job;
    cardBackJob.innerHTML = inputJob.value || defaultCardData.job;
    cardAddress.innerHTML = inputAddress.value || defaultCardData.address;
    cardCity.innerHTML = inputCity.value || defaultCardData.city;
    cardPhone.innerHTML = inputPhone.value || defaultCardData.phone;
    cardEmail.innerHTML = inputEmail.value || defaultCardData.email;

    choosePalette(palette);
  }
};

getStoredData();

palettes.forEach((palette) => palette.addEventListener('click', handleClick));
form.addEventListener('keyup', fillCard);
btnReset.addEventListener('click', getDefaultData);
