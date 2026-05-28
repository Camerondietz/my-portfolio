// ===== Sticky nav: add .scrolled class once page leaves the top =====
const nav = document.getElementById('siteNav');
if (nav) {
    const onScroll = () => {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ===== Project cards: click title to expand, hover to play preview video =====
document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('.project-title');
    const detail = card.querySelector('.project-detail');
    if (title && detail) {
        title.addEventListener('click', () => {
            const isOpen = detail.classList.toggle('open');
            card.classList.toggle('open', isOpen);
        });
    }

    const video = card.querySelector('.project-media video');
    if (video) {
        // Lazy-attach video source on first hover so the page doesn't fetch every clip upfront
        const ensureSource = () => {
            const lazy = video.getAttribute('data-src');
            if (lazy && !video.querySelector('source')) {
                const s = document.createElement('source');
                s.src = lazy;
                s.type = 'video/mp4';
                video.appendChild(s);
                video.load();
            }
        };
        const hasAnySource = () => video.querySelector('source') || video.getAttribute('data-src');

        card.addEventListener('mouseenter', () => {
            if (!hasAnySource()) return;
            ensureSource();
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
            if (!hasAnySource()) return;
            video.pause();
            try { video.currentTime = 0; } catch (e) {}
        });
    }
});

// ===== Reveal-on-scroll for cards =====
const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 }) : null;

if (io) {
    document.querySelectorAll('.project-card, .skill, .exp-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${i * 30}ms, transform 0.5s ease ${i * 30}ms, border-color 0.25s ease, background 0.25s ease, box-shadow 0.3s ease`;
        io.observe(el);
    });
}
