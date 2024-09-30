<template>
    <div>
      <h2>Yapılacaklar</h2>
      <template v-if="todos.length">
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            {{ todo.title }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p>Yapılacak bulunamadı.</p>
      </template>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      console.log("user", props.user);
      const store = useStore()
      const todos = computed(() => store.getters.allTodos)
      store.dispatch('fetchTodos', props.user.id)
      console.log("todos", todos);
      return {
        todos
      }
    }

  }
  </script>
  