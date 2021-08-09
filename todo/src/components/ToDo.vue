<template>
  <div class="ToDo">
    <h1>{{ msg }}</h1>
    <label>What Needs to be done?</label>
    <br/>
    <input type="text" @keydown.enter="addItem"/>
    <br/>
    <select v-model="mode">
      <option selected value="all">All</option>
      <option value="completed" @click="loadCompleted">Completed</option>
      <option value="notCompleted">Not Completed</option>

    </select>
    <ul v-if="mode == 'all'">
      <li v-for="item in all" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item.todo)">x</button>
        </div>
      </li>
    </ul>
    <ul v-else-if="mode == 'completed'">
      <li v-for="item in completed" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item.todo)">x</button>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in notCompleted" :key="item.todo">
        <div>
          <input type="checkbox" v-model="item.completed" @click="checkCompleted(item)"/>
          {{ item.todo }}
          <button @click="removeItem(item.todo)">x</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'ToDo',
  data () {
    return {
      msg: 'To Do App',
      mode: 'all',
      all: [],
      completed: [],
      notCompleted: []

    }
  },
  methods: {
    addItem (event) {
      // add item to all list
      this.all.push({ todo: event.target.value, completed: false })
      // add to not completed list
      this.notCompleted = this.all.filter(item => item.completed === false)
      event.currentTarget.value = ''
    },
    removeItem (todo) {
      this.all = this.all.filter(item => item.todo !== todo)
      this.loadCompleted()
    },
    // when user switches options, load arrays with correct items
    loadCompleted () {
      this.completed = this.all.filter(item => item.completed === true)
      this.notCompleted = this.all.filter(item => item.completed === false)
    },
    checkCompleted (item) {
      console.log('checked')
      console.log(item)
      for (let i = 0; i < this.all.length; i++) {
        if (this.all[i].todo === item.todo) {
          console.log(this.all[i].completed)
          this.all[i].completed = !this.all[i].completed
          console.log(this.all[i].completed)
        }
        this.loadCompleted()
      }
    }
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
