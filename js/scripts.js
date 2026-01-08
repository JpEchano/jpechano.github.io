/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const initScripts = () => {
        // Navbar shrink function
        var navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }

        };

        // Shrink the navbar 
        navbarShrink();

        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);


        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });

        // Dynamic Navbar Text Color based on section background
        const sections = document.querySelectorAll('section, header.masthead');
        const mainNavElement = document.querySelector('#mainNav');

        if (!mainNavElement) return;

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0% -85% 0%', // Detect what's under the header
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    // Sections with white backgrounds: About (no bg class), Skills (no bg class), Contact (no bg class)
                    // Sections with teal backgrounds: Masthead (bg-primary), Experience (bg-primary), Portfolio (bg-primary)
                    const isWhiteSection = !target.classList.contains('bg-primary');

                    if (isWhiteSection) {
                        mainNavElement.classList.add('navbar-light-mode');
                    } else {
                        mainNavElement.classList.remove('navbar-light-mode');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));

        // Scroll Reveal Implementation
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealCallback = (entries) => {
            entries.forEach(entry => {
                const rect = entry.boundingClientRect;

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else if (rect.top > 0) {
                    // If not intersecting and top is positive, it's below the viewport
                    entry.target.classList.remove('visible');
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

        // Target all sections and the masthead
        const revealElements = document.querySelectorAll('section, header.masthead');
        revealElements.forEach(el => {
            el.classList.add('scroll-reveal');
            revealObserver.observe(el);
        });
    };

    // Wait for sections to be loaded before initializing
    document.addEventListener('sectionsLoaded', initScripts);

});
