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
    document.getElementById("header").innerHTML = '<div style="color:red">⚠️ Header unavailable</div>';
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
    document.getElementById("footer").innerHTML = '<div style="color:red">⚠️ Footer unavailable</div>';
  });