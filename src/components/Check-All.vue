<template>
  <div>
    <label>
      <input type="checkbox" @change="checkAll()" :checked="this.anyRemaining" />
      Check All
    </label>
  </div>
</template>

<script>
// import { eventBus } from "../main";

export default {
  name: "check-all",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    checkAll() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>