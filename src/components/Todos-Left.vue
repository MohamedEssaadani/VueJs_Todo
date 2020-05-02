<template>
  <div>({{ remaining }}) tasks left</div>
</template>

<script>
export default {
  name: "todos-left",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>