// Portfolio Premium UI JavaScript - Scroll Snap Version

class PortfolioExpansion {
    constructor() {
        this.scrollContainer = document.querySelector('.portfolio-horizontal-scroll');
        this.cards = document.querySelectorAll('.portfolio-card-item');
        this.expandedView = null;
        this.isExpanded = false;

        this.init();
    }

    init() {
        this.createExpandedViewContainer();
        this.attachEventListeners();

        // Initial visual update
        this.updateVisuals();
    }

    createExpandedViewContainer() {
        const container = document.createElement('div');
        container.className = 'portfolio-expanded-view';
        container.innerHTML = `
            <div class="portfolio-expanded-backdrop"></div>
            <div class="portfolio-expanded-content">
                <button class="portfolio-close-btn" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="portfolio-expanded-image">
                    <img src="" alt="">
                </div>
                <div class="portfolio-expanded-details">
                    <div class="portfolio-expanded-category"></div>
                    <h2 class="portfolio-expanded-title"></h2>
                    <div class="portfolio-expanded-divider"></div>
                    <p class="portfolio-expanded-description"></p>
                    <div class="portfolio-expanded-tech">
                        <h4>Technologies Used</h4>
                        <div class="portfolio-tech-stack"></div>
                    </div>
                    <div class="portfolio-expanded-actions">
                        <button class="portfolio-action-btn primary view-project-btn">VIEW PROJECT</button>
                        <button class="portfolio-action-btn secondary close-expanded-btn">CLOSE</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);
        this.expandedView = container;
    }

    attachEventListeners() {
        // Scroll Event for Visuals (Parallax/Scaling)
        this.scrollContainer.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.updateVisuals());
        });

        // Card Click - Simple and Reliable
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.expandCard(card));
        });

        // Close listeners
        this.expandedView.querySelector('.portfolio-close-btn').addEventListener('click', () => this.closeCard());
        this.expandedView.querySelector('.close-expanded-btn').addEventListener('click', () => this.closeCard());
        this.expandedView.querySelector('.portfolio-expanded-backdrop').addEventListener('click', () => this.closeCard());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isExpanded) this.closeCard();
        });

        // View Project
        this.expandedView.querySelector('.view-project-btn').addEventListener('click', () => {
            const url = this.expandedView.dataset.projectUrl;
            if (url) window.location.href = url;
        });
    }

    updateVisuals() {
        const containerCenter = this.scrollContainer.getBoundingClientRect().width / 2;

        this.cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distanceFromCenter = cardCenter - containerCenter;
            const absDistance = Math.abs(distanceFromCenter);

            // Scaling (1.0 at center, 0.9 at edges)
            // Only apply if not hovered (CSS hover handles that)
            if (!card.matches(':hover')) {
                const scale = Math.max(0.9, 1 - (absDistance / window.innerWidth) * 0.2);
                card.style.transform = `scale(${scale})`;
                card.style.opacity = Math.max(0.5, 1 - (absDistance / window.innerWidth) * 0.8);
            } else {
                card.style.transform = ''; // Let CSS hover take over
                card.style.opacity = 1;
            }

            // Parallax (Image offset)
            const img = card.querySelector('.card-image');
            const parallaxOffset = (distanceFromCenter / window.innerWidth) * 20; // 20% offset
            img.style.transform = `translateX(${parallaxOffset}%)`;
        });
    }

    expandCard(card) {
        if (this.isExpanded) return;
        this.isExpanded = true;

        const rect = card.getBoundingClientRect();
        const content = this.expandedView.querySelector('.portfolio-expanded-content');

        // Set initial position of expanded content to match card
        content.style.top = `${rect.top}px`;
        content.style.left = `${rect.left}px`;
        content.style.width = `${rect.width}px`;
        content.style.height = `${rect.height}px`;
        content.style.borderRadius = '1.5rem';

        // Populate data
        const image = card.querySelector('.card-image').src;
        const category = card.querySelector('.card-category').textContent;
        const title = card.querySelector('.card-title').textContent;
        const description = card.dataset.description;
        const techStack = card.dataset.techStack ? card.dataset.techStack.split(',') : [];
        const projectUrl = card.querySelector('a')?.href || '#';

        this.expandedView.querySelector('.portfolio-expanded-image img').src = image;
        this.expandedView.querySelector('.portfolio-expanded-category').textContent = category;
        this.expandedView.querySelector('.portfolio-expanded-title').textContent = title;
        this.expandedView.querySelector('.portfolio-expanded-description').textContent = description;
        this.expandedView.dataset.projectUrl = projectUrl;

        const techContainer = this.expandedView.querySelector('.portfolio-tech-stack');
        techContainer.innerHTML = '';
        techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'portfolio-tech-badge';
            span.textContent = tech.trim();
            techContainer.appendChild(span);
        });

        // Show view
        this.expandedView.style.display = 'flex';

        // Trigger transition
        requestAnimationFrame(() => {
            this.expandedView.classList.add('active');
            content.classList.add('full');
            document.body.style.overflow = 'hidden';
        });
    }

    closeCard() {
        if (!this.isExpanded) return;

        const content = this.expandedView.querySelector('.portfolio-expanded-content');

        // Find the original card to get its current position
        const title = this.expandedView.querySelector('.portfolio-expanded-title').textContent;
        let originalCard = null;
        this.cards.forEach(card => {
            if (card.querySelector('.card-title').textContent === title) {
                originalCard = card;
            }
        });

        if (originalCard) {
            const rect = originalCard.getBoundingClientRect();
            content.classList.remove('full');
            content.style.top = `${rect.top}px`;
            content.style.left = `${rect.left}px`;
            content.style.width = `${rect.width}px`;
            content.style.height = `${rect.height}px`;
            content.style.borderRadius = '1.5rem';
        }

        this.expandedView.classList.remove('active');

        setTimeout(() => {
            this.expandedView.style.display = 'none';
            document.body.style.overflow = '';
            this.isExpanded = false;
        }, 800);
    }
}

// Initialize
const initPortfolio = () => {
    if (document.querySelector('.portfolio-horizontal-scroll')) {
        // Check if already initialized to prevent duplicates
        if (!window.portfolioExpansionInstance) {
            window.portfolioExpansionInstance = new PortfolioExpansion();
        }
    }
};

// Listen for the custom event from pages.js
document.addEventListener('sectionsLoaded', initPortfolio);

// Also try on DOMContentLoaded in case content is already there (e.g. static build)
document.addEventListener('DOMContentLoaded', initPortfolio);
