<template>
  <CommonLayout>
    <div class="d-flex flex-column align-center">
      <h2>Posts</h2>
     
      <div v-if="true" class="div"> 
          <div  v-for="post in posts" :key="post.id" class="mb-5">
            
            <v-card class="p-4 custom-card" style="width: 600px; height: 200px;">
              <div class="d-flex flex-column">
                <div class="d-flex flexjustify-space-between align-center mt-3" style=" padding-left: 15px;">
                  <v-avatar size="40" class="mr-3">
                    {{ initials }}
                  </v-avatar>
                  <p class="mr-3" style="color: gray;">{{ user.username }}</p> |
                  <p style="color: gray;"> {{ user.email }}</p>
                </div>
                <div>                
                  <v-card-text class="d-flex flex-column align-start text-left" style="padding-left: 10px;">
                    <div class="d-flex align-center" style="margin-bottom: 15px;">
                        <v-icon left size="10">mdi-note-text</v-icon>
                      <p style="color: #212121; margin-left: 5px;">{{ post.title }}</p>
                    </div>
                    <p>{{ post.body }}</p>
                  </v-card-text>
                </div>
              </div>
            </v-card>
            <v-divider :thickness="2" class="mt-5" style="width: 600px; "></v-divider>
          </div>
          
          
      </div>
      <div v-else class="div">
            <p>Gönderi bulunamadı.</p>
          </div>
      

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
  const posts = ref([])
  
  console.log("çalıştı");
  
  
  onMounted(async () => {
    const userId = route.params.id;
    if (userId) {
      user.value = await store.getters.getUserById(userId);
      console.log("userVALLL", user.value);
      await store.dispatch('fetchPosts', userId);
      posts.value = store.getters.allPosts;
    
    }
  });

  


  console.log("posts", posts);
  
  
  const initials = computed(() => {
    return user.value.name.split(' ').map(name => name[0]).join(''); 
  });
  </script>
  

<style scoped lang="scss">
  .custom-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  border-color: #00ACC1;

  .v-avatar {
    border-color: #00ACC1;
  }
}
</style>
  