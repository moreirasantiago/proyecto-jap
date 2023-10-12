const urlcarrito = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let articuloscarrito;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(urlcarrito).then(function (result) {
    if (result.status === "ok") {
      articuloscarrito = result.data;
      console.log(articuloscarrito.articles[0].name);
      let divcarrito = document.getElementById("mostrarcarrito");
      let htmlcontent = `
        <div class="container align-items-center"> 
          <hr>
          <div class="row text-center">
              <p class="col-2"><strong>Nombre</strong></p>
              <p class="col-2"><strong>Costo</strong></p>
              <p class="col-2"><strong>Cantidad</strong></p>
              <p class="col-2"><strong>Subtotal</strong></p>
          </div>
          <div class="row text-center">
              <p class="col-2">${articuloscarrito.articles[0].name}</p>
              <p class="col-2">$${articuloscarrito.articles[0].unitCost}</p>
              <input class="col-2 h-50 ms-5 especificaciones" style="width: 10%;" type="number" value="1" oninput="calcularSubtotal(0)" id="cantproduc" required>
              <p class="col-2 ms-4" id="subtotal">$${articuloscarrito.articles[0].unitCost}</p>
              <div class="col-1">
                  <img class="w-100" src="${articuloscarrito.articles[0].image}" alt="">
              </div>
          </div>
          <hr>
        </div> `;
      divcarrito.innerHTML = htmlcontent;
    }
  });
});

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
