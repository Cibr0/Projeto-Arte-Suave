let elem_preloader = document.getElementById("preloader");
let elem_loader = document.getElementById("loader");
console.log("ok");

setTimeout(function() {
  elem_preloader.classList.remove("preloader");
  elem_loader.classList.remove("loader");
  
  window.location.href = "../home/home.html"; 
}, 1280);
