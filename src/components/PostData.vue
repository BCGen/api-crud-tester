<template>
  <div class="container">
    <h1 :style="h1Style">
      POST ({{ status }})
    </h1>
    <input
      v-for="field in inputFields"
      :key="field"
      class="post-input"
      type="text"
      :placeholder="field"
      :name="field"
    >
    <button @click="postData">
      SUBMIT
    </button>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      h1Style: {},
      status: 'Waiting for Post'
    }
  },
  computed: {
    inputFields () {
      return this.fields.filter(value => value !== 'id')
    }
  },
  methods: {
    postData () {
      const inputs = document.querySelectorAll('.post-input')
      const data = {}

      inputs.forEach(input => {
        data[input.name] = input.value
      })

      axios.post(this.url, data)
        .then(response => {
          console.log('POST SUCCESS!!')
          console.log(response)
          console.log('=============')
          this.h1Style.color = 'green'
          this.status = 'Success!!'

          this.$emit('create-data', response.data)

          inputs.forEach(input => {
            input.value = ''
          })
        })
        .catch(error => {
          console.log('POST FAIL...')
          console.log(error)
          console.log('=============')

          this.h1Style.color = 'red'
          this.status = 'Fail...'
        })
    }
  }
}
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 20%;
  }

  input {
    margin: 10px;
    padding: 10px;
  }
</style>
