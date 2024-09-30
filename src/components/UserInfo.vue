<template>
    <div>
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
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import VAvatar from 'vuetify';
  const store = useStore();
  export default {
    components: {
      VAvatar
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      initials() {
        return this.user.name.split(' ').map(name => name[0]).join('');
      }
    }
    

  }
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
  