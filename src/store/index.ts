import { createStore } from "vuex";

export default createStore({
  state: {
    selectProduct: {},
  },
  getters: {
    getSelectProduct(state) {
      return state.selectProduct;
    },
  },
  mutations: {
    setSelectProduct(state, data) {
      console.log(state, data);
      state.selectProduct = data;
    },
  },
  actions: {},
  modules: {},
});
