import gsap from 'gsap';

//PAGE LOADING
window.addEventListener('load', () => {
    const timeline = gsap.timeline({ defaults: {}});
    timeline
        .to('.loader', { duration: .4, delay: .4, opacity: 0, display: 'none'})
        .from('.cursor', { duration: 0.2, opacity: 0 })
        .from('.name', { duration: .7, opacity: 0, y: '-15%' }, '<.1')
        .from('.navigation', { duration: .4, opacity: 0, y: '-10%'}, '<.5')
        .from('.arrows', { duration: .4, opacity: 0, ease: 'expo'})
        .to('html', { duration: 0.1, overflowY: 'overlay'})
});
screen.orientation.addEventListener('change', () => {
    document.location.reload(true);
});



//ROLL-OUT SECTION BEHAVIOR
const arrows = document.querySelectorAll('.arrow-recktangle');
const aboutText = document.querySelector('.about-text-wrapper');
let x = 0;

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (!arrow.hasAttribute('data-clicked')) {
            let rollOutLength = arrow.nextElementSibling.clientWidth;
            arrow.dataset.clicked = 'true';
            x++;
            gsap.to(arrow, {
                keyframes: {
                    '15%': { rotationY: 180, x: 0},
                    '25%': { rotationY: 180, x: '-.52vw'},
                    '40%': { rotationY: 180, x: '10.4vw'},
                    '55%': { rotationY: 0, x: '10.4vw'},
                    '70%': { x: '-.52vw'},
                    '80%': { rotationY: 0, x: 0},
                    '100%': { rotationY: 180}
                },
                duration: 5,
                transformOrigin: 'center'
            });
            gsap.to(arrow.nextElementSibling, {
                keyframes: {
                    '50%': { x: '-35.4vw'},
                    '100%': { x: '-33.1vw'}
                },
                delay: 2,
                duration: 1
            })
        } else {
            delete arrow.dataset.clicked;
            x--;
            gsap.to(arrow, {
                keyframes: {
                    '15%': { x: '-.52vw'},
                    '38%': { x: '10.4vw'},
                    '62%': { rotationY: 0, x: '10.4vw'},
                    '85%': {  x: '-.52vw'},
                    '100%': { rotationY: 0, x: 0}
                },
                duration: 3.25,
                transformOrigin: 'center'
            });
            gsap.to(arrow.nextElementSibling, {
                keyframes: {
                    '50%': { x: '-35.4vw'},
                    '100%': { x: 0}
                },
                delay: 1,
                duration: 1
            })
        }
        if (x > 0) {
            if(window.matchMedia('(max-width: 3000px)').matches) {
                setTimeout(() => {
                    aboutText.classList.remove('about-text-animation-2');
                    aboutText.classList.add('about-text-animation-1');
                }, 1100)
            } else {
                setTimeout(() => {
                    aboutText.classList.remove('about-text-animation-2');
                    aboutText.classList.remove('about-text-animation-1');
                }, 1100)
            }
        } else {
            if(window.matchMedia('(max-width: 3000px)').matches) {
                setTimeout(() => {
                    aboutText.classList.remove('about-text-animation-1');
                    aboutText.classList.add('about-text-animation-2');
                }, 1150)
            } else {
                setTimeout(() => {
                    aboutText.classList.remove('about-text-animation-2');
                    aboutText.classList.remove('about-text-animation-1');
                }, 1100)
            }
        }
    })
})



//PROJECT CARD REVEAL/ HIDE
const projectsTiles = document.querySelectorAll('.tile');

