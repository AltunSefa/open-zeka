<template>
  <CommonLayout>
    <div class="d-flex flex-column align-center">
    <v-card class="custom-card"  >
        <v-card-title>
            <v-avatar size="100">
                {{ initials }}
            </v-avatar>
        </v-card-title>
        <v-card-title>
            <h2>{{ user.username }}</h2>
            <v-divider :thickness="2"></v-divider>
        </v-card-title>
        <v-card-text>
            <p><strong>Ad:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Website:</strong> {{ user.website }}</p>
            <p><strong>Telefon:</strong> {{ user.phone }}</p>
        </v-card-text>
    </v-card>
    </div>
  </CommonLayout>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CommonLayout from '@/layouts/CommonLayout.vue';
  import { onMounted } from 'vue';

  const store = useStore();
  const route = useRoute();
  
  const user = ref(
    {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: ''
    }
  );

  onMounted(async () => {
    const userId = route.params.id;

    if (userId) {
      user.value = await store.getters.getUserById(userId);
      console.log("user", user.value);
    }
  });


  const initials = computed(() => {
    return user.value.name.split(' ').map(name => name[0]).join('');
  });

 
  </script>

  <style scoped>
    .title {
        font-size: 24px;
        font-weight: bold;
    }
    .custom-card {
        align-items: center;
    }
</style>
  