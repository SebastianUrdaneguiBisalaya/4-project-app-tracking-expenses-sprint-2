export function toggleSideBar() {
  const button = document.getElementById("iconHamburguer");
  const sideBar = document.querySelector(".container__sideBar");
  button.addEventListener("click", (event) => {
    sideBar.classList.toggle("show");
    event.stopPropagation();
  });
  document.addEventListener("click", (event) => {
    const isClickInside = sideBar.contains(event.target);
    if (!isClickInside && window.innerWidth < 1000) {
      sideBar.classList.remove("show");
    }
  });
}
