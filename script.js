// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight active navigation item on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Animate numbers in hero stats
function animateNumbers() {
    const stats = document.querySelectorAll('.stat .number');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate stats when hero section comes into view
            if (entry.target.id === 'hero') {
                setTimeout(animateNumbers, 500);
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
    observer.observe(section);
});

// Add animation classes to example cards
const exampleCards = document.querySelectorAll('.example-card');
exampleCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Toggle solution visibility
document.querySelectorAll('.example-card').forEach(card => {
    const solution = card.querySelector('.solution');
    if (solution) {
        solution.style.display = 'none';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Показать решение';
        toggleButton.className = 'toggle-solution';
        toggleButton.style.cssText = `
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 1rem;
            font-size: 0.875rem;
            transition: background 0.3s;
        `;

        toggleButton.addEventListener('mouseenter', () => {
            toggleButton.style.background = '#1d4ed8';
        });

        toggleButton.addEventListener('mouseleave', () => {
            toggleButton.style.background = '#2563eb';
        });

        toggleButton.addEventListener('click', () => {
            if (solution.style.display === 'none') {
                solution.style.display = 'block';
                toggleButton.textContent = 'Скрыть решение';
            } else {
                solution.style.display = 'none';
                toggleButton.textContent = 'Показать решение';
            }
        });

        card.insertBefore(toggleButton, solution);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #2563eb;
        font-weight: 600;
    }

    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .example-card {
        opacity: 0;
        transform: translateY(20px);
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .toggle-solution:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
    }
`;
document.head.appendChild(style);