import { productService } from "../services/phoneServices.js";

export let renderData = (data) => {
  let ContentHtml = "";
  data.reverse().forEach((item) => {
    let { id, name, price, img, desc } = item;
    let trString = `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${price}$</td>
        <td>${img}</td>
        <td>${desc}</td>
        <td >
        <div class="d-flex" >
        <button onclick="deletePhone(${id})" class="btn btn-danger me-2 ">Xóa
        </button>
        <button onclick="editPhone(${id})" class="btn btn-warning ">Sửa
        </button>
        </div>
        </td>
        </tr>
        `;
    ContentHtml += trString;
  });
  document.getElementById("tablePhone").innerHTML = ContentHtml;
};

export let getDataForm = () => {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCam").value;
  let frontCamera = document.getElementById("frontCam").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;

  return {
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  };
};

export let showMessage = (message, check = true) => {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: check
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export let resetForm = () => {
  document.getElementById("formPhone").reset();
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAddPhone").style.display = "inline-block";
};

export let showDataForm = (data) => {
  let { name, price, screen, backCamera, frontCamera, img, desc, type } = data;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("screen").value = screen;
  document.getElementById("backCam").value = backCamera;
  document.getElementById("frontCam").value = frontCamera;
  document.getElementById("img").value = img;
  document.getElementById("desc").value = desc;
  document.getElementById("type").value = type;
};

window.searchBar = () => {
  axios.get(BASE_URL + adminEndpoint).then((res) => {
    let valueSearch = document.querySelector("#searchName").value.toLowerCase();
    let searchValue = res.data.filter((item) => {
      return item.name.toLowerCase().includes(valueSearch);
    });
    renderData(searchValue);
  });
};

window.searchPhone = () => {
  productService
    .getList()
    .then((res) => {
      let value = document.querySelector("#searchName").value.toLowerCase();
      let searchValue = res.filter((item) => {
        return item.name.toLowerCase().includes(value);
      });
      renderData(searchValue);
    })
    .catch((err) => {
      console.log(err);
      showMessage("tim kiem that bai", false);
    });
};
window.sortPrice = (order) => {
  if (order == "asc") {
    sortMinPrice();
  } else if (order == "desc") {
    sortMaxPrice();
  } else {
  }
};
let sortMinPrice = () => {
  productService
    .getList()
    .then((res) => {
      let sortValue = res.sort((a, b) => {
        return a.price - b.price;
      });
      renderData(sortValue);
    })
    .catch((err) => {
      console.log(err);
      showMessage("sap xep that bai", false);
    });
};
let sortMaxPrice = () => {
  productService
    .getList()
    .then((res) => {
      let sortValue = res.sort((a, b) => {
        return b.price - a.price;
      });
      renderData(sortValue);
    })
    .catch((err) => {
      console.log(err);
      showMessage("sap xep that bai", false);
    });
};
