<template>
  <CommonLayout >
  <div class="d-flex flex-column align-center">
    <h2 class="mb-5">Photos</h2>
    <template v-if="photos.length">
      <v-row>
        <v-col v-for="photo in paginatedPhotos" :key="photo.id" cols="12" sm="6" md="2">
          <v-card>
            <v-img :src="photo.url" :alt="photo.title"></v-img>
            <v-card-title>{{ photo.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @next="nextPage"
        @previous="prevPage"
      ></v-pagination>
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

const currentPage = ref(1);
const itemsPerPage = ref(12);

const paginatedPhotos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return photos.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(photos.value.length / itemsPerPage.value);
});


</script>
<style>
v-card {
  width: 30%;
  height: auto;
}
</style>