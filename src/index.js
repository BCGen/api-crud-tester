import '../public/index.html'
import Vue from 'vue'
import GetList from './components/GetList.vue'
import PostData from './components/PostData.vue'
import InputUrl from './components/InputUrl.vue'

window.axios = require('axios')

new Vue({
  components: {
    GetList,
    PostData,
    InputUrl
  },
  data: {
    data: [],
    url: Cookies.get('request_url') || ''
  },
  computed: {
    fields () {
      if (this.data.length > 0) {
        return Object.keys(this.data[0])
      } else {
        return []
      }
    }
  },
  watch: {
    url (newValue, oldValue) {
      Cookies.set('request_url', newValue, { expires: 7 })
    }
  },
  methods: {
    getList (value) {
      this.data = value
    },
    createData (value) {
      this.data.push(value)
    },
    deleteData (index) {
      this.data.splice(index, 1)
    }
  }
}).$mount('#app')
