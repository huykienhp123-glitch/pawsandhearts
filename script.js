document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation (simple X)
            burger.classList.toggle('toggle');
        });
    }

    // --- Form Validation Logic (Contact Page) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
            
            let isValid = true;
            const feedback = document.getElementById('formFeedback');
            
            // Clear previous errors
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            document.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('input-error'));
            feedback.innerHTML = '';
            feedback.className = 'form-feedback';

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
                isValid = false;
            }

            // Validate Email (Simple Regex)
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Subject
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '') {
                showError(subjectInput, 'Please select a subject.');
                isValid = false;
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message cannot be empty.');
                isValid = false;
            }

            if (isValid) {
                // Simulate successful submission
                feedback.textContent = "Thank you! Your message has been sent successfully.";
                feedback.classList.add('success');
                contactForm.reset();
            } else {
                feedback.textContent = "Please correct the errors above.";
                feedback.classList.add('error');
            }
        });
    }

    function showError(inputElement, message) {
        const errorMsg = inputElement.parentElement.querySelector('.error-msg');
        inputElement.classList.add('input-error');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
        }
    }

    // --- Image Modal Logic (Media Page) ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const closeBtn = document.querySelector('.close');

    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src; // Set modal image to clicked image source
            });
        });

        // Close when clicking the X
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
            });
        }

        // Close when clicking outside the image
        window.addEventListener('click', function(e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        });
    }
});