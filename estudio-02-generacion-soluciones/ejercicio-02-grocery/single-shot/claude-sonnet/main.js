import { Grocery } from "./domain/grocery.js";
import { Categories } from "./domain/product.js";

const grocery = new Grocery("Colores y Sabores");

const groceryName = document.getElementById("grocery-name");
groceryName.textContent = grocery.getName();

const inpTotalProducts = document.getElementById("inp-total-products");
const inpTotalDiscounted = document.getElementById("inp-total-discounted");
const fruitsCards = document.getElementById("fruits-cards");
const vegetablesCards = document.getElementById("vegetables-cards");
const productForm = document.getElementById("product-form");
const errorMessage = document.getElementById("error-message");

function createProductCard(product) {
  const discountHtml =
    product.getDiscount() > 0
      ? `<p class="card-text text-success">Descuento: ${product.getDiscount()}%</p>`
      : "";

  return `
    <div class="col-md-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${product.getName()}</h5>
          <p class="card-text">Precio: $${product.getPrice()}</p>
          ${discountHtml}
        </div>
      </div>
    </div>
  `;
}

function renderCatalog() {
  fruitsCards.innerHTML = "";
  vegetablesCards.innerHTML = "";

  for (const product of grocery.getProducts()) {
    const cardHtml = createProductCard(product);
    if (product.getCategory() === Categories.Fruits) {
      fruitsCards.innerHTML += cardHtml;
    } else if (product.getCategory() === Categories.Vegetables) {
      vegetablesCards.innerHTML += cardHtml;
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
    renderCatalog();
    updateTotals();
    productForm.reset();
  } catch (error) {
    errorMessage.textContent = error;
  }
});
