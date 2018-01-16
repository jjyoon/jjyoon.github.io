const menuButton = document.querySelector('.c-nav__menu-button')
const whiteMenuButton = document.querySelector('.c-nav__menu-button--white-bg')
const menu = document.querySelector('.c-nav__menu')
const video = document.querySelector('video')

toggleOpen = () => {
    menu.classList.toggle('is-hidden');
}

document.addEventListener("click", function(e) {
   if ( e.target == menuButton || e.target == whiteMenuButton ) {
       toggleOpen();
   } else if (e.target != menuButton || e.target != whiteMenuButton ) {
       menu.classList.add('is-hidden');
   }
});

if (video) {
    video.addEventListener('click', function () {
        video.play();
    }, false);
}