projectsTiles.forEach( tile => {
    let project = document.querySelector(`.${tile.dataset.projectName}`);

    tile.addEventListener('click', e => {
        let timeline = gsap.timeline();
        timeline
            .to(project, { display: 'block', duration: 0.01})
            .to('html', { overflow: 'hidden', duration: 0.01})
            .fromTo(project, { y: '100%'}, { y: '20%', duration: .1})
            .to(project, { y: 0, duration: .5, ease: 'expo'})
            .fromTo(project.querySelector('.project-left-side'), { x: '-100%'}, { x: 0, duration: .5, ease: 'power1'})
            .fromTo(project.querySelector('.laptop'), { x: '110vw'}, { x: 0, duration: .7, ease: 'power4'}, '<.05')
            .fromTo(project.querySelector('.project-details-container'), { opacity: 0}, { opacity: 1, duration: .3}, '<.5')
            .fromTo(project.querySelector('.project-details-container'), { y: '-1vw'}, { y: 0, duration: .5}, '<')
            .fromTo(project.querySelectorAll('.overview-switch, h1'), { opacity: 0}, { opacity: 1, duration: .001})
            .fromTo(project.querySelectorAll('.overview-switch, h1'), { y: '-100%'}, { y: 0, duration: .55, delay: .1});
    })

    project.querySelector('.arrow-back').addEventListener('click', () => {
        let timeline2 = gsap.timeline({defaults: { duration: .001}})
        let laptopButton = project.querySelector('[data-name="laptop-button"]');
        let mobileButton = project.querySelector('[data-name="mobile-button"]');
        timeline2
            .to(project, { y: '100%', duration: 1, ease: 'expo', delay: 0})
            .to(project, { display: 'none'}, 1)
            .to('html', { overflowY: 'overlay'}, 1)
            .fromTo('.tile', { pointerEvents: 'none'}, { pointerEvents: 'auto'}, 1)
            .to(laptopButton, { y: 0}, 1)
            .to(laptopButton.querySelector('img'), { filter: 'invert(100%) sepia(6%) saturate(0%) hue-rotate(115deg) brightness(108%) contrast(108%)'}, 1)
            .to(mobileButton, { y: 0}, 1)
            .to(mobileButton.querySelector('img'), { filter: 'invert(65%) sepia(2%) saturate(0%) hue-rotate(157deg) brightness(82%) contrast(94%)'}, 1)
            .to(project.querySelector('.mobile'), { x: '-90vw'}, 1);

        startingOrder = true;
    })
})



// PROJECTS OVERVIEW SWITCHES
const overviewSwitches = document.querySelectorAll('.overview-switch');
const laptopButtons = document.querySelectorAll('[data-name="laptop-button"]');
const mobileButtons = document.querySelectorAll('[data-name="mobile-button"]');
const overviewIcons = document.querySelectorAll('.overview-switch div');



// CHANGE SWITCH OVERVIEW HEIGHT ON HOVER
if(window.matchMedia('(hover: hover)').matches) {
    overviewSwitches.forEach( element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, { height: '6.9vw', duration: .3, ease: 'power1'})
        })
        element.addEventListener('mouseleave', () => {
            if (startingOrder) {
                gsap.to(element, { height: '3.45vw', duration: .3, ease: 'power1'})
            } else {
                gsap.to(element, { height: '3.65vw', duration: .3, ease: 'power1'})
            }
        })
    })
}else if(window.matchMedia('(orientation: landscape)').matches) {
    overviewSwitches.forEach( element => {
        element.addEventListener('click', () => {
            gsap.to(element, { height: '6.9vw', duration: .1, ease: 'power1'})
        })
        element.addEventListener('mouseleave', () => {
            if (startingOrder) {
                gsap.to(element, { height: '3.45vw', duration: .3, ease: 'power1'})
            } else {
                gsap.to(element, { height: '3.65vw', duration: .3, ease: 'power1'})
            }
        })
    })
}else {
    overviewSwitches.forEach( element => {
        element.addEventListener('click', () => {
            gsap.to(element, { height: '17.25vw', duration: .1, ease: 'power1'})
        })
        element.addEventListener('mouseleave', () => {
            if (startingOrder) {
                gsap.to(element, { height: '8.625vw', duration: .3, ease: 'power1'})
            } else {
                gsap.to(element, { height: '9.125vw', duration: .3, ease: 'power1'})
            }
        })
    })
}



