<template>
  <div>
    <transition name="fade">
      <!--i will use a computed property called clearCompleted to show the button just when there is completed todos-->
      <button v-show="showClearCompleted" @click="clearCompleted()">Clear Completed</button>
    </transition>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "clear-completed",
  props: {
    showClearCompleted: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      eventBus.$emit("clearCompleted");
    }
  }
};
</script>