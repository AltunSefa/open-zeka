<template>
  <CommonLayout > 
    <div class="d-flex flex-column align-center">
      <h2>Albums</h2>
      <template v-if="albums.length" >
        
        <v-row class="mt-5">
          <v-col v-for="album in albums" :key="album.id" cols="12" md="6" lg="4">
            <v-card class="mb-5" style="width: 100%;">
              <v-card-title>
                <v-icon left>mdi-album</v-icon>
          <p>{{ album.title }}</p>
              </v-card-title>
              <v-card-text>
          <v-icon left>mdi-account</v-icon>
          <p>{{ user.name }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
      </template>
      <template v-else>
        <p>Albüm bulunamadı.</p>
      </template>
    </div>
    </CommonLayout>
  </template>
  
  <script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import CommonLayout from '@/layouts/CommonLayout.vue'
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  
  const route = useRoute()
  const store = useStore()
  
  const user = ref(null)
  const albums = ref([])
  onMounted(async () => {
    const userId = route.params.id;
    if (userId) {
      user.value = await store.getters.getUserById(userId);
      await store.dispatch('fetchAlbums', userId);
      albums.value = store.getters.allAlbums;
    }
  });
  </script>
  