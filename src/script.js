const perks = document.querySelectorAll('.perk img');
const columns = document.querySelectorAll('.column');
const cursor = document.querySelector('.cursor');
const sections = document.querySelectorAll('section');
const technologiesUsed = document.querySelectorAll('.technology-used');

import gsap from 'gsap';
import './3dObject.js';
import './contact.js';
import './animations.js'


// SKILLS SECTION BEHAVIOR.... //
perks.forEach(perk => {
    perk.addEventListener('mouseover', () => {
        perk.nextElementSibling.style.opacity = '1';
        perk.nextElementSibling.style.transform = 'translateY(clamp(6px, .42vw, 22px))';
    });
    perk.addEventListener('mouseout', () => {
        perk.nextElementSibling.style.opacity = '0';
        perk.nextElementSibling.style.transform = 'translateY(clamp(-20px, -.36vw, -5px))';

    });
})

if(window.matchMedia('(hover: hover)').matches) {
    columns.forEach(column => {
        column.addEventListener('mouseover', () => {
            column.children[0].style.top = 'clamp(calc((80px + 0.625vw) * (-1)), -3.23vw, calc((40px + 0.625vw) * (-1)))';
        });
        column.addEventListener('mouseout', () => {
            column.children[0].style.top = '0';
        });
    })
}

// CURSOR FUNCTION.... //
if(window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    })
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    })
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    })
    
    document.addEventListener('mousemove', e => {
        if (e.clientX > (window.innerWidth - 9)) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block'; 
        }
    })
}else {
    cursor.style.display = 'none';
}



//DYNAMIC WIDTH CHANGE OF AN ELEMENT
let textWidth;

technologiesUsed.forEach( technology => {
    technology.addEventListener('mouseover', () => {
        textWidth = technology.querySelector('p').offsetWidth;
        if(window.matchMedia('(max-width: 500px)').matches) {
            technology.style.width = `calc(${textWidth}px + 1.65vw + clamp(36px, 2.8vw, 200px))`
        }else {
            technology.style.width = `calc(${textWidth}px + .65vw + clamp(36px, 2.8vw, 200px))`
        }
    })
    technology.addEventListener('mouseout', () => {
        technology.style.width = 'clamp(36px, 2.82vw, 200px)';
    })
})



//SCROLL UP ON RELOAD
history.scrollRestoration = 'manual';
window.addEventListener('pagehide', () => {
    window.scrollTo({
        top: 0, 
        left: 0, 
        behavior: 'instant'
    })
})



//SECTION TITLE ANIMATION ONSCROLL
function sectionTitleReveal () {
    if(window.matchMedia('(max-width: 1000px)').matches) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target.querySelector('.section-title h2'), { opacity: 1, scale: 1, duration: 1.1});
                        gsap.to(entry.target.querySelector('.line'), { width: '15vw', delay: 1.2, duration: .8})
                    }
                })
            },
            {
                threshold: 0.1
            }
        )
        
        sections.forEach( section => {
            sectionObserver.observe(section);
        })
    }else {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target.querySelector('.section-title h2'), { opacity: 1, scale: 1, duration: 1.1});
                        gsap.to(entry.target.querySelector('.line'), { width: '7.8vw', delay: 1.2, duration: .8})
                    }
                })
            },
            {
                threshold: 0.7
            }
        )
        
        sections.forEach( section => {
            sectionObserver.observe(section);
        })
    }
}

sectionTitleReveal();