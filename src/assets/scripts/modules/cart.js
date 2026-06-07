export function handleAddToCart(button) {
  var cartCountText = document.getElementById("cart-count");
  var isAdd = button.textContent && button.textContent.indexOf("Agregar") !== -1;

  if (!isAdd || !cartCountText) {
    return false;
  }

  var cartCurrentValue = parseInt(cartCountText.textContent.trim(), 10);
  if (isNaN(cartCurrentValue)) {
    cartCurrentValue = 0;
  }

  cartCountText.textContent = String(cartCurrentValue + 1);
  return true;
}
