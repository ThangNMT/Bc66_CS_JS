let cartItem = [];

// lấy dữ liệu từ localStorage render lên table
var dataJson = localStorage.getItem("CARTITEM");

if (dataJson !== null) {
  var dataRaw = JSON.parse(dataJson);
  for (let i = 0; i < dataRaw.length; i++) {
    let data = dataRaw[i];
    let phone = new Phone(data.id, data.name, data.price, data.screen, data.backCamera, data.frontCamera, data.img, data.desc, data.type);
    cartItem.push(phone);
  }
  renderCartItem(cartItem);

}

// ADD TO CART
function addToCart(id) {
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  }).then(function (res) {
    cartItem.push(res.data)
    console.log('cartItem: ', cartItem);
    renderCartItem(cartItem);
  }).catch(function (err) {
    console.log('err: ', err);
  });

}

// Render CartItem
function renderCartItem(cartItem) {
  let contentHTML = "";
  cartItem.forEach(function (item) {
    let trString =
      `<div class="productCart-card w-full align-items-center">
          <div class="cartItem flex align-items-center">
            <img src="${item.img}" alt="img_${item.name}">

            <div class="titleCart">
              <h3 class="text-xl font-bold align-left">${item.name}</h3>
            </div>  

            <div class="align-left text-sm w-full">
             <ul class="list-disc">
               <li><span>Màn hình:</span> screen 68</li>
               <li><span>Camera trước:</span> 2 camera 12 MP</li>
               <li><span>Camera sau:</span> 7 MP</li>
             </ul>
            </div>

            <div class="align-items-center w-full">
              <div class="text-2xl font-monospace text-center" style="color: red;">${item.price}$</div>
            </div>

          </div>

          <div class="align-items-center flex justify-content-between ml-5">
            <div class="quantityResult text-sm font-monospace ">
             <span> <b>Quantity:</b> </span>
             <span class="plus bg-succes">-</span>
             <span class="mx-2 text-sm">1</span>
             <span class="plus bg-succes">+</span>
             </div>
            <div class="text-sm font-monospace "><a href="#!">Xóa</a></div>
          </div>

        </div>`
    contentHTML += trString;
  });

  // lưu dữ liệu xuống LocalStorage
  var dataJson = JSON.stringify(cartItem);
  localStorage.setItem("CARTITEM", dataJson);

  document.getElementById("cartList").innerHTML = contentHTML;

}

//Xóa (chưa xong)
// function emptyCart() {
//   let newCart = [];
//   var dataJson = JSON.stringify(newCart);
//   localStorage.setItem("CARTITEM", dataJson);
//   newCart = document.querySelector(".cartItem").innerHTML = "";
// }

//Remove