// Theme management
const themes = ['light', 'dark-blue', 'dark-green', 'dark-purple', 'light-minimal'];
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    updateThemeButtons();
}

function setInitialTheme() {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-blue' : 'light';
    setTheme(localStorage.getItem('theme') || systemTheme);
}

function updateThemeButtons() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        const btnTheme = btn.getAttribute('data-theme');
        btn.style.borderColor = currentTheme === btnTheme ? 'var(--primary)' : 'transparent';
        btn.style.transform = currentTheme === btnTheme ? 'scale(1.2)' : 'scale(1)';
    });
}

// Filter projects
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => project.style.opacity = '1', 10);
        } else {
            project.style.opacity = '0';
            setTimeout(() => project.style.display = 'none', 300);
        }
    });
}

// Update active filter button
function updateFilterButtons(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
}

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        btn.innerHTML = '<i class="fa fa-check"></i> Message Sent!';
        btn.style.background = 'var(--primary)';
        e.target.reset();
        setTimeout(() => {
            btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
            btn.disabled = false;
            btn.style.background = 'var(--primary)';
        }, 2000);
    }, 1500);
});

// Project filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterProjects(btn.dataset.filter);
        updateFilterButtons(btn);
    });
});

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, observerOptions);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            const tempImg = new Image();
            tempImg.src = src;
            tempImg.onload = () => {
                img.src = src;
                img.removeAttribute('data-src');
            };
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    lazyLoadImages();

    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // Observe elements for scroll animation
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });

    // Hide theme switcher after 5 seconds
    setTimeout(() => {
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (themeSwitcher) {
            themeSwitcher.style.opacity = '0';
            themeSwitcher.style.pointerEvents = 'none';
            setTimeout(() => themeSwitcher.remove(), 500);
        }
    }, 5000);
});

// Handle window resize for responsive updates
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (themeSwitcher) {
            themeSwitcher.style.opacity = '1';
            themeSwitcher.style.pointerEvents = 'auto';
        }
    }
});
