document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("username")) {
        window.location.href = "login.html"
    }

    if (!localStorage.getItem("imagenPerfil")) {
        this.getElementById("perfil-imagen").src = "img/img_perfil.png";
    } else{
        localStorage.getItem("imagenPerfil").src = localStorage.getItem("imagenPerfil");
    }

})

// Validaciones perfil

document.getElementById("validmail").value = localStorage.getItem("username");
document.getElementById("validname").value = localStorage.getItem("nameperfil");
document.getElementById("validapp").value = localStorage.getItem("appperfil");
document.getElementById("validsegapp").value = localStorage.getItem("segapp");
document.getElementById("validsegnom").value = localStorage.getItem("segnom");
document.getElementById("validtel").value = localStorage.getItem("tel");

function validcamposperfil() {
    
    if (!document.getElementById("validname").value) {
        document.getElementById("validname").classList.add("is-invalid")
    }else{
        localStorage.setItem("nameperfil", document.getElementById("validname").value);
    }

    if (!document.getElementById("validapp").value) {
        document.getElementById("validapp").classList.add("is-invalid")
    }else{
        localStorage.setItem("appperfil", document.getElementById("validapp").value);
    }
    if (!document.getElementById("validmail").value) {
        document.getElementById("validmail").classList.add("is-invalid") 
    }else{
        localStorage.setItem("username", document.getElementById("validmail").value)
    }
    
    localStorage.setItem("segapp", document.getElementById("validsegapp").value)
    localStorage.setItem("segnom", document.getElementById("validsegnom").value)
    localStorage.setItem("tel", document.getElementById("validtel").value)

 }    
    
// Funcion para guardar imagen perfil


function guardarImagenLS() {
    let perfilImagen = document.getElementById("perfil-imagen");
    if (perfilImagen.src !== 'img/img_perfil.png'){
        localStorage.setItem('imagenPerfil', perfilImagen.src)
    }
}

let imagenGuardada = localStorage.getItem('imagenPerfil')
if (imagenGuardada) {
    let perfilImagen = document.getElementById('perfil-imagen')
    perfilImagen.src = imagenGuardada
}

document.getElementById('formFile').addEventListener('change', function() {
    let formFileInput = document.getElementById('formFile');
    let perfilImagen = document.getElementById('perfil-imagen');

    if (formFileInput.files && formFileInput.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
            perfilImagen.src = e.target.result;
        };

        reader.readAsDataURL(formFileInput.files[0]);

}
});
