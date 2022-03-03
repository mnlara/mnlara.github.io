const topArrow = document.querySelector(".top-arrow");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        topArrow.classList.add("active");
    } else {
        topArrow.classList.remove("active");
    }
})