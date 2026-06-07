import { handleCarouselClick } from "./modules/carousel.js";
import { handleAddToCart } from "./modules/cart.js";
import { handleQuantity } from "./modules/quantity.js";
import { APP_VERSION } from "./config.js";

var versionNodes = document.querySelectorAll("[data-app-version]");
for (var i = 0; i < versionNodes.length; i += 1) {
  versionNodes[i].textContent = APP_VERSION;
}

document.addEventListener("click", function (event) {
  var button = event.target.closest("button");
  if (!button) {
    return;
  }

  if (handleCarouselClick(button)) {
    return;
  }

  if (handleAddToCart(button)) {
    return;
  }

  handleQuantity(button);
});
