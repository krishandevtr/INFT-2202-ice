document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("productTableBody");

    if (tableBody) {
        const products = JSON.parse(localStorage.getItem("products")) || [];

        tableBody.innerHTML = products.map((product, index) => `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `).join('');
    }
});

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}

function editProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("editProductIndex", index);
    location.href = "product.html";
}
