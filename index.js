const ancient = document.querySelectorAll(".ancient");
const closeButtons = document.querySelectorAll(".close");

ancient.forEach((el, index) => {
    el.addEventListener("click", function zoomAncient(e) {
        if (!e.target.classList.contains("close")) {
            ancient.forEach((el) => el.classList.remove("chosen"));
            ancient[index].classList.add("chosen");

            ancient.forEach((el) => el.classList.add("inactive"));
            ancient[index].classList.remove("inactive");

            closeButtons.forEach((el) => el.classList.add("close-hidden"));
            closeButtons[index].classList.remove("close-hidden");
            console.log(ancient[index]);
        }
    });
})

closeButtons.forEach((el, index) => {
    el.addEventListener("click", function (e) {
        ancient.forEach((el) => el.classList.remove("chosen"));
        ancient.forEach((el) => el.classList.remove("inactive"));
        closeButtons[index].classList.add("close-hidden");
    })
})
