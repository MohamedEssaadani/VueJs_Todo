<template>
  <div>({{ remaining }}) tasks left</div>
</template>

<script>
export default {
  name: "todos-left",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>