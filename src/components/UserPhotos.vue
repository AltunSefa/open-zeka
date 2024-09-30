<template>
  <div>
    <h2>fotolar</h2>
    <template v-if="photos.length">
      <ul>
        <li v-for="photo in photos" :key="photo.id">
          {{ photo.title }}
        </li>
      </ul>
    </template>
    <template v-else>
      <p>Foto bulunamadı.</p>
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
    const photos = computed(() => store.getters.allPhotos)
    store.dispatch('fetchPhotos', props.user.id)
    console.log("photos", photos);
    return {
      photos
    }  
  }
}
</script>
