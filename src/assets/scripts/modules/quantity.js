export function handleQuantity(button) {
  var isMinus = !!button.querySelector("svg.lucide-minus");
  var isPlus = !!button.querySelector("svg.lucide-plus");

  if (!isMinus && !isPlus) {
    return false;
  }

  var quantityBox = button.closest(".qty-control");
  if (!quantityBox) {
    return true;
  }

  var quantityText = quantityBox.querySelector(".qty-value");
  if (!quantityText) {
    return true;
  }

  var currentValue = parseInt(quantityText.textContent.trim(), 10);
  if (isNaN(currentValue)) {
    currentValue = 0;
  }

  if (isPlus) {
    currentValue += 1;
  }

  if (isMinus) {
    currentValue = Math.max(0, currentValue - 1);
  }

  quantityText.textContent = String(currentValue);
  return true;
}
