const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cartItems = [];

function loadCartFromSession() {
  const storedCart = sessionStorage.getItem("cart");
  if (storedCart) {
    try {
      const parsed = JSON.parse(storedCart);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing cart data:", e);
    }
  }
  return [];
}

function saveCartToSession() {
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    const addBtn = li.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", () => addToCart(product.id));
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cartItems.push({ id: product.id, name: product.name, price: product.price });
    saveCartToSession();
    renderCart();
  }
}

function clearCart() {
  cartItems = [];
  saveCartToSession();
  renderCart();
}

function init() {
  cartItems = loadCartFromSession();
  renderProducts();
  renderCart();
  clearCartBtn.addEventListener("click", clearCart);
}

init();