document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let products = JSON.parse(localStorage.getItem("products")) || [];
    const index = localStorage.getItem("editProductIndex");

    const product = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        stock: Number(document.getElementById("productStock").value),
        price: Number(document.getElementById("productPrice").value)
    };

    if (index !== null) {
        products[index] = product;
        localStorage.removeItem("editProductIndex");
    } else {
        products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    location.href = "list.html";
});
