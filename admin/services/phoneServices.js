const BASE_URL = "https://6641ed403d66a67b343575f2.mockapi.io/admin";

export var productService = {
  getList: function () {
    return axios.get(BASE_URL).then((res) => res.data);
  },

  getDetail: function (id) {
    return axios.get(`${BASE_URL}/${id}`);
  },

  create: function (newPhone) {
    return axios.post(BASE_URL, newPhone);
  },

  update: function (id, phone) {
    return axios.put(`${BASE_URL}/${id}`, phone);
  },

  delete: function (id) {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};
