<template>
  <div>
    <transition name="fade">
      <!--i will use a computed property called clearCompleted to show the button just when there is completed todos-->
      <button v-show="showClearCompleted" @click="clearCompleted()">Clear Completed</button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "clear-completed",
  computed: {
    showClearCompleted() {
      return this.$store.getters.showClearCompleted;
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    }
  }
};
</script>