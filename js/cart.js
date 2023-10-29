const urlcarrito = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let articuloscarrito;
let carrdef = JSON.parse(localStorage.getItem("mostrarcarritoLocal"));
    let idprod = localStorage.getItem("productId");
    let divcarrito = document.getElementById("mostrarcarrito");
    let carrdefArray = Object.values(carrdef);
    let prodcdup = 0;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(urlcarrito).then(function (result) {
    if (result.status === "ok") {
      articuloscarrito = result.data;
      console.log(articuloscarrito.articles[0].name);
      let divcarrito = document.getElementById("mostrarcarrito");
      let htmlcontent = `
        <div class="container align-items-center border"> 
          <div class="row text-center">
              <p class="col-2"><strong>Nombre</strong></p>
              <p class="col-2"><strong>Costo</strong></p>
              <p class="col-2"><strong>Cantidad</strong></p>
              <p class="col-2"><strong>Subtotal</strong></p>
          </div>
          <hr>
          <div class="row text-center">
              <p class="col-2">${articuloscarrito.articles[0].name}</p>
              <p class="col-2">$${articuloscarrito.articles[0].unitCost}</p>
              <input class="col-2 h-50 ms-5 especificaciones" style="width: 10%;" type="number" value="1" oninput="calcularSubtotalJSON(0)" id="cantproduc" required>
              <p class="col-2 ms-4" id="subtotal">$${articuloscarrito.articles[0].unitCost}</p>
              <div class="col-1 mb-2">
                  <img class="w-100" src="${articuloscarrito.articles[0].image}" alt="">
              </div>
              <div class="col-2 container align-center">
              <button type="button" class="ms-5 btn btn-outline border-danger float-end"><i class="fa-solid fa-trash" style="color: #ff0000"></i></i></button>
              </div>
          </div>
        `;
      divcarrito.innerHTML = htmlcontent;
    }

    let productosEnCarrito = {};

    for (let i = 0; i < carrdefArray.length; i++) {
        let producto = carrdefArray[i].producto;
        let id = producto.id;
        let cantt = 1;
    
        if (productosEnCarrito[id]) {
            
            productosEnCarrito[id].cantidad++;
            cantt++;
        } else {
          
            productosEnCarrito[id] = { producto, cantidad: 1 };

            if (productosEnCarrito[id].cantidad === 1) {
                let carritomostrar = `
                    <div id="id_productos_carrito${i}" class="container border">
                        <div class="row text-center">
                            <p class="col-2">${producto.nombre}</p>
                            <p class="col-2">$${producto.unitCost}</p>
                            <input class="col-2 h-50 ms-5 especificaciones" style="width: 10%;" type="number" value="1" oninput="calcularSubtotal(${i})" id="cantproduc${i}" required>                      
                            <p class="col-2 ms-4" id="subtotal${i}"><span class="totalsub">$${producto.unitCost * productosEnCarrito[id].cantidad}</span></p>
                            <div class="col-1 align-items-center">
                                <img class="w-100" src="${producto.imagen[0]}" alt="">
                            </div>
                            <div class="col-2 container align-center">
                                <button type="button" id="papelera${i}" class="ms-5 btn btn-outline border-danger float-end" onclick="borrardiv(${i})"><i class="fa-solid fa-trash" style="color: #ff0000"></i></i></button>
                            </div>
                        </div>
                    </div>
                `;

                divcarrito.innerHTML += carritomostrar;
            }
        }
    }

   calcularYMostrarTotalSubtotales();
  for (let i = 0; i < carrdefArray.length; i++) {
    
    const cantidadInput = document.getElementById(`cantproduc${i}`);
    cantidadInput.addEventListener('input', calcularYMostrarTotalSubtotales);
}

function calcularYMostrarTotalSubtotales() {
   let sumaSubtotales = 0;

   for (let i = 0; i < carrdefArray.length; i++) {
       let producto = carrdefArray[i].producto;
       let id = producto.id;
       let cantidadInput = document.getElementById(`cantproduc${i}`);
       let cantidad = parseInt(cantidadInput.value);

       if (!isNaN(cantidad)) {
           let subtotal = producto.unitCost * cantidad;
           sumaSubtotales += subtotal;
       }
   }

   if (document.getElementById("selecttipodeenvio").value === "premium") {
    let premiumsubtotal = sumaSubtotales*15/100;
    let elemnt = document.getElementById("sobtotalenvio");
    elemnt.textContent = premiumsubtotal;
    console.log(premiumsubtotal);
   } else if (document.getElementById("selecttipodeenvio").value === "expres") {
    let premiumsubtotal = sumaSubtotales*7/100;
    let elemnt = document.getElementById("sobtotalenvio");
    elemnt.textContent = premiumsubtotal;
    console.log(premiumsubtotal);
   }else if (document.getElementById("selecttipodeenvio").value === "standar") {
    let premiumsubtotal = sumaSubtotales*5/100;
    let elemnt = document.getElementById("sobtotalenvio");
    elemnt.textContent = premiumsubtotal;
    console.log(premiumsubtotal);
   }

   let elementoTotalSubtotales = document.getElementById("totaldesubtotales");
   elementoTotalSubtotales.textContent = 'Total: $' + sumaSubtotales;
}  
  }) 

 });


 function calcularSubtotal(index) {
    let cantidadInput = document.getElementById(`cantproduc${index}`);
    let subtotalElement = document.getElementById(`subtotal${index}`);
    let costoUnitario = carrdefArray[index].producto.unitCost;
    let cantidad = parseInt(cantidadInput.value);

    if (!isNaN(cantidad)) {
        subtotalElement.textContent = `$${costoUnitario * cantidad}`;
    }
}

