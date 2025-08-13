// ===== CONTROLE DE SCROLL PARA BOTÕES FLUTUANTES =====

// Variável para controlar o timeout do scroll
let isScrolling;

// Seleção dos elementos dos botões flutuantes
const whatsappButton = document.getElementById('whatsapp-button');
const backToTopButton = document.getElementById('back-to-top');

// Event listener para detectar o scroll da página
window.addEventListener('scroll', function() {
    // Limpa o timeout anterior se existir
    window.clearTimeout(isScrolling);
    
    // Oculta os botões enquanto o usuário está rolando
    whatsappButton.classList.remove('visible');
    backToTopButton.classList.remove('visible');
    
    // Define um novo timeout para mostrar os botões após parar de rolar
    // Delay de 100ms após parar de rolar
    isScrolling = setTimeout(function() {
        whatsappButton.classList.add('visible');
        backToTopButton.classList.add('visible');
    }, 100);
});

// ===== FUNCIONALIDADE DO BOTÃO "VOLTAR AO TOPO" =====

// Event listener para o botão de voltar ao topo
backToTopButton.addEventListener('click', function(e) {
    // Previne o comportamento padrão do link
    e.preventDefault();
    
    // Realiza o scroll suave até o topo da página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== CURSOR PERSONALIZADO =====

// Seleciona o elemento do cursor personalizado
const cursor = document.querySelector('.cursor');

// Event listener para acompanhar o movimento do mouse
document.addEventListener('mousemove', (e) => {
    // Atualiza a posição do cursor personalizado baseado na posição do mouse
    // pageX e pageY incluem o scroll da página
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// ===== NAVEGAÇÃO SUAVE ENTRE SEÇÕES =====

// Seleciona todos os links de navegação do header
const navLinks = document.querySelectorAll('header ul li a');

// Adiciona navegação suave para cada link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Verifica se o link aponta para uma seção da página (começa com #)
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            
            // Encontra o elemento alvo
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Calcula a posição considerando a altura do header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Realiza o scroll suave até a seção
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== ANIMAÇÕES DE ENTRADA =====

// Função para verificar se um elemento está visível na tela
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para adicionar animações aos elementos quando entram na tela
function handleScrollAnimations() {
    // Seleciona elementos que podem receber animações
    const animatedElements = document.querySelectorAll('.card-projetos, .pilar, .tag-habilidades');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializa os elementos com opacity 0 para a animação
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card-projetos, .pilar');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Executa a função imediatamente para elementos já visíveis
    handleScrollAnimations();
});

// Event listener para animações durante o scroll
window.addEventListener('scroll', handleScrollAnimations);

// ===== MELHORIAS DE ACESSIBILIDADE =====

// Adiciona suporte a navegação por teclado
document.addEventListener('keydown', function(e) {
    // Tecla Escape para fechar modais ou voltar ao topo
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Ctrl + Home para voltar ao início
    if (e.ctrlKey && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ===== OTIMIZAÇÕES DE PERFORMANCE =====

// Debounce function para otimizar eventos que disparam frequentemente
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce ao resize da janela para otimizar performance
const debouncedResize = debounce(() => {
    // Recalcula animações após resize
    handleScrollAnimations();
}, 250);

window.addEventListener('resize', debouncedResize);