// Get the navigation bar element
const navbar = document.querySelector('.navbar');

// Add scroll event listener to change the background color of navbar
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
