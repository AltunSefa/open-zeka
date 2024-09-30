<template>
    <div>
      <h2>Albümler</h2>
      <template v-if="albums.length">
        <ul>
          <li v-for="album in albums" :key="album.id">
            {{ album.title }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p>Albüm bulunamadı.</p>
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
      const store = useStore()
      const albums = computed(() => store.getters.allAlbums)
      store.dispatch('fetchAlbums', props.user.id)
      console.log("albums", albums);
      return {
        albums
      }
    }
  }
  </script>
  