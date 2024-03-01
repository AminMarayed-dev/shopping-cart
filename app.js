let products = [
  {
    id: 1,
    name: "Orange",
    price: 12,
  },
  {
    id: 2,
    name: "Apple",
    price: 10,
  },
  {
    id: 3,
    name: "Peach",
    price: 20,
  },
];
// selector
const addCartBtns = document.querySelectorAll(".btn--add");
const noCartMessage = document.querySelector(".carts__nothing");
const cartsItem = document.querySelector(".carts__item");
const inputs = document.querySelectorAll(".input");
const totalPriceDOM = document.querySelector(".carts__total__price");
const clearCartBtn = document.querySelector(".btn--clear");

// data
let carts = getCart(); // get the cart from localStorage

// functions
function addToCart(e) {
  // save products in local storage 
  saveProducts(products);

  const id = e.target.dataset.id;
  // const selectedProduct = products.find((product) => product.id == id);
  const selectedProduct = getProduct(id);

  // Find the input element associated with the current product
  const input = [...inputs].find((input) => input.dataset.input == id);

  // Update the quantity of the selected product
  selectedProduct.quantity = Number(input.value);

  const existedProduct = carts.find((cart) => cart.id == selectedProduct.id);

  if (existedProduct) {
    existedProduct.quantity += selectedProduct.quantity;
  } else {
    carts.push(selectedProduct);
  }

  saveCart(carts); // save the updated cart to localStorage
  displayCart(carts); // display the updated cart
  setCartValue(carts); // set the total price
}

function displayCart(carts) {
  noCartMessage.style.display = carts.length > 0 ? "none" : "block";

  let display = "";
  carts.forEach((cart) => {
    display += `
    <div class="cart__item">
      <span class="name">${cart.name}</span>
      <span class="label">${cart.quantity} pices for ${
      cart.quantity * cart.price
    }$</span>
    </div>`;
  });
  cartsItem.innerHTML = display;
}

function setCartValue(carts) {
  let total = 0;
  total = carts.reduce((acc, cart) => acc + cart.quantity * cart.price, 0);
  totalPriceDOM.querySelector("strong").innerText = `${total} $`;
}

function clearAll() {
  carts = [];
  saveCart(carts); // save the empty cart to localStorage
  setCartValue(carts);
  displayCart(carts);
}

// LocalStorage
function getProduct(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  return products.find((p) => p.id == id);
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getCart() {
  return JSON.parse(localStorage.getItem("carts")) || [];
}

function saveCart(carts) {
  localStorage.setItem("carts", JSON.stringify(carts));
}

// events
addCartBtns.forEach((btn) => btn.addEventListener("click", addToCart));
clearCartBtn.addEventListener("click", clearAll);

document.addEventListener("DOMContentLoaded", () => {
  setCartValue(carts);
  displayCart(carts);
  // saveProducts(products);
});
