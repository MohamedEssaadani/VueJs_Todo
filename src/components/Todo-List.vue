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
    <div v-for="(todo, index) in todosList" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed" />
        <div
          v-if="!todo.editing"
          @dblclick="editTodo(todo)"
          class="todo-item-label"
          :class="{completed: todo.completed}"
        >{{todo.title}}</div>
        <input
          v-else
          type="text"
          v-model="todo.title"
          @blur="updateTodo(todo)"
          @keyup.enter="updateTodo(todo)"
          @keyup.esc="cancelEdit(todo)"
          v-focus
          class="todo-item-edit completed"
        />
      </div>

      <div class="remove-item" @click="remove(index)">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
      //keep title inside it when user try to edit for canceling purpose
      cacheTitle: "",
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
    remove(index) {
      this.todosList.splice(index, 1);
    },
    editTodo(todo) {
      todo.editing = true;
      this.cacheTitle = todo.title;
    },
    updateTodo(todo) {
      if (todo.title == "") {
        todo.title = this.cacheTitle;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.editing = false;
      //when user desicde to cancel editing without changing then we get title to the old value
      todo.title = this.cacheTitle;
    }
  },
  directives: {
    //custom directive his name is focus
    focus: {
      //when we use it he will do the work when the element that use this directive is inserted to the dom
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
</style>
