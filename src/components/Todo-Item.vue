<template>
  <div>
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="update()" />
      <div
        v-if="!editing"
        @dblclick="edit()"
        class="todo-item-label"
        :class="{completed: completed}"
      >{{title}}</div>
      <input
        v-else
        type="text"
        v-model="title"
        @blur="update()"
        @keyup.enter="update()"
        @keyup.esc="cancelEdit()"
        v-focus
        class="todo-item-edit"
      />
    </div>

    <div class="remove-item" @click="remove(index)">&times;</div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  methods: {
    remove(index) {
      eventBus.$emit("removed", index);
    },
    edit() {
      this.editing = true;
      this.cacheTitle = this.title;
    },
    update() {
      if (this.title == "") {
        this.title = this.cacheTitle;
      }
      this.editing = false;
      var data = {
        index: this.index,
        updatedTodo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      };
      eventBus.$emit("updated", data);
    },
    cancelEdit() {
      this.editing = false;
      //when user desicde to cancel editing without changing then we get title to the old value
      this.title = this.cacheTitle;
    }
  },
  directives: {
    //custom directive his name is focus
    focus: {
      //when we use it he will do the work when the element that use this directive is inserted to the dom
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      cacheTitle: ""
    };
  }
};
</script>