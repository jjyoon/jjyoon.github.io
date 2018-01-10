const menuButton = document.querySelector('.c-nav__menu-button')
const whiteMenuButton = document.querySelector('.c-nav__menu-button--white-bg')
const menu = document.querySelector('.c-nav__menu')

toggleOpen = () => {
    menu.classList.toggle('is-hidden');
}

if (menuButton) {
    menuButton.addEventListener("click", toggleOpen);
} else {
    whiteMenuButton.addEventListener("click", toggleOpen);
}
