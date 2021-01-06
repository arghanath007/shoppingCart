import { getElement } from "./utils.js";

const sidebarOverlay = getElement(".sidebar-overlay");
const toggleNav = getElement(".toggle-nav");
const closeBtn = getElement(".sidebar-close");

toggleNav.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});
