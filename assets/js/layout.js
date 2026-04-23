
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

 



  function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("active");
    }

    document.querySelectorAll(".dropdown > a").forEach(item => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("active");
        }
      });
    });

