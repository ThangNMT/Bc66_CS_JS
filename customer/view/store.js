

const BASE_URL = "https://663ceb7117145c4d8c382eaf.mockapi.io/products";
let products = [];

// Gọi api lấy danh sách sản phẩm 
function fetchProducts() {
  axios({
    url: BASE_URL,
    method: "GET",
  }).then(function (res) {
    products = res.data;
    renderProducts(res.data);
  }).catch(function (err) {
    console.log('err: ', err);
  });

}
fetchProducts();
