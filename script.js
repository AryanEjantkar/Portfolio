// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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
