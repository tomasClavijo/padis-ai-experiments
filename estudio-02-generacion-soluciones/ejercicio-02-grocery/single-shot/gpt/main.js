import { Grocery } from "./domain/grocery.js";
import { Categories } from "./domain/product.js";

const grocery = new Grocery("Mi Tienda");

const inpName = document.getElementById("inp-name");
const inpPrice = document.getElementById("inp-price");
const inpCategory = document.getElementById("inp-category");
const inpDiscount = document.getElementById("inp-discount");
const inpTotalProducts = document.getElementById("inp-total-products");
const inpTotalDiscounted = document.getElementById("inp-total-discounted");
const fruitsCards = document.getElementById("fruits-cards");
const vegetablesCards = document.getElementById("vegetables-cards");
const errorMessage = document.getElementById("error-message");
const productForm = document.getElementById("product-form");

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = product.getName();

  const price = document.createElement("p");
  price.className = "card-text";
  price.textContent = `Precio: $${product.getPrice()}`;

  const discount = document.createElement("p");
  discount.className = "card-text";
  discount.textContent = `Descuento: ${product.getDiscount()}%`;

  cardBody.appendChild(title);
  cardBody.appendChild(price);
  cardBody.appendChild(discount);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

function updateCatalog() {
  fruitsCards.innerHTML = "";
  vegetablesCards.innerHTML = "";

  const products = grocery.getProducts();
  for (const product of products) {
    const card = createProductCard(product);
    if (product.getCategory() === Categories.Fruits) {
      fruitsCards.appendChild(card);
    } else if (product.getCategory() === Categories.Vegetables) {
      vegetablesCards.appendChild(card);
    }
  }
}

function updateTotals() {
  inpTotalProducts.value = grocery.totalProducts();
  inpTotalDiscounted.value = grocery.totalDiscountedProducts();
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  try {
    const name = inpName.value;
    const price = parseInt(inpPrice.value);
    const category = inpCategory.value;
    const discount = inpDiscount.value === "" ? 0 : parseInt(inpDiscount.value);

    grocery.addProduct(name, price, category, discount);

    updateCatalog();
    updateTotals();
    productForm.reset();
    inpDiscount.value = "0";
  } catch (error) {
    errorMessage.textContent = error;
  }
});
