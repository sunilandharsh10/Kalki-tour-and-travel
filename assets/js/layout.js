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

  fetch("../layout/cabServices.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("cab-section").innerHTML = data;
  });


fetch("../layout/ulta_about.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("ultra-about").innerHTML = data;
  });