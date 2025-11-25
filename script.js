// Pet data with working images
const pets = [
    {
        name: "Buddy",
        breed: "Golden Retriever", 
        age: "2 years",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        description: "Friendly and energetic golden retriever who loves to play fetch."
    },
    {
        name: "Luna",
        breed: "Siamese Cat",
        age: "1.5 years",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop", 
        description: "Graceful and affectionate siamese cat who enjoys cuddles."
    },
    {
        name: "Max",
        breed: "Beagle Mix",
        age: "3 years",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
        description: "Gentle beagle mix who gets along well with children and other pets."
    },
    {
        name: "Bella",
        breed: "Persian Cat",
        age: "2 years",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
        description: "Fluffy persian cat who loves quiet environments and gentle petting."
    },
    {
        name: "Charlie",
        breed: "Labrador Mix",
        age: "4 months", 
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop",
        description: "Playful puppy full of energy and curiosity, great for active families."
    },
    {
        name: "Daisy",
        breed: "Domestic Shorthair",
        age: "1 year",
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
        description: "Young and playful cat who enjoys chasing toys and exploring."
    }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    setupEventListeners();
    setupCursorTrail();
});

// Load pets into the grid
function loadPets() {
    const petsGrid = document.getElementById('petsGrid');
    
    if (!petsGrid) {
        console.error('Pets grid element not found');
        return;
    }
    
    // Clear any existing content
    petsGrid.innerHTML = '';
    
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name} the ${pet.breed}" class="pet-image" loading="lazy">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p>${pet.description}</p>
                <button class="adopt-btn" onclick="adoptPet('${pet.name}')">
                    Adopt ${pet.name}
                </button>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

// Cursor trail effect
function setupCursorTrail() {
    document.addEventListener('mousemove', (e) => {
        const trail = document.querySelector('.cursor-trail');
        if (trail) {
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            trail.style.opacity = '0.3';
            
            setTimeout(() => {
                trail.style.opacity = '0';
            }, 100);
        }
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Adopt pet function
function adoptPet(petName) {
    const messages = [
        `Thank you for your interest in adopting ${petName}! 🐾\nPlease visit our shelter to meet this lovely friend.`,
        `Great choice! ${petName} would be so happy to meet you! ❤️\nCall us to schedule a visit.`,
        `Yay! ${petName} is waiting for a loving home like yours! 🎉\nVisit us to start the adoption process.`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Handle form submission
function handleFormSubmission(form) {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent! 🎉';
        button.style.background = '#4ECDC4';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            form.reset();
            alert('Thanks for your message! We\'ll get back to you within 24 hours.');
        }, 2000);
    }, 1500);
}

// Add random paw prints on click for fun
document.addEventListener('click', function(e) {
    if (Math.random() > 0.7) { // 30% chance
        createPawPrint(e.pageX, e.pageY);
    }
});

function createPawPrint(x, y) {
    const paw = document.createElement('div');
    paw.innerHTML = '🐾';
    paw.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.7;
        transform: scale(0) rotate(0deg);
        transition: all 1s ease;
    `;
    
    document.body.appendChild(paw);
    
    setTimeout(() => {
        paw.style.transform = 'scale(1) rotate(360deg)';
    }, 10);
    
    setTimeout(() => {
        paw.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(paw)) {
                document.body.removeChild(paw);
            }
        }, 1000);
    }, 1000);
}

// Simple parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Fallback for broken images
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('pet-image')) {
            e.target.src = 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400&h=300&fit=crop';
            e.target.alt = 'Cute pet waiting for adoption';
        }
    }, true);
});