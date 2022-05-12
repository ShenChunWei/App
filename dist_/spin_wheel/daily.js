let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);

var results = 0;
var today_click_before = 0;

//若 today_click_before = 0 不能再次進來
btn.onclick = function () {
    
    var last2_digit = 0 ;
    var quotient = 0 ;
    container.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 1000);
    last2_digit = number % 100
    console.log(last2_digit);
    quotient = last2_digit / 10 ;
    var remainder = quotient % 1;
    quotient = quotient - remainder ;
    console.log(quotient);

    switch (quotient) {
        case 0:
            console.log("good luck tomorrow");
            results = 0;
            break;
        case 1: 
            console.log("good luck tomorrow");
            results = 0;
            break;
        case 2: 
            console.log("good luck tomorrow");
            results = 0;
            break;
        case 3:
            console.log("good luck tomorrow");
            results = 0;
            break;
        case 4:
            console.log("good luck tomorrow");
            results = 0;
            
            break;
        case 5:
            console.log("good luck tomorrow");
            results = 0;
            
            break;
        case 6:
            console.log("good luck tomorrow");
            results = 0;
            
            break;
        case 7:
            console.log("good luck tomorrow");
            results = 0;
            
            break;
        case 8:
            console.log("6666666666666");
            results = 1;
            
            break;
        case 9:
            console.log("good luck tomorrow");
            results = 0;
            
            break;
        default:
            console.log('default');
    }

    setTimeout(function box_alert(){
        alert_box = document.getElementById("jump_box") ;
        alert_box.style.display = "block";
        alert_box.style.opacity = "0";
        
        setTimeout(function () { alert_box.style.opacity = "1"; }, 1500);
    }, "2500")
    today_click_before = 1 ;
}