// SearchMaster Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden bg-vscode-light border-b border-vscode absolute top-full left-0 right-0 hidden';
    mobileMenu.innerHTML = `
        <div class="px-4 py-2 space-y-2">
            <a href="#overview" class="block py-2 text-vscode-muted hover:text-vscode-accent-light">Overview</a>
            <a href="#how-it-works" class="block py-2 text-vscode-muted hover:text-vscode-accent-light">How It Works</a>
            <a href="#installation" class="block py-2 text-vscode-muted hover:text-vscode-accent-light">Installation</a>
            <a href="#features" class="block py-2 text-vscode-muted hover:text-vscode-accent-light">Features</a>
            <a href="#download" class="block py-2 bg-blue-600 text-white px-4 rounded-lg text-center">Download</a>
        </div>
    `;
    
    // Insert mobile menu after nav
    const nav = document.querySelector('nav');
    nav.style.position = 'relative';
    nav.appendChild(mobileMenu);
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on links
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    // Scroll spy for navigation highlighting
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id], header[id]');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-400');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Account for fixed navigation
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Copy to clipboard functionality for code snippets
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-vscode-light hover:bg-vscode border border-vscode rounded px-2 py-1 text-xs transition-colors';
        button.innerHTML = 'Copy';
        button.style.display = 'none';
        
        const wrapper = block.parentElement;
        wrapper.style.position = 'relative';
        wrapper.appendChild(button);
        
        wrapper.addEventListener('mouseenter', () => {
            button.style.display = 'block';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            button.style.display = 'none';
        });
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.innerHTML = 'Copied!';
                button.classList.add('text-green-400');
                setTimeout(() => {
                    button.innerHTML = 'Copy';
                    button.classList.remove('text-green-400');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('transition-opacity', 'duration-300');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add loading animation to download buttons
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
            `;
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 3000);
        });
    });
    
    // Simple animation on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    // Add animation classes to elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .hover-grow {
            transition: transform 0.2s ease;
        }
        
        .hover-grow:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
    
    // Add animation observers to main sections
    document.querySelectorAll('section > div > div > div, .grid > div').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.bg-vscode-light, .border-vscode').forEach(card => {
        card.classList.add('hover-grow');
    });
    
    console.log('SearchMaster website loaded! 🚀');
});
