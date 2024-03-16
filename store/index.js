// state
export const state = () => ({
  loginDialog: false,
  signedIn: false,
  user: null || JSON.parse(localStorage.getItem('user')) ,
  role: null || localStorage.getItem('role'),
  filters: {
    categoryid: null,
    searchstring: null,
    minprice: null,
    maxprice: null,
    brandid: null,
    manufacturerid: null,
    orderby: null,
  },
  products: {
    min: 0,
    max: 0,
    categories: [],
    manufacturers: [],
    products: {
      model: [],
    },
  },
  cart: [] ,
  cartTotal: 0,
  // newely added states
  categories: [],
  footer: [],
  countries: [],
  cities: [],
  region: [],
  requestType: [],
})

// getters
export const getters = {
  user: (state) => state.user,
  getRole: (state) => state.role,
  loginDialog: (state) => state.loginDialog,
  getFilters: (state) => state.filters,
  getProducts: (state) => state.products.products,
  getMinPrice: (state) => state.products.min,
  getMaxPrice: (state) => state.products.max,
  getProductCategories: (state) => state.products.categories,
  getProductManufacturers: (state) => state.products.manufacturers,
  getCartProducts: (state) => state.cart,
  cartTotal: (state) => state.cartTotal,
  getSignedIn: (state) => state.signedIn,
  getCategories: (state) => state.categories,
  getFooter: (state) => state.footer,
  getCountries: (state) => state.countries,
  getRegion: (state) => state.region,
  getCities: (state) => state.cities,
  getRequestType: (state) => state.requestType

  // getRatings: (state) => state.ratings,
}

// actions
export const actions = {
  async setFavorite({ commit }, data) {
    console.log(data)
    await this.$axios.$put(`favorites/toggle/${data.prodId}`);
    await this.$axios.$get('products', {}).then((r) => {
      commit('setProducts', r.model)
    })
    //  this.$axios.$get('countries').then((r) => {
    //   commit('setCountries', r.model)
    //   return r.model
    // })
    return true;
  },
  fetchCountries({ commit }) {
     this.$axios.$get('countries').then((r) => {
      commit('setCountries', r.model)
      return r.model
    })
  },
   fetchRegion({ commit }, item) {
    console.log(item)
     this.$axios.$get('regions', { params: { CountryId: item.Country } }).then((r) => {
      commit('setRegion', r.model)
      return r.model
    })
  },
   fetchCities({ commit }, item) {
     this.$axios.$get('cities', { params: { CountryId: item.Country, RegionId: item.Region } }).then((r) => {
      commit('setCities', r.model)
      return r.model
    })
  },
 fetchRequestType({ commit }) {
     this.$axios.$get('requestsType').then((r) => {
      commit('setRequestType', r.model)
      return r.model
    })
  },
  async getCategories({ commit }) {
    await this.$axios.$get('categories').then((r) => {
      commit('setCategories', r.model)
      return r.model
    })
  },

  filter({ commit, state, dispatch }, data) {
    commit('setFilters', data)
    dispatch('getProducts', state.filters)
  },
  async getProducts({ commit }, params = {}) {
    return await this.$axios.$get('products', { params }).then((r) => {
      commit('setProducts', r.model)
    })
  },
  logout({ commit, dispatch }) {
    commit('resetData');
    dispatch("getProducts");
    dispatch("getCarts");
  },
  checkLogin({ commit }) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      commit('setSignedIn', true)
    }
  },
  async getCarts({ commit }) {
    let cart = localStorage.getItem('cart');
    const token = localStorage.getItem('accessToken');
    cart = JSON.parse(cart)
    
    if (token) {
      if (cart) {
        for(const c of cart){
          await this.$axios.$post('cart', {
            productId: c.product.id,
            quantity: c.quantity,
          });
        }
        // await cart.forEach(async (c) => {
        //   console.log('1')
        // });
        localStorage.setItem('cart', '[]');
      }
      const cartRes = await this.$axios.$get('cart')
        commit('setCart', cartRes.model.cartItems);
        commit('setCartTotal', cartRes.model.totalAmount);
    } else {
      if (!cart) {
      localStorage.setItem('cart', '[]');
      commit('setCart', [])
    }
      commit('setCart', cart)
    }
  },
