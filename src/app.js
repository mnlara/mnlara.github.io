const burgerButton = document.getElementById('burger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

burgerButton.addEventListener('click', toggleButton)