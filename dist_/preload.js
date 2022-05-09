var loader = document.getElementById("preloader");

window.addEventListener("load",  setTimeout(function() {
    //loader.style.display = "none";
    //console.log("fuck2022");
    setInterval(function () {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.1;
        } else {
            clearInterval();
            loader.style.display = "none";
        }
    }, 50);
    
} , 2500))
