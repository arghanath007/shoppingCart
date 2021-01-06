// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  // the 'item' variable is checking weather the item which is to be added to the cart is already present in the cart or not. It is returning either true or false depending on the id that is passed to it.
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    // Finding the product with the id that is passed to the findProduct() so that we can add that product to the cart as it is not present in the cart.
    let product = findProduct(id);
    // Adding item to the cart. We are spreading and copying the initial or the products that are already present in the cart and adding the new product into the cart with an initial amount set to '1' as there is only one product added to the cart and this product will be added to the cart in the next line.
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // Displaying the new product within the cart
    addToCartDOM(product);
  } else {
    // Updating the values
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  // Counting the number of itemes in the cart
  displayCartItemCount();
  // Displaying the cart total
  displayCartTotal();
  // Setting the cart to the local storage
  setStorageItem("cart", cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    const element = e.target;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // Removing the item
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      // parent.parentElement.remove();
      // Same as the above one
      element.parentElement.parentElement.remove();
    }

    // Decreasing the count of product
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    // increasing the count of product
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

const init = () => {
  // Display total cart items
  displayCartItemCount();
  //Displaying the total amount in cart
  displayCartTotal();
  // Displaying the cart items
  displayCartItemsDOM();
  // Functionality in cart
  setupCartFunctionality();
};
init();
