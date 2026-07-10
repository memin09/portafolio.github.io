 // Lógica del Menú Hamburguesa (Abrir / Cerrar)
    const menuBtn = document.getElementById('menu-btn');
    const menuNav = document.getElementById('menu-nav');

    menuBtn.addEventListener('click', () => {
        menuNav.classList.toggle('open');
        const icon = menuBtn.querySelector('i');
        if (menuNav.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Cerrar el menú automáticamente al hacer click en cualquier opción (Mobile)
    const navLinks = document.querySelectorAll('#menu-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNav.classList.contains('open')) {
                menuNav.classList.remove('open');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // LÓGICA DE DETECCIÓN Y CONTROL DE CARRUSELES EN PROYECTOS
    const previews = document.querySelectorAll('.project-preview');
    
    previews.forEach(preview => {
        const track = preview.querySelector('.carousel-track');
        const slides = preview.querySelectorAll('.carousel-slide');
        const btnPrev = preview.querySelector('.carousel-btn.prev');
        const btnNext = preview.querySelector('.carousel-btn.next');
        const dotsContainer = preview.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        const maxIndex = slides.length - 1;

        if (slides.length <= 1) {
            if(btnPrev) btnPrev.style.display = 'none';
            if(btnNext) btnNext.style.display = 'none';
            return;
        }

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
            updateCarousel();
        });

        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        });
    });

    // Control de iluminación de proyectos al hacer clic
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.p-btn') || e.target.closest('.carousel-btn')) return;
            
            if (card.classList.contains('active-glow')) {
                card.classList.remove('active-glow');
            } else {
                projectCards.forEach(c => c.classList.remove('active-glow'));
                card.classList.add('active-glow');
            }
        });
    });

    // CORREGIDO PARA MÓVILES: Copiar Email con soporte extendido para pantallas táctiles
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Asegura capturar el elemento correcto en móviles usando currentTarget
            const buttonEl = e.currentTarget; 
            const emailAddress = 'benjamincastaneda783@gmail.com';
            
            // Función interna para renderizar la respuesta visual exitosa
            const showSuccessUI = () => {
                const originalContent = buttonEl.innerHTML;
                
                // Muta el estado visual a verde de forma forzada
                buttonEl.classList.add('copy-success');
                buttonEl.innerHTML = '<i class="fa-solid fa-check"></i> Email copiado con éxito';
                
                // Dispara el mensaje Toast flotante en la pantalla inferior
                let toast = document.getElementById('copy-toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'copy-toast';
                    toast.className = 'toast-notification';
                    document.body.appendChild(toast);
                }
                toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Email copiado de manera correcta';
                
                setTimeout(() => toast.classList.add('show'), 50);
                
                // Revierte el estado tras 3 segundos
                setTimeout(() => {
                    buttonEl.classList.remove('copy-success');
                    buttonEl.innerHTML = originalContent;
                    toast.classList.remove('show');
                }, 3000);
            };

            // Intento con la API nativa moderna de portapapeles
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailAddress)
                    .then(showSuccessUI)
                    .catch(err => fallbackCopy(emailAddress, showSuccessUI));
            } else {
                // Fallback clásico para navegadores web embebidos antiguos o móviles sin SSL activo
                fallbackCopy(emailAddress, showSuccessUI);
            }
        });
    }

    // Fallback de copiado usando inputs invisibles (Indispensable para compatibilidad móvil total)
    function fallbackCopy(text, successCallback) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed'; // Evita scroll visual
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            successCallback();
        } catch (err) {
            console.error('No se pudo copiar el texto', err);
        }
        document.body.removeChild(textArea);
    }

    // Resaltar enlace del menú según la sección activa en pantalla
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 160) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });