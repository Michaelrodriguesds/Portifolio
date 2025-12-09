// ===== CONTROLE DE SCROLL PARA BOTÕES FLUTUANTES =====
let isScrolling;

// Seleção dos elementos dos botões flutuantes
const whatsappButton = document.querySelector('.whatsapp-float');
const backToTopButton = document.getElementById('back-to-top');

// Event listener para detectar o scroll da página
window.addEventListener('scroll', function() {
    // Limpa o timeout anterior se existir
    window.clearTimeout(isScrolling);
    
    // Oculta apenas o botão do WhatsApp enquanto o usuário está rolando
    whatsappButton.style.opacity = '0';
    
    // Define um novo timeout para mostrar os botões após parar de rolar
    isScrolling = setTimeout(function() {
        whatsappButton.style.opacity = '1';
        
        // Mostra o botão "voltar ao topo" apenas se o scroll for maior que 300px
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100);
});

// ===== FUNCIONALIDADE DO BOTÃO "VOLTAR AO TOPO" =====
backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMAÇÃO DE TREMIDA NO WHATSAPP =====
setInterval(() => {
    whatsappButton.classList.add('whatsapp-shake');
    setTimeout(() => {
        whatsappButton.classList.remove('whatsapp-shake');
    }, 400);
}, 6000);

// ===== NAVEGAÇÃO SUAVE ENTRE SEÇÕES =====
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== CARREGAMENTO DE IMAGENS COM FALLBACK =====
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.img-projeto[src*="githubusercontent.com"]');
    
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'img/placeholder-php.jpg';
        };
    });
});