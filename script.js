// Reveal animation using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Subtle stagger
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Optional: Add floating effect to images with a delay
    document.querySelectorAll('.arch-wrapper').forEach(el => {
        el.classList.add('float');
    });

    // Nav: hamburger toggle (mobile) + dropdown accordion (touch/mobile) + ARIA state
    const navEl = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');

    // Nav-item trigger convention: use class="nav-parent" (href="#") only when the
    // trigger has no meaningful destination of its own (e.g. Resources — just a
    // dropdown label). If the trigger IS also a valid overview link (e.g. Products
    // -> #products, Platform -> #platform), point it at that real anchor/page
    // instead — don't wrap it in nav-parent, or clicking it does nothing useful.
    document.querySelectorAll('.nav-parent').forEach(a => {
        a.addEventListener('click', (e) => e.preventDefault());
    });

    if (navToggle && navEl) {
        navToggle.addEventListener('click', () => {
            const isOpen = navEl.classList.toggle('mobile-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            if (isOpen) {
                navEl.querySelector('.nav-links a')?.focus();
            } else {
                navToggle.focus();
                document.querySelectorAll('.nav-item.open').forEach(o => {
                    o.classList.remove('open');
                    o.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        const trigger = item.querySelector(':scope > a');
        if (!trigger) return;
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('click', (e) => {
            const inMobileMenu = navEl && navEl.classList.contains('mobile-open');
            const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
            if (!inMobileMenu && !isTouch) return;

            if (inMobileMenu) {
                // Full accordion: tap toggles this item open/closed
                e.preventDefault();
                const willOpen = !item.classList.contains('open');
                document.querySelectorAll('.nav-item.open').forEach(o => {
                    if (o !== item) {
                        o.classList.remove('open');
                        o.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.toggle('open', willOpen);
                trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
                return;
            }

            // Touch, no hamburger (960-1024px range): first tap reveals, second tap navigates
            if (!item.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.nav-item.open').forEach(o => {
                    if (o !== item) {
                        o.classList.remove('open');
                        o.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item.open').forEach(o => {
                o.classList.remove('open');
                o.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navToggle && navEl?.classList.contains('mobile-open')) {
            navToggle.click();
        }
    });
});
