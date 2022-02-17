import { NavbarController } from "./navbarController.js";

document.addEventListener("DOMContentLoaded", () => {
  const navbarElement = document.querySelector("nav");

  const navbarController = new NavbarController(navbarElement);
});
