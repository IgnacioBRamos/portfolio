const home = document.getElementById('Home');
const nav = document.querySelector('.web-nav');
const mobileNav = document.querySelector('.mobile_nav');
const closeMenu = document.querySelector('.close-icon');
const burguerMenu = document.querySelector('.burger_button');

const sunButton = document.querySelector('.button-sun-icon')

const langButtons = document.querySelector('[data-language]');
const textsToChange = document.querySelectorAll('[data-section]');

const resume = document.getElementById('resume')
const formButton = document.querySelector('.send-button');



window.addEventListener('scroll', () => {

  if (window.scrollY > 1) {
    home.classList.add('active');
  } else {
    home.classList.remove('active');
  }

})



function abrirMenu() {
  mobileNav.classList.add("open");
}
// cerrar
function cerrarMenu() {
  mobileNav.classList.remove("open");
}

burguerMenu.addEventListener('click', abrirMenu);

closeMenu.addEventListener('click', cerrarMenu);





langButtons.addEventListener('click', () => {
  fetch(`./language/${langButtons.dataset.language}.json`)
    .then(res => res.json())
    .then(data => {
      textsToChange.forEach((el) => {
        const section = el.dataset.section;
        const value = el.dataset.value;

        if(value.includes('input')){
          el.setAttribute('placeholder',data[section][value])
        }else{
          el.innerHTML = data[section][value];
        }

      })
    });
  if (langButtons.dataset.language == 'en') {
    langButtons.setAttribute('data-language', 'es');
    resume.href="/resume/2026-resume-IgnacioRamos.pdf";

    
  } else {
    langButtons.setAttribute('data-language', 'en');
    resume.href="/resume/Cv-IgnacioRamos-2026.pdf";

  }

  

})


sunButton.addEventListener('click', () => {
  document.documentElement.classList.toggle("light");
})




const form = document.getElementById("formulario");

form.addEventListener("submit", handlesubmit);
async function handlesubmit(event) {
  event.preventDefault();
  let email = document.getElementById("email").value;


  let regexEmail = /^[\w.-]+@[\w]+\.\w{2,}$/;
  if (!regexEmail.test(email)) {
    alert("Por favor, ingrese un mail válido");
    return false;
  }

  const originalButtonContent = formButton.innerHTML;
  formButton.disabled = true;
  formButton.innerHTML = "Enviando...";
  const formData = new FormData(this);

  try {

    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
      headers: {
        "accept": "application/json"
      }
    });
    if (response.ok) {
      this.reset();
      alert("Gracias por contactarme, te escribiré pronto");
    } else {

      alert("Hubo un problema al enviar el formulario. Intenta de nuevo.");
    }
  } catch (error) {
    console.error("Error en la solicitud HTTP:", error);
    alert("Hubo un error de red. Revisa tu conexión a internet y vuelve a intentar.");
  } finally {

    formButton.disabled = false;
    formButton.innerHTML = originalButtonContent;
  }
}











const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  
});