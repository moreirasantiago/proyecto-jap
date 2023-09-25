const usernameElement = document.getElementById("username");
const storedUsername = localStorage.getItem("username");

if (storedUsername) {
  usernameElement.textContent = storedUsername;
}