async  addCart({ commit }, data) {
    const token = localStorage.getItem('accessToken');
    try {
    if (token) {
   await   this.$axios
        .$post('cart', { productId: data.product.id, quantity: 1 })
        .then(r => {
          commit('setCart', r.model.cartItems ? r.model.cartItems : []);
          commit('setCartTotal', r.model.totalAmount);
        });
    } else {
      commit('addToCart', data);
    }
  }  catch (error) {

    // Reject the Promise with the error
    return Promise.reject(error);
  }
  },
  setCartQuantity({ commit }, data) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.$axios
        .$post("cart/set", {productId:data.product.id, quantity: data.quantity})
        .then(r => {
          if(r){
            commit('setCart', r.model.cartItems ? r.model.cartItems : []);
            commit('setCartTotal', r.model.totalAmount);
          }
        });
    } else {
      commit('setCartQuantity', data);
    }
  },
 async decreaseCart({ commit }, data, quantity=1) {
    const token = localStorage.getItem('accessToken')
    if (token) {
    await  this.$axios
        .$post("cart/remove", {productId:data.product.id, quantity})
        .then(r => {
          if(r){
            commit('setCart', r.model.cartItems ? r.model.cartItems : []);
            commit('setCartTotal', r.model.totalAmount);
          }
        });
    } else {
      commit('decreaseCart', data, true)
    }
  },
 async deleteCart({ commit }, data) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      await   this.$axios.$delete(`cart/${data.id}`)
      .then(r => {
          if(r){
            commit('deleteCart', data)
            commit('setCart', r.model.cartItems ? r.model.cartItems : []);
            commit('setCartTotal', r.model.totalAmount);
          }
        });
    } else {
      commit('deleteCart', data)
    }
  },
  async fetchFooter({commit}) {
    return await this.$axios.$get('settings/footer')
    .then((res) => {
      commit('setFooter', res.model)
    })
  }
}

// mutations
export const mutations = {
  setCountries(state, data) {
    state.countries = data
  },
  setRegion(state, data) {
    state.region = data
  },
  setCities(state, data) {
    state.cities = data
  },
  setRequestType(state, data) {
    state.requestType = data
  },
  setLoginDialog(state, data) {
    state.loginDialog = data
  },
  setSignedIn(state, data) {
    state.signedIn = data
  },
  setUser(state, data) {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data))
      state.user = data
    } else {
      localStorage.removeItem('user')
      state.user = {
        id: null
      }
    }
  },
  setRole(state, data) {
    if (data) {
      localStorage.setItem('role', data)
      state.role = data
    } else {
      localStorage.removeItem('user')
      state.role = null
    }
  },
  setFilters(state, data) {
    Object.assign(state.filters, data)
  },
  setCategories(state, data) {
    state.categories = data
  },
  setProducts(state, data) {
    state.products = data
  },
  setFavorite(state, data) {
    //{ isFavorite: this.isFavorite, product: this.product }
    console.log(data)
  },
  resetData(state, data = null) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    state.user = null
    state.role = null
    state.cart = []
    state.signedIn = false
  },
  setCart(state, data) {
    state.cart = data
  },
  setCartTotal(state, data) {
    state.cartTotal = data
  },
  addToCart(state, data) {
    let productExist = false;
    const token = localStorage.getItem('accessToken');
    state.cart = state.cart.map((c) => {
      if (c.product.id === data.product.id) {
        productExist = true;
        if (!token) {
          c.quantity += 1;
          c.qtyPrice = c.product.salePrice * c.quantity;
        } else {
          c = data;
        }
      }
      return c
    });
    if (!productExist) {
      if (!token) {
        data.quantity = 1;
        data.qtyPrice = data.product.salePrice * data.quantity;
      }
      state.cart.push(data);
    }
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  setCartQuantity(state, data) {
    const token = localStorage.getItem('accessToken');
    console.log(state.cart)
    state.cart = state.cart.map((c) => {
      if (c.product.id === data.product.id) {
        if (!token) {
          c.quantity = data.quantity;
          c.qtyPrice = c.product.salePrice * c.quantity;
        } else {
          c = data;
        }
      }
      return c
    })
    const carts = state.cart.filter((c) => c.quantity !== 0)
    state.cart = carts
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  decreaseCart(state, data) {
    const token = localStorage.getItem('accessToken');
    state.cart = state.cart.map((c) => {
      console.log(c)
      if (c.product.id === data.product.id) {
        if (!token) {
          c.quantity -= 1;
          c.qtyPrice = c.product.salePrice * c.quantity;
        } else {
          c = data;
        }
      }
      return c
    })
    const carts = state.cart.filter((c) => c.quantity !== 0)
    state.cart = carts
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  deleteCart(state, data) {
    const carts = state.cart.filter((c) => c.product.id !== data.product.id)
    state.cart = carts
    if (!localStorage.getItem('accessToken')) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  setFooter(state, data) {
    state.footer = data
  },

}
