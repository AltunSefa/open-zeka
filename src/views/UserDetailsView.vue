<template>
  <div class="user-details">
    <UsersDetails :user="user" /> 
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import UsersDetails from '@/components/UserDetails.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const user = computed(() => {
  const userId = route.params.id;
  console.log("userId", userId);
  return store.getters.getUserById(userId); 
});
</script>
