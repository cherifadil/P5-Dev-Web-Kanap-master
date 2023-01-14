var url = new URL(window.location.search);
var orderId = url.searchParams.get("orderId");

let idNode = document.querySelector("orderId");
idNode.innerText = orderId;
console.log(orderId)
    //localStorage.clear();