function calcularSubtotalJSON(articuloIndex) {
    const cantproducInput = document.getElementById("cantproduc");
    const subtotalElement = document.getElementById("subtotal");
  if (articuloscarrito) {
    
    const cantidad = parseFloat(cantproducInput.value);
    const unitCost = parseFloat(articuloscarrito.articles[articuloIndex].unitCost);
    const subtotal = unitCost * cantidad;
    subtotalElement.textContent = `$${subtotal}`;
  }}

 let terxtformapago = document.getElementById("modaltext");

function opcionselec(selecc) {
    if (selecc === 'tarjeta') {
        terxtformapago.textContent = "Tarjeta de credito";
        document.getElementById("numCuenta").disabled = true; 
        document.getElementById("numero").disabled = false;
        document.getElementById("codigoSeg").disabled = false;
        document.getElementById("Vencimiento").disabled = false;
    } else if (selecc === 'transferencia') {
        terxtformapago.textContent = "Transferencia Bancaria";
        document.getElementById("numCuenta").disabled = false;
        document.getElementById("numero").disabled = true;
        document.getElementById("codigoSeg").disabled = true;
        document.getElementById("Vencimiento").disabled = true;
    }
}
let totalsub = document.getElementsByClassName('totalsub');

function borrardiv(numero) {
    const botonPapelera = document.getElementById(`papelera${numero}`);
    const divPadre = botonPapelera.closest('div.container.border');

    if (divPadre) {
        const numeroElemento = botonPapelera.id.replace('papelera', '');

        localStorage.setItem(`elementoEliminado${numeroElemento}`, 'eliminado');

        const elementoContenedor = document.getElementById(`id_productos_carrito${numeroElemento}`);
        if (elementoContenedor) {
            elementoContenedor.style.display = 'none';
        }
    }
}

function validcompras() {
    const calle = document.getElementById("calle");
    const numero = document.getElementById("num");
    const esquina = document.getElementById("esquina");
    const tipoEnvio = document.getElementById("selecttipodeenvio");

    if ((!calle.value || !numero.value || !esquina.value) || (tipoEnvio.value === "")) {
        
        if ((document.getElementById("modaltext").textContent === "No ha seleccionado")) {
            
            alert("Porfavor seleccione una forma de pago");
      
        }
        calle.classList.add("is-invalid");
        esquina.classList.add("is-invalid");
        numero.classList.add("is-invalid");
        tipoEnvio.classList.add("is-invalid");
       
    } else {
        calle.classList.remove("is-invalid");
        esquina.classList.remove("is-invalid");
        numero.classList.remove("is-invalid");
        tipoEnvio.classList.remove("is-invalid");

    const mensaje = document.getElementById("comprarealiz");
    mensaje.textContent = "Compra realizada con exito";
    mensaje.classList.remove("d-none");
        
    setTimeout(function () {
         mensaje.classList.add("d-none");
    }, 1700);
        
    }

}

