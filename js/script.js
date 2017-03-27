var overlay = document.querySelector(".modal-overlay");

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


var modalWindow = document.querySelector(".modal-content");

function windowOpen(popup_window) {
  popup_window.classList.add("modal-content--show");
  overlay.classList.add("modal-overlay--show");
}

function windowClose(popup_window) {
  popup_window.classList.remove("modal-content--show");
  overlay.classList.remove("modal-overlay--show");
}

var btn_tocart_array = document.querySelectorAll(".js-tocart");

for (var i=0; i < btn_tocart_array.length; i++){
  btn_tocart = btn_tocart_array[i];
  btn_tocart.addEventListener("click",function addToCart(event) {
    event.preventDefault();
    windowOpen(modalWindow);
  });
}

/// общие нажание ESC и клик по overlay

window.addEventListener("keydown", function(event) {
       if (event.keyCode === 27) {
         if (modalWindow) {
           if (modalWindow.classList.contains("modal-content--show")) {
             windowClose(modalWindow);
           }
         }
       }
     });
overlay.addEventListener("click", function(event){
  if (modalWindow) {
    if (modalWindow.classList.contains("modal-content--show")) {
      windowClose(modalWindow);
    }
  }
});
