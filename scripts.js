let isScrolling;
const whatsappButton = document.getElementById('whatsapp-button');
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);

    // Ocultar botões enquanto rola
    whatsappButton.classList.remove('visible');
    backToTopButton.classList.remove('visible');

    // Mostrar botões após parar de rolar
    isScrolling = setTimeout(function() {
        whatsappButton.classList.add('visible');
        backToTopButton.classList.add('visible');
    }, 100);
});

// Voltar ao topo suavemente
backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efeito de cursor personalizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});