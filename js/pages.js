document.addEventListener('DOMContentLoaded', () => {
    const pageFiles = [
        { file: 'header.html', containerId: 'header-container' },
        { file: 'masthead.html', containerId: 'masthead-container' },
        { file: 'about.html', containerId: 'about-container' },
        { file: 'experience.html', containerId: 'experience-container' },
        { file: 'skills.html', containerId: 'skills-container' },
        { file: 'portfolio.html', containerId: 'portfolio-container' },
        { file: 'contact.html', containerId: 'contact-container' },
        { file: 'footer.html', containerId: 'footer-container' }
    ];

    const loadPromises = pageFiles.map(({ file, containerId }) => {
        return fetch(`page/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load page section: ${file}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                }
            })
            .catch(error => {
                console.error('Error loading page section:', error);
            });
    });

    Promise.all(loadPromises).then(() => {
        // Dispatch custom event when all sections are loaded
        document.dispatchEvent(new CustomEvent('sectionsLoaded'));
    });
});
