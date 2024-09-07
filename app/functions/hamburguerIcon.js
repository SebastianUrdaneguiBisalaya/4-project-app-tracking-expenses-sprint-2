export default function toggleSideBar() {
  const button = document.getElementById("iconHamburguer");
  const sideBar = document.querySelector(".container__sideBar");
  function toggle() {
    sideBar.classList.toggle("show");
  }
  button.addEventListener("click", (event) => {
    toggle();
    event.stopPropagation();
  });
  document.addEventListener("click", (event) => {
    const isClickInside = sideBar.contains(event.target);
    if (!isClickInside && window.innerWidth < 1000) {
      sideBar.classList.remove("show");
    }
  });
}
