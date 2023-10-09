const selectedCatID = localStorage.getItem("selectedCatID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${selectedCatID}.json`;
const ORDER_ASC_BY_COST = "Mayor precio";
const ORDER_DESC_BY_COST = "Menos precio";
const ORDER_BY_PROD_RELEVANCY = "Cant.";
let currProducsArray = [];
let currentSortCrit = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criterio, array) {
  let result = [];
  if (criterio === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_BY_PROD_RELEVANCY) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);
      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
const div = document.getElementById("arraycontainer");

function seleccionProducto(id){
  localStorage.setItem("productId", id);
  window.location= "product-info.html";
};

function showData() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currProducsArray.length; i++) {
    let product = currProducsArray[i];

    if (
      (minCost == undefined ||
        (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      (maxCost == undefined ||
        (maxCost != undefined && parseInt(product.cost) <= maxCost))
    ) {
      htmlContentToAppend += `
            <div onclick="seleccionProducto(${product.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
              <div class="col-md-12 col-lg-2">
                <img src="${product.image}" class="img-thumbnail">
              </div>
            <div class="col">
              <div class="d-flex w-100 justify-content-between ">
                <h4 class="mb-1">${product.name} - USD ${product.cost}</h4>
                    <small class="especificaciones">${product.soldCount} Vendidos</small>
              </div>
                  <p class="especificaciones">${product.description}</p>
              </div>
            </div>
          </div>`;
    }

    div.innerHTML = htmlContentToAppend;
  }
}

function sortandshowProducts(sortCriterio, categoriesArray) {
  currentSortCrit = sortCriterio;

  if (categoriesArray != undefined) {
    currProducsArray = categoriesArray;
  }

  currProducsArray = sortProducts(currentSortCrit, currProducsArray);

  showData();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(DATA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currProducsArray = resultObj.data.products;
      showData();
    }
  });

  const sortAsc = document.getElementById("sortAsc");
  const sortDesc = document.getElementById("sortDesc");
  const sortbyCount = document.getElementById("sortByCount");
  const clear = document.getElementById("clearRangeFilter");
  const FilterCount = document.getElementById("rangeFilterCount");
  const userInput = document.getElementById("userInputFilter");

  sortAsc.addEventListener("click", function () {
    sortandshowProducts(ORDER_ASC_BY_COST);
  });

  sortDesc.addEventListener("click", function () {
    sortandshowProducts(ORDER_DESC_BY_COST);
  });

  sortbyCount.addEventListener("click", function () {
    sortandshowProducts(ORDER_BY_PROD_RELEVANCY);
  });

  clear.addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showData();
  });

  FilterCount.addEventListener("click", function () {
    minCost = document.getElementById("rangeFilterCountMin").value;
    maxCost = document.getElementById("rangeFilterCountMax").value;

    if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
      minCost = parseInt(minCost);
    } else {
      minCost = undefined;
    }

    if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
      maxCost = parseInt(maxCost);
    } else {
      maxCost = undefined;
    }

    showData();
  });

  userInput.addEventListener("input", (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    const div = document.getElementById("arraycontainer");
    let htmlContentToAppend = "";

    const filteredArray = currProducsArray.filter((product) => {
      const productName = product.name.toLowerCase();
      const productDescription = product.description.toLowerCase();

      return (
        productName.includes(searchString) ||
        productDescription.includes(searchString)
      );
    });

    for (let i = 0; i < filteredArray.length; i++) {
      let product = filteredArray[i];
      htmlContentToAppend += `
              <div class="list-group-item list-group-item-action cursor-active">
                  <div class="row">
                      <div class="col-3">
                          <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                      </div>
                      <div class="col">
                          <div class="d-flex w-100 justify-content-between">
                              <h4 class="mb-1">${product.name} | ${product.cost}</h4>
                              <small class="text-muted">${product.soldCount} artículos</small>
                          </div>
                          <p class="mb-1">${product.description}</p>
                      </div>
                  </div>
              </div>
              `;
    }

    div.innerHTML = htmlContentToAppend;
  });
});
