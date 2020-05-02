<template>
  <div>
    <add-todo></add-todo>
    <div
      v-show="this.$store.state.todosList.length === 0"
      style="margin-bottom:20px;"
    >There is no todos</div>

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
        :checkAll="anyRemaining"
        class="todo-item"
      ></todo-item>
    </transition-group>
    <div class="extra-container">
      <check-all></check-all>
      <todos-left></todos-left>
    </div>
    <div class="extra-container">
      <todos-filter></todos-filter>
      <clear-completed></clear-completed>
    </div>
  </div>
</template>

<script>
import TodoItem from "./Todo-Item";
import TodosLeft from "./Todos-Left";
import CheckAll from "./Check-All";
import TodosFilter from "./Todos-Filter";
import ClearCompleted from "./Clear-Completed";
import AddTodo from "./add-todo";

export default {
  components: {
    TodoItem,
    TodosLeft,
    CheckAll,
    TodosFilter,
    ClearCompleted,
    AddTodo
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.remaining == 0;
    },
    todosListFiltered() {
      return this.$store.getters.todosListFiltered;
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
