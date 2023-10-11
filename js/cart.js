const urlcarrito =  `https://japceibal.github.io/emercado-api/user_cart/25801.json`; 

document.addEventListener("DOMContentLoaded", function (e) { 
    let articuloscarrito; 
    let divcarrito = document.getElementById("mostrarcarrito"); 
 
    getJSONData(urlcarrito).then(function (result) { 
        if (result.status === "ok") { 
            articuloscarrito = result.data; 
            createCartTable(); 
        } 
    }).catch(function(error) { 
        console.error(error); 
    }); 
 
    function createCartTable() { 
        let htmlcontent =   
        `<div class="container align-items-center"> 
                <hr> 
                <div class="row text-center"> 
                    <p class="col-2"><strong>Nombre</strong></p> 
                    <p class="col-2"><strong>Costo</strong></p> 
                    <p class="col-2"><strong>Cantidad</strong></p> 
                    <p class="col-2"><strong>Subtotal</strong></p> 
                </div> `
         ; 
        let subtotal = 0; 
 
        for (let i = 0; i < articuloscarrito.articles.length; i++) { 
            let article = articuloscarrito.articles[i]; 
            let articleSubtotal = article.unitCost * article.count; 
            subtotal += articleSubtotal; 
 
            htmlcontent +=   
            `<div class="row text-center"> 
                    <p class="col-2">${article.name}</p> 
                    <p class="col-2">${article.unitCost}</p> 
                    <input class="col-2 h-50 ms-5 especificaciones cantidad" style="width: 10%;" type="number" value="${article.count}" placeholder="Cant" required> 
                    <p class="col-2 ms-4"><strong>${articleSubtotal}</strong></p> 
                    <div class="col-1"> 
                        <img class="w-100" src="${article.image}" alt=""> 
                    </div> 
                </div> `
             ; 
        } 
 
        htmlcontent +=   
        `<div class="row text-center"> 
                <p class="col-8"><strong>Total</strong></p> 
                <p class="col-2 ms-4"><strong>${subtotal}</strong></p> 
            </div> 
            <hr> 
            </div>` 
         ; 
 
        divcarrito.innerHTML = htmlcontent; 
 
        let cantidadInputs = document.getElementsByClassName("cantidad"); 
        for (let i = 0; i < cantidadInputs.length; i++) { 
            cantidadInputs[i].addEventListener("input", function() { 
                let article = articuloscarrito.articles[i]; 
                let articleSubtotal = article.unitCost * this.value; 
                let subtotalElement = this.parentElement.nextElementSibling.nextElementSibling; 
                subtotalElement.innerHTML =  `<strong>${articleSubtotal}</strong>` ; 
                updateTotal(); 
            }); 
        } 
 
        function updateTotal() { 
            let subtotalElements = document.querySelectorAll("#mostrarcarrito strong:nth-of-type(2)"); 
            let subtotal = 0; 
            for (let i = 0; i < subtotalElements.length; i++) { 
                subtotal += parseInt(subtotalElements[i].textContent); 
            } 
            document.querySelector("#mostrarcarrito strong:last-of-type").textContent = subtotal; 
        } 
    } 
});