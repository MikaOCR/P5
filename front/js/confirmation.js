const orderIdUrl = window.location.search.split("?order=").join(""); // pour trouver l'id et couper à partir du ?
console.log(orderIdUrl);

function insertOrderId() {
    let orderSpan = document.getElementById("orderId");
    orderSpan.textContent = `${orderIdUrl}`;
    orderSpan.style.fontWeight = "600";
}

onload = insertOrderId();