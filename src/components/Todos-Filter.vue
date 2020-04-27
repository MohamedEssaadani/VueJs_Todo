<template>
  <div>
    <button :class="{ active : filterTodos == 'all'}" @click="filter('all')">All</button>
    <button :class="{ active : filterTodos == 'active'}" @click="filter('active')">Active</button>
    <button :class="{ active : filterTodos == 'completed'}" @click="filter('completed')">Completed</button>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "todos-filter",
  data() {
    return {
      filterTodos: "all"
    };
  },
  methods: {
    filter(value) {
      this.filterTodos = value;
      eventBus.$emit("filter", value);
    }
  }
};
</script>