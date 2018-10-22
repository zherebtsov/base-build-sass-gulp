var mainNav = document.querySelector('.main-nav');
var toggleNav = document.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav--no-js');
toggleNav.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--close')) {
    mainNav.classList.remove('main-nav--close');
    mainNav.classList.add('main-nav--open');
  } else {
    mainNav.classList.remove('main-nav--open');
    mainNav.classList.add('main-nav--close');
  }
});
