/**
 * Content Loader - Loads content from JSON files
 * This makes it easy for non-programmers to update website content
 */

class ContentLoader {
    constructor() {
        this.contentPath = 'content/';
        this.cache = {};
    }

    /**
     * Load JSON content from a file
     * @param {string} filename - Name of the JSON file (without .json extension)
     * @returns {Promise<Object>} - Parsed JSON data
     */
    async loadContent(filename) {
        // Check cache first
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        try {
            const response = await fetch(`${this.contentPath}${filename}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}.json: ${response.statusText}`);
            }
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`Error loading content from ${filename}.json:`, error);
            return null;
        }
    }

    /**
     * Load and render masthead content
     */
    async renderMasthead() {
        const content = await this.loadContent('masthead');
        if (!content) return;

        const container = document.querySelector('.masthead .container');
        if (!container) return;

        container.innerHTML = `
            <div class="row align-items-center">
                <!-- Left Column: Value Proposition -->
                <div class="col-lg-7 mb-5 mb-lg-0 reveal-slide-up">
                    <div class="badge bg-primary-600 text-white mb-3 px-3 py-2 rounded-pill">${content.badge}</div>
                    <h1 class="display-4 fw-bold mb-3">${content.title.main}<span class="text-gradient">${content.title.highlight}</span></h1>
                    <p class="lead text-slate-300 mb-5">${content.description}</p>
                    <div class="d-flex flex-wrap gap-3">
                        ${content.buttons.map(btn => `
                            <a class="btn btn-professional ${btn.style === 'primary' ? 'btn-professional-primary' : 'btn-professional-outline text-white border-white'} btn-lg" href="${btn.link}">
                                ${btn.text} ${btn.icon ? `<i class="${btn.icon} ms-2"></i>` : ''}
                            </a>
                        `).join('')}
                    </div>
                    <!-- Proof Bar -->
                    <div class="mt-5 pt-4 border-top border-slate-700">
                        <p class="small text-uppercase tracking-wider text-slate-400 mb-3">${content.trustedBy.label}</p>
                        <div class="d-flex flex-wrap gap-4 align-items-center opacity-75">
                            ${content.trustedBy.companies.map(company => `
                                <span class="fw-bold text-slate-300">${company}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <!-- Right Column: Visual Proof -->
                <div class="col-lg-5 text-center reveal-scale-up">
                    <div class="position-relative d-inline-block">
                        <div class="hero-image-wrapper rounded-4 overflow-hidden shadow-lg border border-slate-700">
                            <img class="img-fluid" src="${content.profileImage}" alt="${content.profileAlt}" />
                        </div>
                        <!-- Floating Stat Cards -->
                        ${content.stats.map(stat => `
                            <div class="position-absolute ${stat.position === 'top-left' ? 'top-0 start-0 translate-middle' : 'bottom-0 end-0 translate-middle-y'} bg-slate-800 text-white p-3 rounded-3 shadow-lg d-none d-md-block"
                                style="z-index: 10;${stat.position === 'bottom-right' ? ' margin-right: -2rem;' : ''}">
                                <div class="fw-bold h4 mb-0" data-count="${stat.value}" data-suffix="${stat.suffix}">${stat.value}${stat.suffix}</div>
                                <div class="small text-slate-400">${stat.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Reinitialize number counter for stats
        if (window.initNumberCounter) {
            window.initNumberCounter();
        }
    }

    /**
     * Load and render experience/process content
     */
    async renderExperience() {
        const content = await this.loadContent('experience');
        if (!content) return;

        const container = document.querySelector('#process .container');
        if (!container) return;

        container.innerHTML = `
            <!-- Section Heading-->
            <div class="text-center mb-5">
                <h2 class="display-5 fw-bold mb-3">${content.heading}</h2>
                <p class="lead text-slate-400 mx-auto" style="max-width: 700px;">${content.subheading}</p>
            </div>

            <div class="row g-4 reveal-staggered">
                ${content.steps.map(step => `
                    <div class="col-md-6 col-lg-3">
                        <div class="process-step p-4 h-100 border border-slate-700 rounded-3 bg-slate-800">
                            <div class="h2 fw-bold text-${step.color} mb-3">${step.number}</div>
                            <h3 class="h5 fw-bold mb-3">${step.title}</h3>
                            <p class="small text-slate-400 mb-0">${step.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Load and render skills/expertise content
     */
    async renderSkills() {
        const content = await this.loadContent('skills');
        if (!content) return;

        const container = document.querySelector('#expertise .container');
        if (!container) return;

        container.innerHTML = `
            <!-- Section Heading-->
            <div class="text-center mb-5">
                <h2 class="display-5 fw-bold mb-3 text-white">${content.heading}</h2>
                <p class="lead text-slate-300 mx-auto" style="max-width: 700px;">${content.subheading}</p>
            </div>

            <div class="row g-4 justify-content-center reveal-staggered">
                ${content.pillars.map(pillar => `
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm p-4 hover-lift bg-slate-800 border border-slate-700">
                            <div class="d-flex align-items-center mb-3">
                                <i class="${pillar.icon} fa-lg text-${pillar.iconColor} me-3"></i>
                                <h3 class="h4 fw-bold mb-0 text-white">${pillar.title}</h3>
                            </div>
                            <p class="text-slate-400 mb-0">${pillar.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Tech Stack Badges -->
            <div class="mt-5 pt-5 text-center">
                <p class="small text-uppercase tracking-wider text-slate-500 mb-4">${content.techStack.label}</p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    ${content.techStack.technologies.map(tech => `
                        <span class="badge bg-slate-800 text-slate-300 px-3 py-2 rounded-2 border border-slate-700">${tech}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Load and render portfolio content
     */
    async renderPortfolio() {
        const content = await this.loadContent('portfolio');
        if (!content) return;

        const headingContainer = document.querySelector('#portfolio .container .text-center');
        if (headingContainer) {
            headingContainer.innerHTML = `
                <h2 class="section-heading text-uppercase text-white">${content.heading}</h2>
                <h3 class="section-subheading text-slate-400">${content.subheading}</h3>
            `;
        }

        const trackContainer = document.querySelector('#portfolio .portfolio-track');
        if (!trackContainer) return;

        trackContainer.innerHTML = content.projects.map(project => `
            <div class="portfolio-card-item"
                data-description="${project.description}"
                data-tech-stack="${project.techStack}"
                data-bg-color="${project.bgColor}">
                <div class="card-image-wrapper">
                    <img class="card-image" src="${project.cardImage}" alt="${project.title}" />
                    <img class="card-image-hover" src="${project.hoverImage}" alt="${project.title} Hover" />
                    <div class="card-overlay">
                        <div class="card-category">${project.category}</div>
                        <h3 class="card-title">${project.title}</h3>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize portfolio expansion if needed
        if (window.initPortfolioExpansion) {
            window.initPortfolioExpansion();
        }
    }

    /**
     * Load and render about content
     */
    async renderAbout() {
        const content = await this.loadContent('about');
        if (!content) return;

        const container = document.querySelector('#about .container');
        if (!container) return;

        container.innerHTML = `
            <div class="row align-items-center">
                <div class="col-lg-5 mb-5 mb-lg-0 reveal-slide-left">
                    <h2 class="display-5 fw-bold mb-4 text-white">${content.heading}</h2>
                    <p class="lead text-slate-300 mb-4">${content.description}</p>
                    <ul class="list-unstyled mb-5">
                        ${content.highlights.map(highlight => `
                            <li class="mb-3 d-flex align-items-center">
                                <i class="fas fa-check-circle text-primary-600 me-3"></i>
                                <span class="text-slate-300 fw-medium">${highlight}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="col-lg-6 offset-lg-1 reveal-slide-right">
                    <div class="row g-4">
                        ${content.stats.map(stat => `
                            <div class="col-6">
                                <div class="p-4 bg-slate-800 rounded-4 border border-slate-700 shadow-sm">
                                    <div class="h3 fw-bold text-white mb-1" data-count="${stat.value}" data-suffix="${stat.suffix}">${stat.value}${stat.suffix}</div>
                                    <div class="small text-slate-400">${stat.label}</div>
                                </div>
                            </div>
                        `).join('')}
                        <div class="col-12">
                            <div class="p-4 bg-slate-800 rounded-4 border border-primary-900/30">
                                <p class="text-slate-300 mb-0 italic">"${content.testimonial.quote}"</p>
                                <div class="mt-3 small fw-bold text-primary-600">— ${content.testimonial.author}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Reinitialize number counter for stats
        if (window.initNumberCounter) {
            window.initNumberCounter();
        }
    }

    /**
     * Load and render contact content
     */
    async renderContact() {
        const content = await this.loadContent('contact');
        if (!content) return;

        const container = document.querySelector('#contact .container .row');
        if (!container) return;

        container.innerHTML = `
            <!-- Left Column: Contact Info & CTA -->
            <div class="col-lg-5 mb-5 mb-lg-0 reveal-premium-up">
                <h2 class="display-5 fw-bold mb-4 text-white">${content.heading.main}<span class="text-gradient">${content.heading.highlight}</span></h2>
                <p class="lead text-slate-300 mb-5">${content.description}</p>

                <div class="card shadow-sm p-4 bg-slate-800 mb-4 border border-slate-700">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-primary-900/30 text-primary-400 p-3 rounded-3 me-3">
                            <i class="fas fa-calendar-check fa-lg"></i>
                        </div>
                        <div>
                            <h4 class="h6 fw-bold mb-1 text-white">Book a Strategy Call</h4>
                            <p class="small text-slate-400 mb-0">15-min discovery session</p>
                        </div>
                    </div>
                    <a href="${content.calendarLink}" target="_blank" class="btn btn-professional btn-professional-primary w-100">
                        Schedule on Google Calendar
                    </a>
                </div>

                <div class="d-flex gap-3">
                    ${content.socialLinks.map(social => `
                        <a href="${social.url}" class="text-slate-500 hover-text-primary-400 fs-4">
                            <i class="${social.icon}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Right Column: Contact Form -->
            <div class="col-lg-6 offset-lg-1 reveal-premium-up">
                <div class="card shadow-lg p-4 p-md-5 bg-slate-800 rounded-4 border border-slate-700">
                    <form id="contactForm">
                        ${content.formFields.map(field => {
            if (field.type === 'textarea') {
                return `
                                    <div class="mb-4">
                                        <label for="${field.id}" class="form-label small fw-bold text-slate-300">${field.label}</label>
                                        <textarea class="form-control bg-slate-900 border-slate-700 text-white p-3" 
                                            id="${field.id}" name="${field.id}" rows="${field.rows}" 
                                            placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>
                                    </div>
                                `;
            } else {
                return `
                                    <div class="mb-4">
                                        <label for="${field.id}" class="form-label small fw-bold text-slate-300">${field.label}</label>
                                        <input type="${field.type}" class="form-control bg-slate-900 border-slate-700 text-white p-3"
                                            id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
                                        ${field.id === 'email' ? `
                                            <div class="invalid-feedback text-danger small mt-1" style="display: none;">Email is required.</div>
                                            <div class="invalid-feedback text-danger small mt-1" style="display: none;">Please enter a valid email address.</div>
                                        ` : ''}
                                    </div>
                                `;
            }
        }).join('')}

                        <!-- Submit Button -->
                        <button type="submit" id="submitButton" class="btn btn-professional btn-professional-primary w-100 py-3 disabled">
                            Send Message <i class="fas fa-paper-plane ms-2"></i>
                        </button>
                    </form>

                    <!-- Success message-->
                    <div class="d-none mt-4 p-4 bg-success-900/20 border border-success-500/30 rounded-4 text-success text-center" id="submitSuccessMessage">
                        <div class="h5 fw-bold mb-2">${content.messages.success.title}</div>
                        <p class="mb-0 small opacity-90">${content.messages.success.description}</p>
                    </div>

                    <!-- Error message-->
                    <div class="d-none mt-4 p-4 bg-danger-900/20 border border-danger-500/30 rounded-4 text-danger text-center" id="submitErrorMessage">
                        <div class="h5 fw-bold mb-2">${content.messages.error.title}</div>
                        <p class="mb-0 small opacity-90">${content.messages.error.description}</p>
                    </div>
                </div>
            </div>
        `;

        // Reinitialize contact form if needed
        if (window.initContactForm) {
            window.initContactForm();
        }
    }

    /**
     * Initialize all content sections
     */
    async initAll() {
        await Promise.all([
            this.renderMasthead(),
            this.renderExperience(),
            this.renderSkills(),
            this.renderPortfolio(),
            this.renderAbout(),
            this.renderContact()
        ]);
    }
}

// Initialize content loader when DOM is ready
const contentLoader = new ContentLoader();
