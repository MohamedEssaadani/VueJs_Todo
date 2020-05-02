<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What you have to do?"
      v-model="todo"
      @keyup.enter="addTodo()"
    />
  </div>
</template>

<script>
export default {
  name: "add-todo",
  data() {
    return {
      todo: "",
      todoId: 5
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
      this.$store.dispatch("addTodo", todo);
      this.todo = "";
      this.todoId += 1;
    }
  }
};
</script>