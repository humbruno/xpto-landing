let btn = document.querySelector(".hamburgerMenu");
let sidebar = document.querySelector(".sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
