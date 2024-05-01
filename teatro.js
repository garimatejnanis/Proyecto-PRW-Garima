//Para crear el slider
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    let slides = document.querySelectorAll('.slides-container img');
    let slideCount = slides.length;
    //cada 7 seg cambia
    let intervalTime = 7000; 

    function nextSlide() {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slideCount;
        slides[currentSlide].style.display = 'block';
    }

    setInterval(nextSlide, intervalTime);
});

//menu para tablet y movil
document.addEventListener('DOMContentLoaded', function() {
    let menuToggle = document.querySelector('.menu-toggle');
    let menuList = document.getElementById('menu-list');
    
    menuToggle.addEventListener('click', function() {
        menuList.classList.toggle('show-menu');
    });

    let menuLines = document.querySelectorAll('.menu-toggle .line');
    menuLines.forEach(function(line) {
        line.addEventListener('click', function() {
            menuList.classList.toggle('show-menu');
        });
    });
});

//para mostrar pagina de inicio cuando pinche en el enlace y logo
function cargarContenidoInicio() {
    document.getElementById("tituloCuerpo").style.display = "block";
    document.getElementById("ocultarSlider").style.display = "block";
    document.getElementById("tituloServicio").style.display = "block";
    document.getElementById("ocultarImgServicio").style.display = "block";
    document.getElementById("tipoServicio").style.display = "block";
    document.getElementById("ocultarImgDescanso").style.display = "block";

    document.getElementById("login").style.display = "none";
    document.getElementById("cuenta").style.display = "none";
    document.getElementById("tituloListaComediante").style.display = "none";
    document.getElementById("listaComediante").style.display = "none";
    document.getElementById("tituloCarritoError").style.display = "none";
    document.getElementById("tituloFormulario").style.display = "none";
    document.getElementById("formularioEntrada").style.display = "none";
    document.getElementById("tituloCarritoMensaje").style.display = "none";

    document.getElementById("tituloCarrito").style.display = "none";
    document.getElementById("tablaDatos").style.display = "none";  
    document.getElementById("botonComprar").style.display = "none";
    
}



