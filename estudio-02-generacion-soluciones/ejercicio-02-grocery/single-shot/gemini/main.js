import { Grocery } from "./domain/grocery.js";
import { Categories } from "./domain/product.js";

const grocery = new Grocery("Mi Tienda");

const inpTotalProducts = document.getElementById("inp-total-products");
const inpTotalDiscounted = document.getElementById("inp-total-discounted");
const fruitsCards = document.getElementById("fruits-cards");
const vegetablesCards = document.getElementById("vegetables-cards");
const productForm = document.getElementById("product-form");
const errorMessage = document.getElementById("error-message");

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

  cardBody.appendChild(title);
  cardBody.appendChild(price);

  if (product.getDiscount() > 0) {
    const discount = document.createElement("p");
    discount.className = "card-text text-success";
    discount.textContent = `Descuento: ${product.getDiscount()}%`;
    cardBody.appendChild(discount);
  }

  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

function updateUI() {
  inpTotalProducts.value = grocery.totalProducts();
  inpTotalDiscounted.value = grocery.totalDiscountedProducts();

  fruitsCards.innerHTML = "";
  vegetablesCards.innerHTML = "";

  for (const product of grocery.getProducts()) {
    const card = createProductCard(product);
    if (product.getCategory() === Categories.Fruits) {
      fruitsCards.appendChild(card);
    } else if (product.getCategory() === Categories.Vegetables) {
      vegetablesCards.appendChild(card);
    }
  }
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const inpName = document.getElementById("inp-name");
  const inpPrice = document.getElementById("inp-price");
  const inpCategory = document.getElementById("inp-category");
  const inpDiscount = document.getElementById("inp-discount");

  try {
    const name = inpName.value;
    const price = parseInt(inpPrice.value);
    const category = inpCategory.value;
    const discount = parseInt(inpDiscount.value);

    grocery.addProduct(name, price, category, discount);
    updateUI();
    productForm.reset();
  } catch (error) {
    errorMessage.textContent = error;
  }
});
