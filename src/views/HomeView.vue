<template>
  <div class="home">
    <Users msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Users from '@/components/Users.vue'; 

export default defineComponent({
  name: 'HomeView',
  components: {
    Users,
  },
});
</script>
