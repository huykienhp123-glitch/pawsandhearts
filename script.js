// Pet data - combined from your working version with more personality
const pets = [
    {
        name: "Buddy",
        breed: "Golden Retriever",
        age: "2 years",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        description: "Buddy is the ultimate cuddle expert! He loves belly rubs, playing fetch, and will happily be your loyal shadow around the house."
    },
    {
        name: "Luna",
        breed: "Siamese Cat",
        age: "1.5 years", 
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        description: "Luna is a graceful lady who enjoys sunny spots and gentle pets. She's curious, playful, and will serenade you with cute meows!"
    },
    {
        name: "Max",
        breed: "Beagle Mix",
        age: "3 years",
        image: "https://images.unsplash.com/photo-1517423447168-cb804aafa6e0?w=400&h=300&fit=crop",
        description: "Max is a sweet, gentle soul who's great with kids and other pets. He's house-trained and knows basic commands."
    },
    {
        name: "Bella", 
        breed: "Persian Cat",
        age: "2 years",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
        description: "Bella is a fluffy princess who loves being pampered! She enjoys quiet evenings and will purr happily on your lap."
    },
    {
        name: "Charlie",
        breed: "Labrador Mix", 
        age: "4 months",
        image: "https://images.unsplash.com/photo-1560801457-8ad34ddf75af?w=400&h=300&fit=crop",
        description: "Charlie is an energetic puppy full of love and curiosity! He's learning quickly and can't wait to grow up with a loving family."
    },
    {
        name: "Daisy",
        breed: "Domestic Shorthair",
        age: "1 year",
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop", 
        description: "Daisy is a playful young cat who loves chasing toys and exploring. She's affectionate and will make you laugh with her silly antics!"
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
    
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
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

// Adopt pet function with human touch
function adoptPet(petName) {
    const messages = [
        `Yay! ${petName} would be so happy to meet you! 🎉`,
        `Great choice! ${petName} is waiting for your love! ❤️`,
        `Awesome! ${petName} can't wait to join your family! 🐾`,
        `Perfect! Let's get ${petName} home with you! 🏡`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage);
}

// Show notification with style
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        transform: translateX(400px);
        transition: transform 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3000);
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
        button.style.background = 'var(--secondary-color)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            form.reset();
            showNotification('Thanks for your message! We\'ll get back to you soon. 🐾');
        }, 2000);
    }, 1500);
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
