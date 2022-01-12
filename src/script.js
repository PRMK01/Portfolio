const navBar = document.querySelector('.navigation');
const perks = document.querySelectorAll('.perk img');
const columns = document.querySelectorAll('.column');
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');
const logo = document.querySelector('.logo');
const arrows = document.querySelectorAll('.arrow-recktangle');
const rollOutContent = document.querySelectorAll('.roll-out-content');
const aboutText = document.querySelector('.about-text-wrapper');


// SKILLS SECTION BEHAVIOR.... //

perks.forEach(perk => {
    perk.addEventListener('mouseover', () => {
        perk.nextElementSibling.style.opacity = '1';
        perk.nextElementSibling.style.transform = 'translateY(8px)';
    });
    perk.addEventListener('mouseout', () => {
        perk.nextElementSibling.style.opacity = '0';
        perk.nextElementSibling.style.transform = 'translateY(-7px)';

    });
})

columns.forEach(column => {
    column.addEventListener('mouseover', () => {
        column.children[0].style.top = '-62px';
    });
    column.addEventListener('mouseout', () => {
        column.children[0].style.top = '0';
    });
})

// CURSOR FUNCTION.... //
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

// links.forEach(link => {
//     link.addEventListener('mouseenter', () => {
//         cursor.style.mixBlendMode = 'difference';
//         cursor.style.width = '16px';
//         cursor.style.height = '16px';
//         cursor.style.background = '#ffffff';
//     })
//     link.addEventListener('mouseleave', () => {
//         cursor.style.mixBlendMode = 'normal';
//         cursor.style.width = '12px';
//         cursor.style.height = '12px';
//         cursor.style.background = '#3f6cff';
//     })
// })


//ROLL-OUT SECTION BEHAVIOR
let x = 0;

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.classList.contains('arrow-animation-1')) {
            x--;
            arrow.classList.remove('arrow-animation-1');
            arrow.classList.add('arrow-animation-2');
            setTimeout(() => {
                arrow.nextElementSibling.classList.remove('roll-out-content-animation-1');
                arrow.nextElementSibling.classList.add('roll-out-content-animation-2');
            }, 1000)
        } else {
            x++;
            arrow.classList.remove('arrow-animation-2');
            arrow.classList.add('arrow-animation-1');
            setTimeout(() => {
                arrow.nextElementSibling.classList.remove('roll-out-content-animation-2');
                arrow.nextElementSibling.classList.add('roll-out-content-animation-1');
            }, 2000)
        }
        if (x > 0) {
            setTimeout(() => {
                aboutText.classList.remove('about-text-animation-2');
                aboutText.classList.add('about-text-animation-1');
            }, 1100)
        } else {
            setTimeout(() => {
                aboutText.classList.remove('about-text-animation-1');
                aboutText.classList.add('about-text-animation-2');
            }, 1150)
        }
    })
})



// NAVIGATION ON SCROLL FUNCTION....  (to make it fully work, change position on .Navigation to fixed)
// let anchorClicked = false;
// let logoClicked = false;
// let currentScroll = window.scrollY;

// document.addEventListener('scroll', e => {
//     if (anchorClicked) {
//         return
//     } else {
//         if(window.scrollY > currentScroll) {
//             navBar.style.opacity = '0';
//             navBar.style.pointerEvents = 'none';
//         } else {
//             navBar.style.opacity = '1';
//             navBar.style.pointerEvents = 'auto';
//         }
//         currentScroll = window.scrollY;
//     }
// })

// logo.addEventListener('click', () => {
//     logoClicked = true;
//     setTimeout(() => {logoClicked = false}, 200)
// })

// links.forEach(link => {
//     link.addEventListener('click', () => {
//         if (logoClicked) {
//             return
//         } else {
//             anchorClicked = true;
//             navBar.style.opacity = '0';
//             navBar.style.pointerEvents = 'none';    
//             setTimeout(() => {anchorClicked = false}, 800)
//         }
//     })
// }) 