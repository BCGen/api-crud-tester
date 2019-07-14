<template>
  <div>
    <h1 :style="h1Style">
      GET ALL ({{ status }})
    </h1>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="item">
          <div class="index">
            {{ index + 1 }}
          </div>
          <div class="info">
            <span
              v-for="(value, key) in item"
              :key="key"
            >
              {{ key }}:
              {{ value }}
              <br>
            </span>
          </div>
          <div class="delete">
            <i
              class="far fa-trash-alt fa-2x"
              @click="deleteData(item.id, index)"
            />
          </div>
        </div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import { timingSafeEqual } from 'crypto'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      data: [],
      h1Style: {},
      status: 'Waiting...'
    }
  },
  watch: {
    url: {
      immediate: true,
      handler (newValue, oldValue) {
        axios.get(newValue)
          .then(response => {
            const data = response.data
            if (typeof data === 'object') {
              this.$emit('get-list', data)

              console.log('GET SUCCESS!!')
              console.log(response)
              console.log('=============')

              this.h1Style.color = 'green'
              this.status = 'Success!!'
            } else {
              this.h1Style.color = 'orange'
              this.status = 'Response result is not JSON'
            }
          })
          .catch(error => {
            console.log('GET FAIL...')
            console.log(error)
            console.log('=============')

            this.data = []
            this.h1Style.color = 'red'
            this.status = 'Fail...'
            this.$emit('data-change', {})
          })
      }
    }
  },
  methods: {
    deleteData (id, index) {
      console.log(`DELETE ID = ${id}`)

      axios.delete(`${this.url}/${id}`)
        .then(response => {
          console.log('DELETE SUCCESS!!')
          console.log(response)
          console.log('=============')

          this.$emit('delete-data', index)
        })
        .catch(error => {
          console.log('DELETE FAIL...')
          console.log(error)
          console.log('=============')
        })
    }
  }
}
</script>

<style>
  li {
    list-style-type: none;
    padding: 0;
    width: 600px;
  }

  .item {
    display: flex;
  }

  .index {
    font-weight: bold;
    padding: 20px;
  }

  .info {
    display: flex;
    flex: 1;
    font-size: 20px;
    flex-direction: column;
    justify-content: space-between;
  }

  .delete {
    display: flex;
    align-items: center;
  }

  i {
    color: red;
    cursor: pointer;
    transition-duration: 0.5s;
  }

  i:hover {
    text-shadow: 2px 2px 2px gray;
  }
</style>
