// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Number counter animation for statistics
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    let animated = false;
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = 25;
                    const inc = Math.max(1, Math.ceil(target / speed));
                    const updateCount = () => {
                        count += inc;
                        if (count < target) {
                            counter.innerText = count;
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSec = document.querySelector('.stats-overview');
    if (statsSec) {
        countObserver.observe(statsSec);
    }
}

// Terminal-style typing effect for the code snippet
const codeElement = document.querySelector('.code-snippet code');
if (codeElement) {
    const text = codeElement.innerText;
    codeElement.innerText = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            codeElement.innerText += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    // Start typing when the page loads
    window.addEventListener('load', type);
}

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Add these styles dynamically for the reveal effect
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
