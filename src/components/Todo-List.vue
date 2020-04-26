<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What you have to do?"
      v-model="todo"
      @keyup.enter="addTodo"
    />

    <div v-show="this.todosList.length === 0">There is no todos</div>

    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="(todo, index) in todosListFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @removed="removeTodo()"
        @updated="updateTodo"
        class="todo-item"
      ></todo-item>
    </transition-group>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" @change="checkAll()" :checked="this.anyRemaining" />
          Check All
        </label>
      </div>
      <div>({{ remaining }}) items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active : filter == 'all'}" @click="filter = 'all' ">All</button>
        <button :class="{ active : filter == 'active'}" @click="filter = 'active' ">Active</button>
        <button :class="{ active : filter == 'completed'}" @click="filter = 'completed' ">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <!--i will use a computed property called clearCompleted to show the button just when there is completed todos-->
          <button v-show="showClearCompleted" @click="clearCompleted()">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./Todo-Item";

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      todo: "",
      //keep title inside it when user try to edit for canceling purpose
      cacheTitle: "",
      filter: "all",
      todoId: 5,
      todosList: [
        {
          id: 1,
          title: "Complete Schop Refactoring",
          completed: true,
          editing: false
        },
        {
          id: 2,
          title: "Create Todos List Vue Js",
          completed: true,
          editing: false
        },
        {
          id: 3,
          title: "Practice ELOQUENT",
          completed: false,
          editing: false
        },
        {
          id: 4,
          title: "Do Axios Get Request",
          completed: false,
          editing: false
        }
      ]
    };
  },
  methods: {
    addTodo() {
      //check if the user enter an empty text
      if (this.todo === "") {
        return;
      }

      //create an object for user todo
      let todo = {
        id: this.todoId,
        title: this.todo,
        completed: false,
        editing: false
      };

      //add todo to the todos list
      this.todosList.push(todo);
      this.todo = "";
      this.todoId += 1;
    },
    removeTodo(index) {
      this.todosList.splice(index, 1);
    },
    editTodo(todo) {
      todo.editing = true;
      this.cacheTitle = todo.title;
    },
    updateTodo(data) {
      //remove old todo & replace it with new todo
      this.todosList.splice(data.index, 1, data.updatedTodo);
    },
    cancelEdit(todo) {
      todo.editing = false;
      //when user desicde to cancel editing without changing then we get title to the old value
      todo.title = this.cacheTitle;
    },
    checkAll() {
      this.todosList.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todosList = this.todosList.filter(todo => !todo.completed);
    }
  },
  computed: {
    remaining() {
      return this.todosList.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining == 0;
    },
    todosListFiltered() {
      var todos = undefined;
      if (this.filter == "all") {
        todos = this.todosList;
      }
      if (this.filter == "active") {
        todos = this.todosList.filter(todo => !todo.completed);
      }
      if (this.filter == "completed") {
        todos = this.todosList.filter(todo => todo.completed);
      }
      return todos;
    },
    showClearCompleted() {
      //create new array for the completed todos
      let todosCompleted = this.todosList.filter(todo => todo.completed);

      //return true if there is completed todos & false if not
      return todosCompleted.length > 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
.todo-input:focus {
  outline: 0;
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}

.remove-item:hover {
  color: red;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
}

.todo-item-edit:focus {
  outline: none;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 15px;
  background-color: white;
  appearance: none;
}

button:hover {
  background: lightgreen;
  cursor: pointer;
}

button:focus {
  outline: none;
}

.active {
  background: lightgreen;
}

/*transition for clear completed button*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
