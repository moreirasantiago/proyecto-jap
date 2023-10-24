function seleccionProducto(id) {
  localStorage.setItem("productId", id);
  location.reload();
}

document.addEventListener("DOMContentLoaded", function (e) {
  const idProductoSeleccionado = localStorage.getItem("productId");

  if (!idProductoSeleccionado) {
    console.error("No se ha seleccionado ningún producto.");
    return;
  }
  const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${idProductoSeleccionado}.json`;

  const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProductoSeleccionado}.json`;

  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      const currentProduct = resultObj.data;
      mostrarDatosDelProducto(currentProduct);

    let carritoLocal = localStorage.getItem("carritoLocal");
  
    carritoLocal = JSON.parse(carritoLocal);

    carritoLocal = {};
    
    const id = idProductoSeleccionado;

    carritoLocal[id] = {
      id: idProductoSeleccionado,
      nombre: currentProduct.name,
      unitCost: currentProduct.cost,
      imagen: currentProduct.images,
    };
  
    localStorage.setItem("carritoLocal", JSON.stringify(carritoLocal));

      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (commentsResultObj) {
        if (commentsResultObj.status === "ok") {
          const comments = commentsResultObj.data;
          mostrarTodosLosComentarios();
        }
      });
    }
  });
});

let htmlContentToAppend = "";

function mostrarDatosDelProducto(currentProduct) {

  if (localStorage.getItem("selectedCatID") == 101 || localStorage.getItem("selectedCatID") == 105) {
    
    let htmlContentToAppend = `
        <div class="row">
          <div class="container col-6">
            <h2 class="product-name mt-4 mb-1">${currentProduct.name}</h2>
          </div>
          <div class="container col-6 text-end mt-4">
            <button type="button" class="btn btn-success" onclick="carritoloc()">Comprar</button>
          </div>
        </div>
        <hr>
        <div>
          <div>
            <h5 class="product-detail">Precio</h5>
            <p>USD ${currentProduct.cost}</p>
          </div>
          <div class="product-sub">
            <h5 class="product-detail">Descripción</h5>
            <p>${currentProduct.description}</p>
          </div>
          <div class="product-sub">
            <h5 class="product-detail">Categoría</h5>
            <p>${currentProduct.category}</p>
          </div>
          <div class="product-sub">
            <h5 class="product-detail">Cantidad de vendidos</h5>
            <p>${currentProduct.soldCount}</p>
          </div>
        </div>
      `;
      htmlContentToAppend += `
      <h5 class="product-sub product-detail">Imágenes ilustrativas</h5>
        <div class="col-md-6 mx-auto">
          <div id="productImageSlider" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
      `;
  
    for (let i = 0; i < currentProduct.images.length; i++) {
      htmlContentToAppend += `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${
                  currentProduct.images[i]
                }" class="d-block w-100" alt="Imagen ilustrativa ${i + 1}">
              </div>`;
    }
  
    htmlContentToAppend += `
            </div>
            <a class="carousel-control-prev" href="#productImageSlider" role="button" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#productImageSlider" role="button" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      `;
    htmlContentToAppend += `
      <div class="col-md-12 mt-4">
        <h5 class="product-sub product-detail">Productos relacionados</h5>
        <div class="row">
    `;
  
    currentProduct.relatedProducts.forEach((relatedProduct) => {
      htmlContentToAppend += `
      <div onclick="seleccionProducto(${relatedProduct.id})" class="col-md-2 cursor-active">
          <div class="card mb-4">
            <img src="${relatedProduct.image}" class="img-thumbnail" alt="${relatedProduct.name}">
            <div class="card-body">
              <h5 class="card-title">${relatedProduct.name}</h5>
            </div>
          </div>
        </div>`;
    });
  
    htmlContentToAppend += `
        </div>
      </div>
    `;
    let contenedorProduct = document.getElementById("container");
    contenedorProduct.innerHTML = htmlContentToAppend;
  }else {

    let htmlContentToAppend = `
      <div class="row">
        <div class="container col-6">
          <h2 class="product-name mt-4 mb-1">${currentProduct.name}</h2>
        </div>
        <div class="container col-6 text-end mt-4">
          <button type="button" class="btn btn-success" onclick="carritoloc()">Comprar</button>
        </div>
      </div>
      <hr>
      <div>
        <div>
          <h5 class="product-detail">Precio</h5>
          <p>UYU ${currentProduct.cost}</p>
        </div>
        <div class="product-sub">
          <h5 class="product-detail">Descripción</h5>
          <p>${currentProduct.description}</p>
        </div>
        <div class="product-sub">
          <h5 class="product-detail">Categoría</h5>
          <p>${currentProduct.category}</p>
        </div>
        <div class="product-sub">
          <h5 class="product-detail">Cantidad de vendidos</h5>
          <p>${currentProduct.soldCount}</p>
        </div>
      </div>
    `;

    htmlContentToAppend += `
      <h5 class="product-sub product-detail">Imágenes ilustrativas</h5>
        <div class="col-md-6 mx-auto">
          <div id="productImageSlider" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
      `;
  
    for (let i = 0; i < currentProduct.images.length; i++) {
      htmlContentToAppend += `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${
                  currentProduct.images[i]
                }" class="d-block w-100" alt="Imagen ilustrativa ${i + 1}">
              </div>`;
    }
  
    htmlContentToAppend += `
            </div>
            <a class="carousel-control-prev" href="#productImageSlider" role="button" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#productImageSlider" role="button" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      `;
    htmlContentToAppend += `
      <div class="col-md-12 mt-4">
        <h5 class="product-sub product-detail">Productos relacionados</h5>
        <div class="row">
    `;
  
    currentProduct.relatedProducts.forEach((relatedProduct) => {
      htmlContentToAppend += `
      <div onclick="seleccionProducto(${relatedProduct.id})" class="col-md-2 cursor-active">
          <div class="card mb-4">
            <img src="${relatedProduct.image}" class="img-thumbnail" alt="${relatedProduct.name}">
            <div class="card-body">
              <h5 class="card-title">${relatedProduct.name}</h5>
            </div>
          </div>
        </div>`;
    });
  
    htmlContentToAppend += `
        </div>
      </div>
    `;
    let contenedorProduct = document.getElementById("container");
    contenedorProduct.innerHTML = htmlContentToAppend;
  }
  }

  function carritoloc() {

    let mostrarcarritoLocal = localStorage.getItem("mostrarcarritoLocal");
  
    if (!mostrarcarritoLocal) {
      mostrarcarritoLocal = {};
    } else {
      mostrarcarritoLocal = JSON.parse(mostrarcarritoLocal);
    }
  
    const id = Date.now().toString();
    mostrarcarritoLocal[id] = {
      producto: JSON.parse(localStorage.getItem("carritoLocal")),
    };
  
    localStorage.setItem("mostrarcarritoLocal", JSON.stringify(mostrarcarritoLocal));
  }

  /* function carritoloc() {

    let mostrarcarritoLocal = localStorage.getItem("carritoLocal");

    if (!mostrarcarritoLocal) {
      mostrarcarritoLocal = {}
    } else {
      mostrarcarritoLocal = JSON.parse(mostrarcarritoLocal);
    }

    console.log(mostrarcarritoLocal);

    localStorage.setItem("mostrarcarritoLocal", JSON.stringify(mostrarcarritoLocal));

  } */

