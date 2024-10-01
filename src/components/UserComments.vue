<template>
  <CommonLayout>
    <div class="d-flex flex-column align-center">
      <h2>Comments</h2>
      <template v-if="comments.length">
        
        <div v-for="comment in paginatedComments" :key="comment.id">
          <v-card class="p-4 mb-5" style="max-width: 800px; max-height: 100px;">
            <div class="div">
              <div class="d-flex justify-space-center align-center mt-3" style=" padding-left: 15px;">
                <div class="d-flex justify-space-center align-center mt-3">
                  <v-avatar size="30" class="mr-3">
                    {{ initials }}
                  </v-avatar>
                  <p class="mr-3" style="color: gray;">{{ user.username }}</p> 
                </div>
                <div class="d-flex flex-column justify-space-center align-center mt-3" style="text-align: left;">
                  <p style="color: #90A4AE;">{{ comment.name }}</p>
                  <p style="color: #546E7A;">{{ comment.body }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @next="nextPage"
          @previous="prevPage"
        ></v-pagination>
        
      </template>
      <template v-else>
        <p>Yorum bulunamadı.</p>
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
  const posts = ref([]);
  const comments = ref([]);

  onMounted(async () => {
    const userId = route.params.id;
    if (userId) {
      user.value = await store.getters.getUserById(userId);
      await store.dispatch('fetchComments', userId);
      comments.value = store.getters.allComments;
      await store.dispatch('fetchComments', userId);
      comments.value = store.getters.allComments;
    }
  });

  const initials = computed(() => {
    return user.value.name.split(' ').map(name => name[0]).join('');
  });

  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return comments.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(comments.value.length / itemsPerPage.value);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

</script>
  