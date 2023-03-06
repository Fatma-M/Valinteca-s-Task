// UI ELEMENTS
const cartItems = document.querySelector("#cart-products");
const cartBadge = document.querySelector(".badge");
const modal = document.querySelector(".modal");
const mainEl = document.querySelector("#mainSection");

// DATA
const dataObj = JSON.parse(localStorage.getItem("products")) || [
  {
    product_id: "1",
    product_name: "book-1",
    product_price: "150.00",
    product_image: "book-1",
    added_to_cart: false,
  },
  {
    product_id: "2",
    product_name: "book-2",
    product_price: "120.00",
    product_image: "book-2",
    added_to_cart: false,
  },
  {
    product_id: "3",
    product_name: "book-3",
    product_price: "130.00",
    product_image: "book-3",
    added_to_cart: false,
  },
  {
    product_id: "4",
    product_name: "book-4",
    product_price: "100.00",
    product_image: "book-4",
    added_to_cart: false,
  },
  {
    product_id: "5",
    product_name: "book-5",
    product_price: "110.00",
    product_image: "book-5",
    added_to_cart: false,
  },
  {
    product_id: "6",
    product_name: "book-6",
    product_price: "100.00",
    product_image: "book-6",
    added_to_cart: false,
  },
];

let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];

// SET PRODUCTS ON LOCAL STORAGE
function setLocalStorage() {
  localStorage.setItem("products", JSON.stringify(dataObj));
}

// CREATE PRODUCTS CARDS ELEMENT
function render() {
  let productsUI = dataObj.map((item) => {
    return `
     <div class="card">
    <img src="images/${item.product_image}.jpg" alt="book cover" />
    <h3 class="title">${item.product_name}</h3>
    <h3 class="price">${item.product_price}/EGP</h3>
    <div>
    <button class="addBtn" style="display:${
      !item.added_to_cart ? "inline-block" : "none"
    }" onclick="addToCart(${item.product_id})">
    Add
  </button>
    <button class="removeBtn" style="display:${
      item.added_to_cart ? "inline-block" : "none"
    }" onclick="removeFromCart(${item.product_id})">
    remove
  </button>
    <button class="view" onclick="openModal(${
      item.product_id
    })">Quick view</button>
    </div>
    </div>
    `;
  });

  mainEl.innerHTML = productsUI.join("");
  setLocalStorage();

  // CREATE SELECTED PRODUCTS UI - CART ELEMENTS
  let cartUI = cartArray.map((item) => {
    return `
    <li>
      <p> ${item.product_name} <i class="fa-solid fa-trash"  onclick="removeFromCart(${item.product_id})"></i> </p>
    </li>`;
  });

  cartItems.innerHTML = cartUI.join("");
  cartBadge.innerHTML = cartArray.length;
}

// ADD TO CART
function addToCart(id) {
  let selectedItem = dataObj.find((item) => item.product_id == id);
  selectedItem.added_to_cart = true;
  cartArray.push(selectedItem);
  localStorage.setItem("cartProducts", JSON.stringify(cartArray));
  setLocalStorage();
  render();
  closeModal();
}

// REMOVE FROM CART
function removeFromCart(id) {
  let selectedItem = dataObj.find((item) => item.product_id == id);

  cartArray = cartArray.filter(
    (item) => item.product_id != selectedItem.product_id
  );
  localStorage.setItem("cartProducts", JSON.stringify(cartArray));

  selectedItem.added_to_cart = false;

  setLocalStorage();
  closeModal();
  render();
}

// OPEN MODAL
function openModal(id) {
  window.scrollTo(0, 0);

  let selectedItem = dataObj.find((item) => item.product_id == id);
  modal.innerHTML = `
  <div>
  <i class="fa-sharp fa-solid fa-xmark" onclick="closeModal()"></i>
    <img src="images/${selectedItem.product_image}.jpg" alt="book cover" />
    <h1> ${selectedItem.product_name} </h1>
    <h1> ${selectedItem.product_price} </h1>
     <button class="addBtn" style="display:${
       !selectedItem.added_to_cart ? "inline-block" : "none"
     }" onclick="addToCart(${selectedItem.product_id})">
    Add
  </button> 
    <button class="removeBtn" style="display:${
      selectedItem.added_to_cart ? "inline-block" : "none"
    }" onclick="removeFromCart(${selectedItem.product_id})">
    remove
  </button> 
    </div>
  `;

  modal.style.display = "flex";
}

// CLOSE MODAL
function closeModal() {
  modal.style.display = "none";
}

render();
