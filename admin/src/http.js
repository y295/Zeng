import axios from "axios"
import Vue from 'vue'
import router from './router'

const http = axios.create({
  //baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  baseURL: 'http://localhost:3000/admin/api'
})

// Add a response interceptor
http.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, (error) => {
  if (error.response.status === 422) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.message
    })
  }
  if (error.response.status === 401) {
    router.push('/login')
  }

  // Do something with response error
  return Promise.reject(error);
});

export default http;