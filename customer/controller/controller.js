

// Hiện thị sản phẩm
function renderProducts(productArr) {
  let contentHTML = "";
  productArr.forEach(function (item) {
    let divString = `<div class="product-card grid-cols-4">
        <img src="${item.img}" alt="${item.name}"
          class="product-image">
        <div class="product-title">
          <h4 class="text-center text-3xl font-bold">${item.name}</h4>
          <div class="text-3xl font-monospace text-center mt-2" style="color: red;">${item.price}$</div>
        </div>

        <div class="product-content justify-content-between align-items-center mt-3 mb-3">
          <div class="type">${item.type}</div>
          <div class="rating">${renderRating()}</div>
        </div>

        <div class="desc-product text-center">
          <div class="text-center mt-2 text-lg mb-3 ">${item.desc}</div>
          <div class="text-sm text-left">
            <ul class="list-disc list-inside">
            <li><span>Màn hình:</Span> ${item.screen}</li>
            <li><span>Camera trước:</Span> ${item.backCamera}</li>
            <li><span>Camera sau:</Span> ${item.frontCamera}</li>
            </ul>
          </div>
        </div>
        <!-- hover -->
        <button onclick="addToCart(${item.id})" class="product-info">
          <h2 class="product-name font-style: italic">Thêm vào giỏ hàng</h2>
          <h4 class="text-center text-2xl font-bold">${item.name}</h4>
          <p class="product-price font-monospace"">Giá: ${item.price}$</p>
        </button>
      </div>`
    contentHTML += divString;
  });
  document.getElementById("phoneList").innerHTML = contentHTML;
}

// Lấy value từ select
function getSelectedFilterValue() {
  const filterSelect = document.getElementById("productFilter");
  return filterSelect.value;

}

// Lọc sản phẩm theo loại
function filterProductsByType(type) {
  if (type === "all") {
    return products;
  } else {
    return products.filter(product => product.type.toLowerCase() === type);
  }

}

// Render sản phẩm theo loại 
function filterProducts() {
  let filterValue = getSelectedFilterValue();
  let filteredProducts = filterProductsByType(filterValue);
  renderProducts(filteredProducts);

}