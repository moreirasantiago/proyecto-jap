document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});

function haSidoRedirigido() {
  return localStorage.getItem("redirigido") === "true";
}

if (!haSidoRedirigido()) {
  window.location.href = "../login.html";
  localStorage.setItem("redirigido", "true");
}

// Funcionalidad DARKMODE

const switchBtn = document.querySelector(".switch");
const div = document.querySelector("#dark-mode-div");
const cards = document.querySelectorAll(".card");
const footer = document.querySelector("footer");

const isDarkMode = localStorage.getItem("darkmode");

function enableDarkMode() {
  document.body.classList.toggle("dark-mode");
  footer.classList.toggle("bg-dark");
  div.classList.toggle("bg-dark");
  switchBtn.classList.toggle("active");

  cards.forEach((card) => {
    card.classList.toggle("bg-dark");
    card.classList.toggle("text-light");
  });

  localStorage.setItem(
    "darkmode",
    document.body.classList.contains("dark-mode").toString()
  );
}

if (isDarkMode === "true") {
  enableDarkMode();
}

switchBtn.addEventListener("click", () => {
  enableDarkMode();
});
