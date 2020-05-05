<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/images/todoPic.png" class="logo" />
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/Todo-List";

export default {
  name: "App",
  components: {
    "todo-list": TodoList
  }
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
