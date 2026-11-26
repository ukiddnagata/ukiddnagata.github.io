
// =========================
// DARK & LIGHT MODE
// =========================

const root = document.documentElement;

const themeButton =
    document.querySelector('#theme');


function applyTheme(theme) {

    root.dataset.theme = theme;

    themeButton.textContent =
        theme === 'dark' ? '☀' : '☾';

    themeButton.setAttribute(
        'aria-label',
        theme === 'dark'
            ? 'Switch to light mode'
            : 'Switch to dark mode'
    );

}


let savedTheme;

try {

    savedTheme =
        localStorage.getItem('ukidd-theme');

} catch {}


applyTheme(
    savedTheme === 'light'
        ? 'light'
        : 'dark'
);


themeButton.addEventListener('click', () => {

    const nextTheme =
        root.dataset.theme === 'dark'
            ? 'light'
            : 'dark';

    applyTheme(nextTheme);

    try {

        localStorage.setItem(
            'ukidd-theme',
            nextTheme
        );

    } catch {}

});



// =========================
// AUTOMATIC FOOTER YEAR
// =========================

document.querySelector('#year').textContent =
    new Date().getFullYear();



// =========================
// PROFILE IMAGE FALLBACK
// =========================

const avatar =
    document.querySelector('#avatar');


function fallbackAvatar() {

    if (avatar.dataset.fallback === 'true') {

        avatar.hidden = true;

        return;

    }

    avatar.dataset.fallback = 'true';

    avatar.src =
        'https://github.com/ukiddnagata.png?size=800';

}


avatar.addEventListener(
    'error',
    fallbackAvatar
);


if (avatar.complete && avatar.naturalWidth === 0) {

    fallbackAvatar();

}



// =========================
// SCROLL REVEAL ANIMATION
// =========================

let observer;


if ('IntersectionObserver' in window) {

    observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.08

        }

    );

}


function animateCards(page) {

    if (!observer) return;

    observer.disconnect();

    const cards =
        page.querySelectorAll('.tile');


    cards.forEach(card => {

        card.classList.remove('visible');

        card.classList.add('reveal');

        observer.observe(card);

    });

}



// =========================
// PAGE NAVIGATION
// =========================

const pages = [

    ...document.querySelectorAll('main > .page')

];


function showPage() {

    const requestedPage =
        location.hash.slice(1).toLowerCase();


    const activePage =

        pages.find(
            page => page.id === requestedPage
        )

        || pages[0];


    // Hide all other pages.

    pages.forEach(page => {

        page.hidden =
            page !== activePage;

        page.classList.remove('enter');

    });


    // Restart page animation.

    void activePage.offsetWidth;

    activePage.classList.add('enter');


    // Update active navigation link.

    document.querySelectorAll('nav a').forEach(link => {

        if (link.hash === '#' + activePage.id) {

            link.setAttribute(
                'aria-current',
                'page'
            );

        } else {

            link.removeAttribute(
                'aria-current'
            );

        }

    });


    // Update browser tab title.

    const pageTitle =

        activePage.id.charAt(0).toUpperCase()

        + activePage.id.slice(1);


    document.title =
        pageTitle + ' | UkiddGj';


    // Return to top when switching page.

    window.scrollTo({

        top: 0,

        behavior: 'instant'

    });


    // Apply scroll animation.

    animateCards(activePage);

}



// =========================
// DETECT PAGE CHANGES
// =========================

window.addEventListener(

    'hashchange',

    showPage

);



// =========================
// LOAD INITIAL PAGE
// =========================

showPage();
