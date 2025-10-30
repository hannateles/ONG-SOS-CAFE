// ===== Carrossel com fade e bolinhas =====
window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.banner-container .prev');
    const nextBtn = document.querySelector('.banner-container .next');
    const dots = document.querySelectorAll('.dot');
    let current = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                img.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    // Mostrar a primeira imagem ao carregar a página
    showImage(current);

    // Navegação por botões
    prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        showImage(current);
    });

    // Navegação por bolinhas
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            showImage(current);
        });
    });

    // Troca automática a cada 5 segundos
    setInterval(() => {
        current = (current + 1) % images.length;
        showImage(current);
    }, 5000);

    // ===== Botão CTA =====
    const ctaBtn = document.getElementById('ctaBtn');
    const ctaMsg = document.getElementById('ctaMsg');

    ctaBtn.addEventListener('click', () => {
        ctaMsg.classList.remove('hidden');
        ctaBtn.disabled = true;
        ctaBtn.textContent = "Salvando devs...";
    });
});

// =========================================================
// ===== galeria =====
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------
    // 1. FUNÇÃO DE CARROSSEL PARA MÚLTIPLAS INSTÂNCIAS
    // -----------------------------------------------------------------

    // Seleciona TODOS os containers de carrossel na página
    const allCarouselContainers = document.querySelectorAll('.carousel-container:not(.doacoes-logos)');

    // Itera sobre cada container encontrado e inicializa o carrossel individualmente
    allCarouselContainers.forEach(container => {

        const carousel = container.querySelector('.carousel');
        const images = carousel.querySelectorAll('img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');

        let index = 0;
        // Mantém 3 visíveis, mas o CSS controla isso.
        const visibleImages = 3;
        const maxIndex = images.length - visibleImages;
        let autoSlide;

        // Se houver menos imagens que o necessário para um carrossel, desabilita a navegação
        if (images.length <= visibleImages) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return; // Sai da função para este container
        }

        function updateCarousel() {
            // Usa 100% / visibleImages para calcular o deslocamento
            const offset = -index * (100 / visibleImages);
            carousel.style.transform = `translateX(${offset}%)`;

            if (prevBtn) prevBtn.style.display = index > 0 ? 'block' : 'none';
            if (nextBtn) nextBtn.style.display = index < maxIndex ? 'block' : 'none';
        }

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (index < maxIndex) {
                    index++;
                    updateCarousel();
                }
                stopAutoSlide(); // Para auto-slide ao clicar
                startAutoSlide(); // Reinicia auto-slide
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (index > 0) {
                    index--;
                    updateCarousel();
                }
                stopAutoSlide(); // Para auto-slide ao clicar
                startAutoSlide(); // Reinicia auto-slide
            });
        }

        // Auto-slide (adaptado para múltiplos carrosseis)
        function startAutoSlide() {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                index = (index >= maxIndex) ? 0 : index + 1;
                updateCarousel();
            }, 10000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        // Inicia o carrossel (ajuste inicial e auto-slide)
        updateCarousel();
        startAutoSlide();

        // Eventos de pausa no hover
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    });

    // -----------------------------------------------------------------
    // 2. CÓDIGO DO LIGHTBOX (GLOBAL)
    // -----------------------------------------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    // Seleciona TODAS as imagens que podem ser clicadas na página 
    const allGalleryImages = document.querySelectorAll('.carousel img');

    allGalleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('button.prev');
    const nextBtn = document.querySelector('button.next');

    const imagesCount = carousel.children.length;
    const visibleCount = 5; // Quantas imagens visíveis por vez
    let currentIndex = 0;

    const updateCarousel = () => {
        const itemWidth = carousel.querySelector('img').offsetWidth + 20; // img width + gap
        const maxIndex = imagesCount - visibleCount;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Desabilitar botão se estiver no limite
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    };

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    updateCarousel(); // inicializa estado dos botões e posição
});


// =========================================================
// LÓGICA DE CÓPIA DE PIX (GLOBAL)
// =========================================================

document.addEventListener('click', function(e) {
    const target = e.target.closest('.btn-copy-chave');
    if (target) {
        const chave = target.getAttribute('data-chave');
        if (chave) {
            // Copia para a área de transferência
            navigator.clipboard.writeText(chave)
                .then(() => {
                    const originalText = target.innerHTML;
                    target.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                    target.disabled = true;

                    setTimeout(() => {
                        target.innerHTML = originalText;
                        target.disabled = false;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Erro ao copiar a chave:', err);
                    alert('Falha ao copiar. Tente selecionar o texto manualmente.');
                });
        }
    }
});
// Carrossel de Logos - S.O.S Café
const carousel = document.querySelector('.doacoes-logos-galeria');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let offset = 0;
const slideWidth = 180; // Largura aproximada de cada imagem + gap
const totalSlides = carousel.children.length;

// Função que move o carrossel
function moveCarousel(direction) {
    const visibleSlides = Math.floor(carousel.parentElement.offsetWidth / slideWidth);
    const maxOffset = (totalSlides - visibleSlides) * slideWidth;

    if (direction === 'next') {
        offset += slideWidth;
        if (offset > maxOffset) offset = 0; // reinicia
    } else {
        offset -= slideWidth;
        if (offset < 0) offset = maxOffset; // volta ao final
    }

    carousel.style.transform = `translateX(-${offset}px)`;
}

// Botões de navegação
nextBtn.addEventListener('click', () => moveCarousel('next'));
prevBtn.addEventListener('click', () => moveCarousel('prev'));

// Movimento automático
setInterval(() => moveCarousel('next'), 3000);