/* Funcion de click del carrito para que se vea */

function showCart(x){
    document.getElementById("products-id").style.display = "block";
    disableScroll();
}
function closeBtn(){
     document.getElementById("products-id").style.display = "none";
     enableScroll();
}

/* Trabajando con el scroll */
let menu = true;

function miniMenuShow(){
    if (menu === true) {
        disableScroll();
        menu = false
    } else {
        enableScroll();
        menu = true;
    }
}

function disableScroll(){  
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function(){ window.scrollTo(x, y) };
}

function enableScroll(){  
    window.onscroll = null;
}

