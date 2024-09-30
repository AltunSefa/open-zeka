<template>
  <div class="user-details">
    <UsersDetails :user="user" /> 
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import UsersDetails from '@/components/UserDetails.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserDetailsView',
  components: {
    UsersDetails,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const user = computed(() => {
      const userId = route.params.id;
      console.log("userId", userId);
      return store.getters.getUserById(userId); 
    });

    return {
      user,
    };
  },
});
</script>
