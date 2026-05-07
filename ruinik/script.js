// Parallax main section
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const mainSection = document.querySelector('.main');
    if (!mainSection) return;
    const maxScroll = mainSection.offsetHeight;
    const progress = Math.min(scrollY / maxScroll, 1);

    
    const clouds = document.querySelector('.layer-clouds');
    if (clouds) {
        const scale = 1 - progress * 0.35;
        clouds.style.transform = `scale(${scale})`;
        clouds.style.transformOrigin = 'top center';
        clouds.style.opacity = 1 - progress * 0.8;
    }

    const char = document.querySelector('.layer-char');
    if (char) {
        const slideX = progress * 120; 
        char.style.transform = `translateX(${slideX}%)`;
        char.style.opacity = 1 - progress * 1.5; 
    }

    const grass = document.querySelector('.layer-grass');
    if (grass) {
        const scale = 1 - progress * 0.6;
        grass.style.transform = `scaleY(${scale})`;
        grass.style.transformOrigin = 'bottom center';
    }

    const bg = document.querySelector('.layer-bg');
    if (bg) {
        const scale = 1 - progress * 0.6;
        bg.style.transform = `scaleY(${scale})`;
        bg.style.transformOrigin = 'bottom center';
    }

    // Parallax: logo + trailer button fade out and slide up
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const fadeProgress = Math.min(scrollY / (mainSection.offsetHeight * 0.5), 1);
        const translateY = fadeProgress * -60;
        const opacity = 1 - fadeProgress * 1.2;
        mainContent.style.transform = `translateY(${translateY}px)`;
        mainContent.style.opacity = Math.max(opacity, 0);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const overlay    = document.getElementById('navOverlay');
    const hamburger  = document.getElementById('hamburger');
    const menu       = document.getElementById('menu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const menuItems  = menu.querySelectorAll('ul li');

    function animateItemsIn() {
        menuItems.forEach(function (li, i) {
            li.style.transition = 'none';
            li.style.opacity    = '0';
            li.style.transform  = 'translateX(30px)';

            void li.offsetWidth;

            li.style.transition = 'opacity 0.3s ease ' + (0.07 + i * 0.07) + 's, '
                                 + 'transform 0.3s ease ' + (0.07 + i * 0.07) + 's';
            li.style.opacity    = '1';
            li.style.transform  = 'translateX(0)';
        });
    }

    function animateItemsOut() {
        if (window.innerWidth > 640) return;
        menuItems.forEach(function (li) {
            li.style.transition = 'none';
            li.style.opacity    = '0';
            li.style.transform  = 'translateX(30px)';
        });
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth > 640) {
            menuItems.forEach(function (li) {
                li.style.transition = '';
                li.style.opacity    = '';
                li.style.transform  = '';
            });
            menu.classList.remove('open');
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    function openMenu() {
        menu.classList.add('open');
        mobileOverlay.classList.add('active');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        animateItemsIn();
    }

    function closeMenu() {
        menu.classList.remove('open');
        mobileOverlay.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        animateItemsOut();
    }

    hamburger.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileOverlay.addEventListener('click', closeMenu);

    var sections      = document.querySelectorAll('[id]');
    var navLinks      = document.querySelectorAll('.menu ul li a');
    var scrollLock    = false;
    var activeHref    = null;

    function setActiveLink(href) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        navLinks.forEach(function (l) {
            if (l.getAttribute('href') === href) {
                l.classList.add('active');
            }
        });
    }

    var sectionObserver = new IntersectionObserver(function (entries) {
        if (scrollLock) return;
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                activeHref = '#' + entry.target.id;
                setActiveLink(activeHref);
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    document.querySelectorAll('.menu ul li a, .logo a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            var target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            activeHref = href;
            setActiveLink(activeHref);
            scrollLock = true;

            closeMenu();
            overlay.classList.add('active');

            setTimeout(function () {
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(function () {
                    overlay.classList.remove('active');
                    scrollLock = false;
                    setActiveLink(activeHref);
                }, 800);
            }, 250);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
        }
    });

});
