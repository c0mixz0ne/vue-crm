import { createStore } from 'vuex'
import customAuth  from './customAuth'
import addCategory  from './category'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER

      var myHeaders = new Headers();
      myHeaders.append("apikey", key);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

      // let res = await fetch("https://api.apilayer.com/fixer/latest?symbols=USD%2CEUR%2CRUB&base=EUR", requestOptions)
      // let resJson = await res.json()
      let resJson = { "success": true, "timestamp": 1519296206, "base": "EUR", "date": "2023-04-07", "rates": { "RUB": 1.566015, "USD": 1.560132, "EUR": 1.060132} }
      return resJson
    }
  },
  modules: {
    customAuth, info, addCategory
  }
})
