// global imports
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";
// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js";
import display from "./src/displayProducts.js";
import { getElement } from "./src/utils.js";

const init = async () => {
  const products = await fetchProducts();
  // add products to the store.
  setupStore(products);
  if (products) {
    // Add products to the store
    setupStore(products);
    const featured = store.filter(
      (product) =>
        // Returning or filtering all of the products that have the property of featured set to 'true'.
        product.featured === true
    );
    display(featured, getElement(".featured-center"));
    // console.log(featured);
  }
};

window.addEventListener("DOMContentLoaded", init);
