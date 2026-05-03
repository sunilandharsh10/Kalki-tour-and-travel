// Use root-relative paths (starting from website root)
fetch("/layout/header.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(data => {
    document.getElementById("header").innerHTML = data;
  })
  .catch(error => {
    console.error("Header load failed:", error);
    document.getElementById("header").innerHTML = '<div style="color:red"> Header unavailable</div>';
  });

fetch("/layout/footer.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => {
    console.error("Footer load failed:", error);
    document.getElementById("footer").innerHTML = '<div style="color:red"> Footer unavailable</div>';
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
          //item.querySelector(".dropdown-content").style.display = "block";
        }
      });
    });
    
    
  
};
window.subMenu = function (event) {
      document.querySelectorAll(".submenu > a").forEach(item => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
        
          const content = item.querySelector(".submenu");
       
            this.parentElement.classList.toggle("active");

          
        }
      });
    });
    
    
  
};
      
     
});

