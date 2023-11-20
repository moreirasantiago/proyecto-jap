document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("selectedCatID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("selectedCatID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("selectedCatID", 103);
    window.location = "products.html";
  });
});

function haSidoRedirigido() {
  return localStorage.getItem("redirigido") === "true";
}

if (!haSidoRedirigido()) {
  window.location.href = "login.html";
  localStorage.setItem("redirigido", "true");
}

// Verifica si estás en el index.html
const isIndexPage = window.location.pathname.includes("index.html");

const switchBtn = document.querySelector(".switch");
const div = document.querySelector("#dark-mode-div");
const cards = document.querySelectorAll(".card");
const cardsBody = document.querySelectorAll(".card-body");
const footer = document.querySelector("footer");
const foto = document.querySelector(".card-img-top");

const isDarkMode = localStorage.getItem("darkmode");

function enableDarkMode() {
  document.body.classList.toggle("dark-mode");
  foto.classList.toggle("dark-mode");
  footer.classList.toggle("dark-mode");
  div.classList.toggle("dark-mode");
  switchBtn.classList.toggle("active");

  cardsBody.forEach((cardsBody) => {
    cardsBody.classList.toggle("dark-mode");
  });

  cards.forEach((card) => {
    card.classList.toggle("dark-mode");
  });

  // Verifica si la imagen tiene la clase específica
  if (foto.classList.contains("dark-mode")) {
    // Cambia la fuente de la imagen para el modo oscuro
    foto.src = "/img/cover_back_invertido.png";
  } else {
    // Vuelve a la fuente original cuando estás en modo claro
    foto.src = "/img/cover_back.png";
  }

  localStorage.setItem(
    "darkmode",
    document.body.classList.contains("dark-mode").toString()
  );
}

if (isDarkMode === "true" && isIndexPage) {
  enableDarkMode();
}

switchBtn.addEventListener("click", () => {
  enableDarkMode();
});