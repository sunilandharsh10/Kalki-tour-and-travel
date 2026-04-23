
fetch("../layout/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

fetch("../layout/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

 



  document.addEventListener("DOMContentLoaded", function () {
    // Toggle main mobile menu
    window.toggleMenu = function () {
        document.getElementById("navLinks").classList.toggle("active");
    };

    // Handle dropdown click (mobile)
    window.dropDown = function (event) {
      document.querySelectorAll(".dropdown > a").forEach(item => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("active");
          item.querySelector(".dropdown-content").style.display = "block";
        }
      });
    });
    };

      
     
});

