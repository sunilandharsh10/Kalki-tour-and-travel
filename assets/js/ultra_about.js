let index = 0;
var slider;
const totalSlides = 3;

function showSlide() {
  slider = document.getElementById("slider");
  slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
   // (optional, better outside)
  index = (index + 1) % totalSlides; // 🔥 infinite forward
  showSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides; // 🔥 infinite backward
  showSlide();
}