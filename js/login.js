let div = document.querySelector(".container");
let htmlContentToAppend = "";

htmlContentToAppend += `
    <div id="contenedor">
        <div id="central">
        <div id="login">
            <div class="titulo">
                Bienvenido
            </div>
            <form id="loginform">
                <input type="text" name="usuario" placeholder="Usuario">
                
                <input type="password" placeholder="Contraseña" name="password">
                
                <button type="submit" title="Ingresar" name="Ingresar" id="btn">Ingresar</button>
            </form>
            <div class="pie-form">
                <a href="#">¿Perdiste tu contraseña?</a>
                <a href="#">¿No tienes Cuenta? Registrate</a>
            </div>
        </div>
        <div class="inferior">
            <a href="../index.html">Volver</a>
        </div>
        </div>
    </div>`;

div.innerHTML = htmlContentToAppend;

const form = document.getElementById("loginform");

const VALIDAR_ENVIO = (e) => {
  e.preventDefault();
  let usuarioInput = document.querySelector('input[name="usuario"]');
  let passwordInput = document.querySelector('input[name="password"]');

  if (usuarioInput.value.trim() === "" || passwordInput.value.trim() === "") {
    alert("El usuario y/o contraseña son incorrectos");
  } else {
    const username = usuarioInput.value.trim();
    localStorage.setItem("username", username);
    console.log("Nombre de usuario almacenado:", username);
    window.location.href = "../index.html";
}
};

form.addEventListener("submit", VALIDAR_ENVIO);