// OVERVIEW BUTTONS ONCLICK EFFECT 
let startingOrder = true;
laptopButtons.forEach( button => {
    button.addEventListener('click', () => {
        if (!startingOrder) {
            startingOrder = true;
            button.parentElement.style.pointerEvents = 'none';
            let laptopImage = button.parentElement.parentElement.querySelector('.laptop');
            let mobileImage = button.parentElement.parentElement.querySelector('.mobile');
            if(window.matchMedia('(max-width: 1000px) and (orientation: portrait)').matches) {
                let timeline = gsap.timeline();
                timeline
                    .to(button.querySelector('img'), { filter: 'invert(100%) sepia(6%) saturate(0%) hue-rotate(115deg) brightness(108%) contrast(108%)', duration: .01})
                    .to(button, { y: 0, duration: .17, ease: 'none'})
                    .to(button.nextElementSibling, { y: '-17.125vw', duration: .17, ease: 'none'}, '<')
                    .to(button.parentElement, {height: '8.625vw', duration: .17, ease: 'none'}, '<')
                    .to(button.nextElementSibling, { opacity: 0, y: 0, duration: .001})
                    .to(button.nextElementSibling, { opacity: 1, duration: .001})
                    .to(button.nextElementSibling.querySelector('img'), { filter: 'invert(65%) sepia(2%) saturate(0%) hue-rotate(157deg) brightness(82%) contrast(94%)', duration: .001}, '<')
                    .to(mobileImage, { x: '-90vw', duration: .5, ease: 'power2'}, .1)
                    .to(laptopImage, { x: 0, duration: .5, ease: 'power2'}, '<.07')
                    .to(button.parentElement, { pointerEvents: 'auto', duration: .01})
            }else {
                let timeline = gsap.timeline();
                timeline
                    .to(button.querySelector('img'), { filter: 'invert(100%) sepia(6%) saturate(0%) hue-rotate(115deg) brightness(108%) contrast(108%)', duration: .01})
                    .to(button, { y: 0, duration: .17, ease: 'none'})
                    .to(button.nextElementSibling, { y: '-6.85vw', duration: .17, ease: 'none'}, '<')
                    .to(button.parentElement, {height: '3.45vw', duration: .17, ease: 'none'}, '<')
                    .to(button.nextElementSibling, { opacity: 0, y: 0, duration: .001})
                    .to(button.nextElementSibling, { opacity: 1, duration: .001})
                    .to(button.nextElementSibling.querySelector('img'), { filter: 'invert(65%) sepia(2%) saturate(0%) hue-rotate(157deg) brightness(82%) contrast(94%)', duration: .001}, '<')
                    .to(mobileImage, { x: '-90vw', duration: .5, ease: 'power2'}, .1)
                    .to(laptopImage, { x: 0, duration: .5, ease: 'power2'}, '<.07')
                    .to(button.parentElement, { pointerEvents: 'auto', duration: .01})
            }
        } else return
    })
})

mobileButtons.forEach( button => {
    button.addEventListener('click', () => {
        if (startingOrder) {
            startingOrder = false;
            button.parentElement.style.pointerEvents = 'none';
            let laptopImage = button.parentElement.parentElement.querySelector('.laptop');
            let mobileImage = button.parentElement.parentElement.querySelector('.mobile');
            if(window.matchMedia('(max-width: 1000px) and (orientation: portrait)').matches) {
                let timeline = gsap.timeline();
                timeline
                    .to(button.querySelector('img'), { filter: 'invert(100%) sepia(6%) saturate(0%) hue-rotate(115deg) brightness(108%) contrast(108%)', duration: .01})
                    .to(button, { y: '-7.875vw', duration: .17, ease: 'none'})
                    .to(button.previousElementSibling, { y: '-7.875vw', duration: .17, ease: 'none'}, '<')
                    .to(button.parentElement, {height: '9.125vw', duration: .17, ease: 'none'}, '<')
                    .to(button.previousElementSibling, { opacity: 0, y: '9.25vw', duration: .001})
                    .to(button.previousElementSibling, { opacity: 1, duration: .001})
                    .to(button.previousElementSibling.querySelector('img'), { filter: 'invert(65%) sepia(2%) saturate(0%) hue-rotate(157deg) brightness(82%) contrast(94%)', duration: .001}, '<')
                    .to(laptopImage, { x: '110vw', duration: .5, ease: 'power2'}, .1)
                    .to(mobileImage, { x: 0, duration: .5, ease: 'power2'}, '<.07')
                    .to(button.parentElement, { pointerEvents: 'auto', duration: .001})
            }else {
                let timeline = gsap.timeline();
                timeline
                    .to(button.querySelector('img'), { filter: 'invert(100%) sepia(6%) saturate(0%) hue-rotate(115deg) brightness(108%) contrast(108%)', duration: .01})
                    .to(button, { y: '-3.15vw', duration: .17, ease: 'none'})
                    .to(button.previousElementSibling, { y: '-3.15vw', duration: .17, ease: 'none'}, '<')
                    .to(button.parentElement, {height: '3.65vw', duration: .17, ease: 'none'}, '<')
                    .to(button.previousElementSibling, { opacity: 0, y: '3.7vw', duration: .001})
                    .to(button.previousElementSibling, { opacity: 1, duration: .001})
                    .to(button.previousElementSibling.querySelector('img'), { filter: 'invert(65%) sepia(2%) saturate(0%) hue-rotate(157deg) brightness(82%) contrast(94%)', duration: .001}, '<')
                    .to(laptopImage, { x: '110vw', duration: .5, ease: 'power2'}, .1)
                    .to(mobileImage, { x: 0, duration: .5, ease: 'power2'}, '<.07')
                    .to(button.parentElement, { pointerEvents: 'auto', duration: .001})
            }
        } else return
    })
})



