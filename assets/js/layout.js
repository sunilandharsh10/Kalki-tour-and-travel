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
          
         // item.querySelector(".submenu-content").style.display = "block";
          const content = item.querySelector(".submenu");
          // if (content.style.display === "block") {
          //       content.style.display = "none";
          //   } else {
          //       content.style.display = "block";
          //   }
            this.parentElement.classList.toggle("active");

          
        }
      });
    });
    
    
  
};
      
     
});

// document.addEventListener("DOMContentLoaded", function () {

//    // Toggle main mobile menu
//     window.toggleMenu = function () {
//         document.getElementById("navLinks").classList.toggle("active");
//     };

//     // MAIN DROPDOWN
//    document.querySelectorAll(".dropdown > a").forEach(function (link) {

//         link.addEventListener("click", function (e) {

//             if (window.innerWidth > 768) return;

//             e.preventDefault();

//             const parent = this.parentElement;

//             // CLOSE ALL OTHER DROPDOWNS
//             document.querySelectorAll(".dropdown").forEach(function (d) {
//                 if (d !== parent) {
//                     d.classList.remove("active");
//                 }
//             });

//             // TOGGLE CURRENT
//             parent.classList.toggle("active");
//         });
//     });

//     // SUBMENU
//      window.dropDown = function (event) {
//     document.querySelectorAll(".submenu > a").forEach(link => {
//         link.addEventListener("click", function (e) {

//             if (window.innerWidth > 768) return;

//             e.preventDefault();

//             const parent = this.parentElement;
//             const content = parent.querySelector(".submenu-content");

//             // Close other submenus inside same dropdown
//             parent.parentElement.querySelectorAll(".submenu").forEach(s => {
//                 if (s !== parent) {
//                     s.classList.remove("active");
//                     const c = s.querySelector(".submenu-content");
//                     if (c) c.style.display = "none";
//                 }
//             });

//             // Toggle current submenu
//             parent.classList.toggle("active");

//             if (content.style.display === "block") {
//                 content.style.display = "none";
//             } else {
//                 content.style.display = "block";
//             }

//         });
//     });
//   }

// });