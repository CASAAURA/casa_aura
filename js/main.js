document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono del menu (hamburguesa / equis)
            const isActive = navMenu.classList.contains('active');
            menuToggle.innerHTML = isActive 
                ? `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // --- Filtro Dinámico de Guía Local ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const guideCards = document.querySelectorAll('.guide-card');

    if (tabButtons.length > 0 && guideCards.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Quitar clase activa de todos los botones
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase activa al botón presionado
                button.classList.add('active');

                const targetCategory = button.getAttribute('data-target');

                guideCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.style.display = 'block';
                        // Re-activar animación de entrada
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Feedback del Formulario de Contacto ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                
                // Mostrar alerta de éxito
                let feedback = contactForm.querySelector('.form-feedback');
                if (!feedback) {
                    feedback = document.createElement('div');
                    feedback.className = 'form-feedback';
                    feedback.style.marginTop = '15px';
                    feedback.style.padding = '12px';
                    feedback.style.borderRadius = '4px';
                    feedback.style.backgroundColor = 'rgba(13, 77, 79, 0.1)';
                    feedback.style.color = 'var(--primary-color)';
                    feedback.style.fontSize = '0.9rem';
                    feedback.style.fontWeight = '500';
                    feedback.style.textAlign = 'center';
                    feedback.style.border = '1px solid var(--primary-color)';
                    contactForm.appendChild(feedback);
                }
                feedback.textContent = '¡Muchas gracias! Tu consulta ha sido enviada con éxito. Nos comunicaremos contigo a la brevedad.';
                feedback.style.display = 'block';

                contactForm.reset();

                // Restaurar botón después de unos segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // --- Ordenar Galería de forma Aleatoria ---
    const galleryContainer = document.querySelector('.section-gallery-page .gallery') || document.querySelector('.gallery');
    if (galleryContainer) {
        let items = Array.from(galleryContainer.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        items.forEach(item => galleryContainer.appendChild(item));
    }

    // --- Lightbox de Galería ---
    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item video');
    if (galleryItems.length > 0) {
        // Crear el lightbox en el DOM si no existe
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <a class="lightbox-prev">&#10094;</a>
                <img class="lightbox-content" id="lightbox-img" style="display:none;">
                <video class="lightbox-content" id="lightbox-video" controls style="display:none;"></video>
                <a class="lightbox-next">&#10095;</a>
                <div id="lightbox-caption"></div>
            `;
            document.body.appendChild(lightbox);
        }

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVid = document.getElementById('lightbox-video');
        const captionText = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        let imagesArray = Array.from(galleryItems);

        function openLightbox(index) {
            lightbox.classList.add('active');
            showImage(index);
            document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
        }

        function showImage(index) {
            if (index >= imagesArray.length) { currentIndex = 0; }
            else if (index < 0) { currentIndex = imagesArray.length - 1; }
            else { currentIndex = index; }

            const currentMedia = imagesArray[currentIndex];
            
            // Pausar video si estaba reproduciéndose
            lightboxVid.pause();
            
            if (currentMedia.tagName === 'VIDEO') {
                lightboxImg.style.display = 'none';
                lightboxVid.style.display = 'block';
                lightboxVid.src = currentMedia.querySelector('source') ? currentMedia.querySelector('source').src : currentMedia.src;
                lightboxVid.play();
                captionText.innerHTML = currentMedia.getAttribute('aria-label') || '';
            } else {
                lightboxVid.style.display = 'none';
                lightboxImg.style.display = 'block';
                lightboxImg.src = currentMedia.src;
                captionText.innerHTML = currentMedia.alt || '';
            }
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightboxVid.pause();
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }

        imagesArray.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        
        // Cerrar al hacer clic en el fondo
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        });
    }
});
