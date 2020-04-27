<template>
  <div>
    <label>
      <input type="checkbox" @change="checkAll()" :checked="this.anyRemaining" />
      Check All
    </label>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "check-all",
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    checkAll() {
      eventBus.$emit("checkAll");
    }
  }
};
</script>