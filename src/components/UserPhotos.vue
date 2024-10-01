<template>
  <CommonLayout >
  <div>
    <h2>fotolar</h2>
    <template v-if="photos.length">
      <v-row>
        <v-col v-for="photo in photos" :key="photo.id" cols="12" sm="6" md="4">
          <v-card>
            <v-img :src="photo.url" :alt="photo.title"></v-img>
            <v-card-title>{{ photo.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <p>Foto bulunamadı.</p>
    </template>
  </div>
</CommonLayout>
</template>

<script setup>
import CommonLayout from '@/layouts/CommonLayout.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
 

const store = useStore();
const route = useRoute();
const user = ref(null);
const albums = ref([]);
const photos = ref([]);



onMounted( async() => {
  const userId = route.params.id;
  if (userId) {
    user.value = store.getters.getUserById(userId);
    await store.dispatch('fetchAlbums', userId);
    albums.value = store.getters.allAlbums;
    await store.dispatch('fetchPhotos', userId);
    photos.value = store.getters.allPhotos;
  }
})
</script>
