// Country data with codes and digit limits
const countries = [
    { name: 'United States', code: '+1', iso: 'us', maxDigits: 10 },
    { name: 'United Kingdom', code: '+44', iso: 'gb', maxDigits: 10 },
    { name: 'Canada', code: '+1', iso: 'ca', maxDigits: 10 },
    { name: 'Australia', code: '+61', iso: 'au', maxDigits: 9 },
    { name: 'Germany', code: '+49', iso: 'de', maxDigits: 11 },
    { name: 'France', code: '+33', iso: 'fr', maxDigits: 9 },
    { name: 'Italy', code: '+39', iso: 'it', maxDigits: 10 },
    { name: 'Spain', code: '+34', iso: 'es', maxDigits: 9 },
    { name: 'Netherlands', code: '+31', iso: 'nl', maxDigits: 9 },
    { name: 'Belgium', code: '+32', iso: 'be', maxDigits: 9 },
    { name: 'Switzerland', code: '+41', iso: 'ch', maxDigits: 9 },
    { name: 'Austria', code: '+43', iso: 'at', maxDigits: 11 },
    { name: 'Sweden', code: '+46', iso: 'se', maxDigits: 9 },
    { name: 'Norway', code: '+47', iso: 'no', maxDigits: 8 },
    { name: 'Denmark', code: '+45', iso: 'dk', maxDigits: 8 },
    { name: 'Finland', code: '+358', iso: 'fi', maxDigits: 10 },
    { name: 'Poland', code: '+48', iso: 'pl', maxDigits: 9 },
    { name: 'Russia', code: '+7', iso: 'ru', maxDigits: 10 },
    { name: 'China', code: '+86', iso: 'cn', maxDigits: 11 },
    { name: 'Japan', code: '+81', iso: 'jp', maxDigits: 10 },
    { name: 'South Korea', code: '+82', iso: 'kr', maxDigits: 10 },
    { name: 'India', code: '+91', iso: 'in', maxDigits: 10 },
    { name: 'Brazil', code: '+55', iso: 'br', maxDigits: 11 },
    { name: 'Mexico', code: '+52', iso: 'mx', maxDigits: 10 },
    { name: 'Argentina', code: '+54', iso: 'ar', maxDigits: 10 },
    { name: 'Philippines', code: '+63', iso: 'ph', maxDigits: 10 },
    { name: 'Singapore', code: '+65', iso: 'sg', maxDigits: 8 },
    { name: 'Malaysia', code: '+60', iso: 'my', maxDigits: 10 },
    { name: 'Thailand', code: '+66', iso: 'th', maxDigits: 9 },
    { name: 'Vietnam', code: '+84', iso: 'vn', maxDigits: 10 },
    { name: 'Indonesia', code: '+62', iso: 'id', maxDigits: 11 },
    { name: 'New Zealand', code: '+64', iso: 'nz', maxDigits: 9 },
    { name: 'South Africa', code: '+27', iso: 'za', maxDigits: 9 },
    { name: 'Egypt', code: '+20', iso: 'eg', maxDigits: 10 },
    { name: 'Turkey', code: '+90', iso: 'tr', maxDigits: 10 },
    { name: 'Saudi Arabia', code: '+966', iso: 'sa', maxDigits: 9 },
    { name: 'United Arab Emirates', code: '+971', iso: 'ae', maxDigits: 9 },
    { name: 'Israel', code: '+972', iso: 'il', maxDigits: 9 },
    { name: 'Greece', code: '+30', iso: 'gr', maxDigits: 10 },
    { name: 'Portugal', code: '+351', iso: 'pt', maxDigits: 9 }
];

document.addEventListener('sectionsLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');

    // Country selector elements
    const countrySelector = document.getElementById('countrySelector');
    const countryDropdown = document.getElementById('countryDropdown');
    const countryList = document.getElementById('countryList');
    const countrySearch = document.getElementById('countrySearch');
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedCode = document.getElementById('selectedCode');
    const phoneInput = document.getElementById('phone');

    let currentCountry = countries[0]; // Default to US

    // Populate country list
    function populateCountries(filter = '') {
        const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(filter.toLowerCase()) ||
            country.code.includes(filter)
        );

        countryList.innerHTML = filteredCountries.map(country => `
            <div class="country-item" data-code="${country.code}" data-iso="${country.iso}" data-max="${country.maxDigits}">
                <img src="https://flagcdn.com/w40/${country.iso}.png" alt="${country.name}" class="country-flag">
                <span class="country-name">${country.name}</span>
                <span class="country-code-text">${country.code}</span>
            </div>
        `).join('');

        // Add click listeners to country items
        document.querySelectorAll('.country-item').forEach(item => {
            item.addEventListener('click', () => selectCountry(item));
        });
    }

    // Select a country
    function selectCountry(item) {
        const code = item.dataset.code;
        const iso = item.dataset.iso;
        const maxDigits = parseInt(item.dataset.max);

        currentCountry = countries.find(c => c.iso === iso);

        selectedFlag.src = `https://flagcdn.com/w40/${iso}.png`;
        selectedFlag.alt = iso.toUpperCase();
        selectedCode.textContent = code;
        phoneInput.maxLength = maxDigits;

        // Close dropdown
        countryDropdown.classList.remove('show');
        countrySearch.value = '';
        populateCountries();
    }

    // Toggle dropdown
    countrySelector.addEventListener('click', (e) => {
        e.stopPropagation();
        countryDropdown.classList.toggle('show');
        if (countryDropdown.classList.contains('show')) {
            countrySearch.focus();
        }
    });

    // Search functionality
    countrySearch.addEventListener('input', (e) => {
        populateCountries(e.target.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!countrySelector.contains(e.target) && !countryDropdown.contains(e.target)) {
            countryDropdown.classList.remove('show');
            countrySearch.value = '';
            populateCountries();
        }
    });

    // Initialize
    populateCountries();

    // Email validation
    const emailInput = document.getElementById('email');
    const emailFeedbackRequired = emailInput.parentElement.nextElementSibling;
    const emailFeedbackInvalid = emailFeedbackRequired.nextElementSibling;

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updateEmailValidation() {
        const email = emailInput.value;
        if (!email) {
            emailInput.classList.add('is-invalid');
            emailFeedbackRequired.style.display = 'block';
            emailFeedbackInvalid.style.display = 'none';
            return false;
        } else if (!validateEmail(email)) {
            emailInput.classList.add('is-invalid');
            emailFeedbackRequired.style.display = 'none';
            emailFeedbackInvalid.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailFeedbackRequired.style.display = 'none';
            emailFeedbackInvalid.style.display = 'none';
            return true;
        }
    }

    emailInput.addEventListener('input', updateEmailValidation);
    emailInput.addEventListener('blur', updateEmailValidation);

    // Enable submit button when form is valid (basic check)
    contactForm.addEventListener('input', () => {
        const isEmailValid = validateEmail(emailInput.value);
        const isFormValid = contactForm.checkValidity() && isEmailValid;

        if (isFormValid) {
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

        // Add full phone number with country code if phone is provided
        if (data.phone) {
            data.phone = `${currentCountry.code} ${data.phone}`;
        }

        try {
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

                // Reset to default country
                selectedFlag.src = 'https://flagcdn.com/w40/us.png';
                selectedCode.textContent = '+1';
                phoneInput.maxLength = 10;
                currentCountry = countries[0];

                // Hide success message after 15 seconds with fade out
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                        successMessage.classList.remove('fade-out');
                    }, 1000); // Wait for 1s transition
                }, 14000); // Start fade at 14s
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
