import { Validate } from "./validate.js";
import { productService } from "../services/phoneServices.js";
import {
  renderData,
  resetForm,
  getDataForm,
  showMessage,
  showDataForm,
} from "./controller-admin.js";
const validate = new Validate();
let globalId = 0;

let fetchData = () => {
  productService
    .getList()
    .then((res) => {
      renderData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchData();
document.getElementById("addPhoneForm").addEventListener("click", () => {
  resetForm();
  let elements = document.querySelectorAll(".sp-thongbao");
  elements.forEach((item) => {
    item.textContent = "";
  });
});

window.createPhone = () => {
  productService
    .getList()
    .then((res) => {
      if (!validate.isValid(res)) {
        return;
      }
      let data = getDataForm();
      $("#exampleModal").modal("hide");

      productService
        .create(data)
        .then((res) => {
          fetchData();
          showMessage("Them thanh cong");
        })
        .catch((err) => {
          console.log(err);
          showMessage("Them that bai", false);
        });
    })
    .catch((err) => {
      console.log("err: ", err);
      showMessage("fetch data that bai");
    });
};

window.deletePhone = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      productService
        .delete(id)
        .then((res) => {
          fetchData();
          showMessage("Xoa thanh cong");
        })
        .catch((err) => {
          showMessage("Xoa that bai");
        });
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};
window.editPhone = (id) => {
  let elements = document.querySelectorAll(".sp-thongbao");
  elements.forEach((item) => {
    item.textContent = "";
  });
  globalId = id;
  productService
    .getDetail(id)
    .then((res) => {
      showDataForm(res.data);
      $("#exampleModal").modal("show");
      document.getElementById("btnUpdate").style.display = "inline-block";
      document.getElementById("btnAddPhone").style.display = "none";
    })
    .catch((err) => {
      showMessage("edit error", false);
    });
};

window.phoneUpdate = () => {
  productService
    .getList()
    .then((res) => {
      if (!validate.isValid(res)) {
        return;
      }
      let data = getDataForm();
      productService
        .update(globalId, data)
        .then((res) => {
          fetchData();
          showMessage("update thanh cong");
          $("#exampleModal").modal("hide");
        })
        .catch((err) => {
          showMessage("update that bai", false);
        });
    })
    .catch((err) => {
      console.log(err);
      showMessage("fetch data that bai", false);
    });
};
