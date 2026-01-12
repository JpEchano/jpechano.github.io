document.addEventListener('sectionsLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');

    // Enable submit button when form is valid (basic check)
    contactForm.addEventListener('input', () => {
        const isValid = contactForm.checkValidity();
        if (isValid) {
            submitButton.classList.remove('disabled');
        } else {
            submitButton.classList.add('disabled');
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Final validation check
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitButton.classList.add('disabled');
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // Using Formspree for a "proper" AJAX submission
            // The user should replace 'your-formspree-id' with their actual ID
            const response = await fetch('https://formspree.io/f/xykkyyrz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                successMessage.classList.remove('d-none');
                errorMessage.classList.add('d-none');
                contactForm.reset();
                submitButton.classList.add('disabled');
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            errorMessage.classList.remove('d-none');
            successMessage.classList.add('d-none');
        } finally {
            submitButton.innerHTML = 'Send';
            if (contactForm.checkValidity()) {
                submitButton.classList.remove('disabled');
            }
        }
    });
});
