<template>
  <CommonLayout>
    <div>
      <h2>Yapılacaklar</h2>
        
        <div v-for="todo in todos" :key="todo.id">
           <v-card class="mb-5" style="width: 100%;">
             <v-card-title>
              <v-icon left>mdi-account</v-icon>
               <p>{{ user.name }}</p>
             </v-card-title>
             <v-card-text>
              <p>{{ todo.title }}</p>
             </v-card-text>
          
                <v-card-actions class="justify-end">
                  <v-btn
                    v-if="todo.completed"
                    color="success"
                  >
                    Tamamlandı
                  </v-btn>
                  <v-btn
                    v-else
                    color="error"
                  >
                    Tamamlanmadı
                  </v-btn>
                </v-card-actions>
             
            </v-card>
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
  const todos = ref([])
  
  console.log("çalıştı");
  onMounted(async () => {
    const userId = route.params.id;
    if (userId) {
      user.value = await store.getters.getUserById(userId);
      console.log("userVALLL", user.value);
      await store.dispatch('fetchTodos', userId);
      todos.value = store.getters.allTodos;
    
    }
  });
  </script>
  