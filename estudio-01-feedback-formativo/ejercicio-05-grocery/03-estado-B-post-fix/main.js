import { Grocery } from "./domain/grocery.js";
import { Categories } from "./domain/product.js";

const myGrocery = new Grocery("Colores y Sabores");

const groceryName = document.getElementById("grocery-name");
groceryName.innerText = myGrocery.getName();

const inpTotalProducts = document.getElementById("inp-total-products");
const inpTotalDiscounted = document.getElementById("inp-total-discounted");
const btnAdd = document.getElementById("btn-add");
const inpName = document.getElementById("inp-name");
const inpPrice = document.getElementById("inp-price");
const inpDiscount = document.getElementById("inp-discount");
const selCategory = document.getElementById("sel-category");

btnAdd.addEventListener("click", () => {
  const productErrorContainer = document.getElementById("add-error-container");
  const productErrorMsg = document.getElementById("add-error-msg");
  try {
    myGrocery.addProduct(
      inpName.value,
      parseInt(inpPrice.value),
      selCategory.value,
      parseInt(inpDiscount.value) || 0,
    );
    clearInputs();
    productErrorContainer.classList.add("d-none");
    updateCatalog();
    updateTotals();
  } catch (error) {
    productErrorContainer.classList.remove("d-none");
    productErrorMsg.innerText = error;
  }
});

function clearInputs() {
  inpName.value = "";
  inpPrice.value = 0;
  inpDiscount.value = 0;
}

function updateCatalog() {
  const addedProduct =
    myGrocery.getProducts()[myGrocery.getProducts().length - 1];
  let newListElement = document.createElement("li");
  newListElement.classList.add("list-group-item");
  newListElement.innerText = addedProduct.toString();

  const emptyFruitsList = document.getElementById("empty-fruits-list");
  const fruitsListContainer = document.getElementById("fruits-list-container");
  const fruitsList = document.getElementById("fruits-list");
  const emptyVegetablesList = document.getElementById("empty-vegetables-list");
  const vegetablesListContainer = document.getElementById(
    "vegetables-list-container",
  );
  const vegetablesList = document.getElementById("vegetables-list");

  switch (addedProduct.getCategory()) {
    case Categories.Fruits:
      emptyFruitsList.classList.add("d-none");
      fruitsListContainer.classList.remove("d-none");
      fruitsList.appendChild(newListElement);
      break;
    case Categories.Vegetables:
      emptyVegetablesList.classList.add("d-none");
      vegetablesListContainer.classList.remove("d-none");
      vegetablesList.appendChild(newListElement);
      break;
    default:
      throw new Error("Category error");
  }
}

function updateTotals() {
  inpTotalProducts.value = myGrocery.totalProducts();
  inpTotalDiscounted.value = myGrocery.totalDiscountedProducts();
}

updateTotals();
