<template>
  <div class="ToDo">
    <h1>{{ msg }}</h1>
    <label>What Needs to be done?</label>
    <br/>
    <input type="text" @keydown.enter="addItem"/>
    <br/>
    <select v-model="mode" @click="loadCompleted">
      <option selected value="all">All</option>
      <option value="completed" >Completed</option>
      <option value="notCompleted" >Not Completed</option>

    </select>
    <ul v-if="mode == 'all'">
      <li v-for="item in all" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item)">x</button>
        </div>
      </li>
    </ul>
    <ul v-else-if="mode == 'completed'">
      <li v-for="item in completed" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item)">x</button>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in notCompleted" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item)">x</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ToDo',
  data () {
    return {
      msg: 'To Do App',
      mode: 'all',
      currId: 1,
      all: [],
      completed: [],
      notCompleted: []

    }
  },
  methods: {
    addItem (event) {
      // add item to all list
      this.all.push({ id: this.currId, todo: event.target.value, completed: false })
      // add to not completed list
      this.notCompleted = this.all.filter(item => item.completed === false)
      axios.post('http://localhost:4000/', {
        id: this.currId,
        todo: event.target.value,
        completed: false
      })
        .then(response => {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      event.currentTarget.value = ''
      this.currId = this.currId + 1
    },
    removeItem (item) {
      console.log('delete')
      console.log(item)
      this.all = this.all.filter(i => i.todo !== item.todo)
      this.loadCompleted()
      axios.delete('http://localhost:4000/', {
        data: {
          id: item.id
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // when user switches options or checks, load arrays with correct items
    loadCompleted () {
      this.completed = this.all.filter(item => item.completed === true)
      this.notCompleted = this.all.filter(item => item.completed === false)
    },
    checkCompleted (item) {
      for (let i = 0; i < this.all.length; i++) {
        if (this.all[i].todo === item.todo) {
          this.all[i].completed = !this.all[i].completed
        }
        axios.patch('http://localhost:4000/', {
          id: item.id
        })
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.loadCompleted()
      }
    }
  },
  mounted () {
    // get all to-do items from db
    axios
      .get('http://localhost:4000')
      .then(response => {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
          this.all.push({ id: response.data[i].id, todo: response.data[i].todo, completed: Boolean(response.data[i].completed) })
          this.currId = this.currId + 1
        }
      })
      .then(() => {
        console.log(this.all)
        this.loadCompleted()
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
