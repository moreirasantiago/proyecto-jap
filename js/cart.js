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
                                <button type="button" id="papelera${i}" class="ms-5 btn btn-outline border-danger float-end"><i class="fa-solid fa-trash" style="color: #ff0000"></i></i></button>
                            </div>
                        </div>
                    </div>
                `;

                divcarrito.innerHTML += carritomostrar;
            }
        }
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



function opcionselec(selecc) {
    if (selecc === 'tarjeta') {
        document.getElementById("modaltext").textContent = "Tarjeta de credito";
        document.getElementById("numCuenta").disabled = true; 
        document.getElementById("numero").disabled = false;
        document.getElementById("codigoSeg").disabled = false;
        document.getElementById("Vencimiento").disabled = false;
    } else if (selecc === 'transferencia') {
        document.getElementById("modaltext").textContent = "Transferencia Bancaria";
        document.getElementById("numCuenta").disabled = false;
        document.getElementById("numero").disabled = true;
        document.getElementById("codigoSeg").disabled = true;
        document.getElementById("Vencimiento").disabled = true;
    }
}
let totalsub = document.getElementsByClassName('totalsub');
function calsubtotal(){
    
    let total = 0;

    for (let i=0; i<totalsub.length;i++){
        total = total+totalsub[i].value;
    }
}