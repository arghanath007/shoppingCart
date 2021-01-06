import { getStorageItem, setStorageItem } from "./utils.js";
let store = getStorageItem("store");
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, image };
  });
  setStorageItem("store", store);
};
// In index.js we are importing the setupStore, store functions and as a result of that they are getting invoked right away so the console.log(store); is getting executed before the fetching of the data is completed. That's why it is returning an empty array.
console.log(store);
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};
// This is easier as all of the exports are in the same line and we don't have to look through the whole file to find which we are exporting from here.
export { store, setupStore, findProduct };
