export function handleCarouselClick(button) {
  var carouselAction = button.getAttribute("data-carousel-action");
  var carouselTargetId = button.getAttribute("data-carousel-target");
  if (!carouselAction || !carouselTargetId) {
    return false;
  }

  var track = document.getElementById(carouselTargetId);
  if (!track) {
    return true;
  }

  var step = Math.floor(track.clientWidth / 4);
  var direction = carouselAction === "next" ? 1 : -1;
  track.scrollBy({ left: step * direction, behavior: "smooth" });
  return true;
}