//HAMBURGER CLICK HANDLER
const hamburgerMenu = document.querySelector('.navigation-close');
let hamburgerClicked = false;

hamburgerMenu.addEventListener('click', () => {
    if(hamburgerClicked) {
        hamburgerClicked = false;
        const timeline2 = gsap.timeline({ defaults: {}});
        timeline2
            .to('.navigation li', { duration: .35, opacity: 0, y: '-2vw'})
            .to('.navigation ul', { duration: .4, opacity: 0})
            .to('.navigation ul', { duration: .001, display: 'none'})
            .to(hamburgerMenu.children[0], {transformOrigin: 'left', rotateZ: '0', width: '50%', ease: 'back', duration: .25 }, .1)
            .to(hamburgerMenu.children[1], {transformOrigin: 'center', height: '3px', ease: 'back', duration: .25 }, '<')
            .to(hamburgerMenu.children[2], {transformOrigin: 'right', rotateZ: '0', x: '0', width: '75%', ease: 'back', duration: .25 }, '<')
            .to(hamburgerMenu, { justifyContent: 'space-around', duration: 0.1}, '<')
            .to('html', { overflowY: 'overlay', duration: 0.01})     
    } else {
        window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        })
        hamburgerClicked = true;
        const timeline = gsap.timeline({ defaults: {}});
        timeline
            .to('html', { overflow: 'hidden', duration: 0.01})
            .to(hamburgerMenu.children[0], {transformOrigin: 'left', rotateZ: '45deg', width: '140%', ease: 'back', duration: .3 })
            .to(hamburgerMenu.children[1], {transformOrigin: 'center', height: 0, ease: 'back', duration: .3 }, '<')
            .to(hamburgerMenu.children[2], {transformOrigin: ' right', rotateZ: '135deg', x: '-100%', width: '140%', ease: 'back', duration: .3 }, '<')
            .to(hamburgerMenu, { justifyContent: 'space-between', duration: 0.1}, '<')
            .fromTo('.navigation ul', { duration: .001, opacity: 0, display: 'flex'}, { duration: .2, opacity: 1}, .1)
            .fromTo('.navigation li', { duration: .001, opacity: 0, y: '-2vw'}, { duration: .25, opacity: 1, y: '0'})
    }
})

//NAVIGATION LINKS HANDLING+
const navigationLinks = document.querySelectorAll('.navigation ul a');

navigationLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById(e.target.dataset.text).scrollIntoView({ behavior: "smooth"});
        if(window.matchMedia('(max-width: 1000px)').matches) {
            hamburgerClicked = false;
            const timeline = gsap.timeline();
            timeline
                .to('html', { overflowY: 'overlay', duration: 0.01})
                .to('.navigation ul', { duration: .001, display: 'none'}, .4)
                .to(hamburgerMenu.children[0], {transformOrigin: 'center left', rotateZ: '0', width: '50%', ease: 'back', duration: .001 }, .4)
                .to(hamburgerMenu.children[1], {transformOrigin: 'center', height: '3px', ease: 'back', duration: .001 }, '<')
                .to(hamburgerMenu.children[2], {transformOrigin: 'center right', rotateZ: '0', x: '0', width: '75%', ease: 'back', duration: .001 }, '<')
                .to(hamburgerMenu, { justifyContent: 'space-around', duration: 0.001}, '<')
        }
    })
})
