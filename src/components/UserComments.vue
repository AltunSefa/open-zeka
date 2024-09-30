<template>
    <div>
      <h2>Yorumlar</h2>
      <template v-if="comments.length">
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            {{ comment.body }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p>Yorum bulunamadı.</p>
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
    }
    ,
    setup(props) {
      const store = useStore()
      const comments = computed(() => store.getters.allComments)
      store.dispatch('fetchComments', props.user.id)
      console.log("comments", comments);
      return {
        comments
    }

  }
  }
  </script>
  