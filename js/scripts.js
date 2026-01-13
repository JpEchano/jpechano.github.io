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

        // Update copyright year
        const yearElement = document.querySelector('#copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // Wait for sections to be loaded before initializing
    document.addEventListener('sectionsLoaded', initScripts);

});
