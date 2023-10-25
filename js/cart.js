const urlcarrito = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let articuloscarrito;

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
              <input class="col-2 h-50 ms-5 especificaciones" style="width: 10%;" type="number" value="1" oninput="calcularSubtotal(0)" id="cantproduc" required>
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
    
    let carrdef = JSON.parse(localStorage.getItem("mostrarcarritoLocal"));
    let idprod = localStorage.getItem("productId");
    let divcarrito = document.getElementById("mostrarcarrito");
    let carrdefArray = Object.values(carrdef);
    let prodcdup = 0;
    console.log(carrdefArray);  

    // for (let i = 0; i < carrdefArray.length; i++) {
    //   for (let j = 1; j > carrdefArray.length; j++) {
    //  const productoExiste =  carrdefArray.find((producto) => producto[j].id === producto[i].id); 

/*      for (let i = 0; i < carrdefArray.length; i++) {
      const productoActual = carrdefArray[i];
      const productoExiste = carrdefArray.find((producto) => producto.id === productoActual.id);
    
      if (productoExiste !== productoActual) {
        // Aquí, productoExiste contiene un producto con el mismo ID, por lo que es un duplicado.
        prodcdup++;
        
        // Realiza la lógica que desees para manejar los duplicados.
      }
      console.log(prodcdup);
    } */

    for (let i = 0; i < carrdefArray.length; i++) {
     let proddd = carrdefArray[i].producto;
     let carritomostrar = `
     <div class="container border">
     <div class="row text-center">
     <p class="col-2">${proddd.nombre}</p>
     <p class="col-2">$${proddd.unitCost}</p>
     <input class="col-2 h-50 ms-5 especificaciones" style="width: 10%;" type="number" value="1" oninput="calcularSubtotalcarrito(0)" id="cantproduc${i}" required>
     <p class="col-2 ms-4" id="subtotal${i}">$${proddd.unitCost}</p>
     <div class="col-1 align-items-center">
     <img class="w-100" src="${proddd.imagen[0]}" alt="">
     </div>
     <div class="col-2 container align-center">
              <button type="button" class="ms-5 btn btn-outline border-danger float-end"><i class="fa-solid fa-trash" style="color: #ff0000"></i></i></button>
    </div>
     </div>   
     </div>
     `;
     
     divcarrito.innerHTML += carritomostrar;
    }
    }  
)
 });

 function calcularSubtotalcarrito(carrdefArray) {
  for (let i = 0; i < carrdefArray.length; i++) {
    const cantproducInput = document.getElementById(`cantproduc${i}`);
    const subtotalElement = document.getElementById("subtotal");
    const cantidad = parseFloat(cantproducInput.value);
    const unitCost = parseFloat(carrdefArray.producto.unitCost);
    const subtotal = unitCost * cantidad;
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }
}

function calcularSubtotal(articuloIndex) {
  if (articuloscarrito) {
    const cantproducInput = document.getElementById("cantproduc");
    const subtotalElement = document.getElementById("subtotal");
    const cantidad = parseFloat(cantproducInput.value);
    const unitCost = parseFloat(articuloscarrito.articles[articuloIndex].unitCost);
    const subtotal = unitCost * cantidad;
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }
}
