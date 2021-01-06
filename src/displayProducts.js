import { formatPrice } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";
const display = (products, element) => {
  //   console.log(products, element);
  // Display Products
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `<!-- Single Product -->
            <article class="product">
                <div class="product-container">
                    <img src="${image}" alt="${name}" class="product-img img">
                    <div class="product-icons">
                        <a href="./product.html?id=${id}" class="product-icon">
                            <i class="fas fa-search"></i>
                        </a>
                        <button class="product-cart-btn product-icon" data-id="${id}">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
                <footer>
                    <p class="product-name">${name}</p>
                    <h4 class="product-price">${formatPrice(price)}</h4>
                </footer>
            </article>
        <!-- End Of Single Product -->`;
      // The price will always be in cents, as in here we are using Dollars. Because most of the payment gateways are looking for the total calculated in the smallest unit amount as possible which is cents here. So we are converting the cents to dollars while displaying the prices of the products in the website. But the original price remains in cents when we are sending it to the cart or to the payment gateway for checkout. Everytime we canculate the price, we will do it in cents. When we display that price then how we are going to format it. Javascript is somewhat tricky when we have decimals and we start rounding them up. Whenever we talk about money we have to be as safe as possible. If we go wrong with money as in adding, substracting and most importantly rounding up numbers and decimals in Js, we might hit some weird bugs and we dont want those bugs when money is involved. We want to be as clean as possible that's why it is the easiest set-up to have everything in cents and so that we cannot go wrong and these are just numbers and there won't be any suprises when we are rounding, adding, substracting, multiplying and then we can pass this number safely without any problem to the payment gateaways like 'Stripe' and only worry about formating as far as displaying.
    })
    .join("");
  // Adding the product to the cart by clicking on the cart-icon which shows up over the products.
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains("product-cart-btn")) {
      addToCart(parent.dataset.id);
    }
  });
};

export default display;