function mostrarComentarios(comments) {
  let htmlContentToAppend = `
      <div class="table-responsive container">
        <p class="container mt-5 comment-title">Comentarios</p>
        <table class="table table-bordered comentarios-table">
          <tbody>
    `;

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    if (comment.id === localStorage.getItem("productId") || !comment.id) {
      htmlContentToAppend += `
          <tr>
            <td>
              <div class="comment">
                <p><span class="comment-name">${comment.user}</span> - ${
        comment.dateTime
      } - <span class="rating">${puntuacion(comment.score)}</span></p>
                <p class="text">${comment.description}</p>
              </div>
            </td>
          </tr>
        `;
    }
  }

  htmlContentToAppend += `
        </tbody>
      </table>
    </div>
    `;

  let comentariosContainer = document.getElementById("comentarios-container");
  comentariosContainer.innerHTML = htmlContentToAppend;

  agregarControlesDeComentario();
}

function puntuacion(score) {
  const maxPuntuacion = 4;
  let estrella = "";
  for (let i = 0; i <= maxPuntuacion; i++) {
    if (i <= score) {
      estrella += '<span class="fa fa-star checked"></span>';
    } else {
      estrella += '<span class="fa fa-star"></span>';
    }
  }
  return estrella;
}

function agregarControlesDeComentario() {
  const comentariosContainer = document.getElementById("comentarios-container");

  let htmlContentToAppend = `
    <div class="container col-md-8">
      <label for="customRange2" class="form-label">Danos tu opinión:</label>
      <label for="customRange2" class="form-label" id="rating-label">1</label>
      <label for="customRange2" class="form-label" id="rating-label"><span class="fa fa-star checked"></span></label>
      <input id="rating-select" value="0" type="range" class="form-range" min="0" max="4" id="customRange2" oninput="document.getElementById('rating-label').textContent = parseInt(this.value) + 1;">
      <div class="form-group">
        <textarea class="form-control form-control-lg" id="comment-text" rows="4" placeholder="Escribe tu comentario..."></textarea>
      </div>
    </div>
      <div class="container mt-3 d-grid gap-2 col-2 mx-auto">
        <button class="btn btn-primary" id="submit-comment">Enviar</button>
      </div>
    `;

  comentariosContainer.innerHTML += htmlContentToAppend;

  const submitButton = document.getElementById("submit-comment");
  submitButton.addEventListener("click", agregarComentarioYActualizar);
}

function agregarComentarioYActualizar() {
  const commentText = document.getElementById("comment-text").value;
  const rating = document.getElementById("rating-select").value;

  const fechacoment = new Date().toISOString().slice(0, 19).replace("T", " ");

  const newComment = {
    id: localStorage.getItem("productId"),
    user: localStorage.getItem("username"),
    dateTime: fechacoment,
    score: parseInt(rating),
    description: commentText,
  };

  let userComments = JSON.parse(localStorage.getItem("userComments")) || [];

  userComments.unshift(newComment);

  localStorage.setItem("userComments", JSON.stringify(userComments));
  mostrarTodosLosComentarios();

  document.getElementById("comment-text").value = "";
  document.getElementById("rating-select").value = "1";
}

function mostrarTodosLosComentarios() {
  let userComments = JSON.parse(localStorage.getItem("userComments")) || [];

  comentariosJson().then(function (existingComments) {
    let allComments = userComments.concat(existingComments);

    allComments.sort(function (a, b) {
      return new Date(b.dateTime) - new Date(a.dateTime);
    });

    mostrarComentarios(allComments);
  });
}

function comentariosJson() {
  const idProductoSeleccionado = localStorage.getItem("productId");

  const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProductoSeleccionado}.json`;
  return getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (
    commentsResultObj
  ) {
    if (commentsResultObj.status === "ok") {
      return commentsResultObj.data;
    } else {
      console.error("Error al obtener los comentarios del JSON.");
      return [];
    }
  });
}
