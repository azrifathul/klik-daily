import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const Axios = axios.create({
  baseURL: "http://dummy.restapiexample.com/api/v1/employees",
});

const dummyProducts = [
  {
    product_name: "Morning Day Milk",
    units: [
      { name: "karton", price: 10000 },
      { name: "pac", price: 5000 },
      { name: "pcs", price: 1000 },
    ],
  },
  {
    product_name: "Book",
    units: [
      { name: "lusin", price: 12000 },
      { name: "rem", price: 3400 },
      { name: "kodi", price: 2000 },
    ],
  },
  {
    product_name: "kertas hvs",
    units: [
      { name: "1 lembar", price: 20000 },
      { name: "10 lembar", price: 90000 },
      { name: "100 lembar", price: 500000 },
    ],
  },
];

export default new Vuex.Store({
  state: {
    totalProduct: 1,
    employees: [],
    distributorCenter: [],
    products: dummyProducts,
    formData: {
      distributorName: "",
      distributorCenter: "",
      products: [{}],
    },
  },
  mutations: {
    addProductHandler(state) {
      let tempArr = [...state.formData.products];
      console.log(tempArr);
      tempArr.push({});
      state.formData.products = tempArr;
    },
    deleteProductHandler(state, { productId }) {
      let tempArr = [...state.formData.products];
      tempArr.splice(productId, 1);
      state.formData.products = tempArr;
    },
    getEmployeesMutation(state, data) {
      state.employees = data;
    },
    changeFormDataMutation(state, { type, value, productId }) {
      if (type === "distributorName") {
        state.distributorCenter = ["DC Tanggerang", "DC Cikarang"];
      }
      if (type === "productName") {
        const filteredData = state.products.filter((product) => {
          return product.product_name === value;
        });
        let tempArr = [...state.formData.products];
        tempArr[productId] = {
          productName: filteredData[0],
        };
        let tempObj = { ...state.formData };
        tempObj.products = tempArr;
        state.formData = tempObj;
      } else if (type === "productUnit") {
        const filteredData = state.formData.products[
          productId
        ].productName.units.filter((unit) => {
          return unit.name === value;
        });
        let tempArr = [...state.formData.products];
        tempArr[productId] = {
          ...tempArr[productId],
          productUnit: filteredData[0],
        };
        let tempObj = { ...state.formData };
        tempObj.products = tempArr;
        state.formData = tempObj;
      } else if (type === "quantity") {
        let tempArr = [...state.formData.products];
        tempArr[productId] = {
          ...tempArr[productId],
          quantity: value,
        };
        let tempObj = { ...state.formData };
        tempObj.products = tempArr;
        state.formData = tempObj;
      } else {
        let tempObj = { ...state.formData };
        tempObj[type] = value;
        state.formData = tempObj;
      }
    },
  },
  actions: {
    async getEmployeeHandler({ commit }) {
      // const { data } = await Axios({
      //   url: "/users",
      //   method: "GET",
      // });
      const dummyEmployees = [
        {
          id: 1,
          employee_name: "Tiger Nixon",
          employee_salary: 320800,
          employee_age: 61,
          profile_image: "",
        },
        {
          id: 2,
          employee_name: "Michael John",
          employee_salary: 422223,
          employee_age: 61,
          profile_image: "",
        },
        {
          id: 1,
          employee_name: "John Doe",
          employee_salary: 333333,
          employee_age: 32,
          profile_image: "",
        },
      ];
      commit("getEmployeesMutation", dummyEmployees);
    },
  },
  modules: {},
});
