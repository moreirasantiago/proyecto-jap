const usernameElement = document.getElementById("username");
const storedUsername = localStorage.getItem("username");
const logoutButton = document.getElementById("logout");
const userIcon = "fas fa-user";

// USERNAME + ÍCONO

if (storedUsername) {
  usernameElement.innerHTML =
    `<i class="${userIcon}"></i>` + " " + storedUsername;
}

// BOTÓN CERRAR SESIÓN

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    const confirmed = window.confirm("¿Estás seguro de cerrar sesión?");
    if (confirmed) {
      localStorage.removeItem("username");
      window.location.href = "./login.html";
    }
  });
}
