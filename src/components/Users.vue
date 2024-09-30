<template>
  <v-container>
    <v-row>
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="12"
        sm="3"
      >
          <v-card
            :class="`elevation-${hoveredUser === user.id ? 24 : 6 }`"
            class="custom-card cursor-pointer"
            :ripple="{ class: 'custom-color' }"
            @mouseenter="hoveredUser = user.id"
            @mouseleave="hoveredUser = null"
            @click="write(user)"
          >
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-subtitle>{{ user.email }}</v-card-subtitle>
            <v-card-text v-if="user.company && user.company.name" class="d-flex justify-center align-end">
              <v-icon
              color="blue-darken-1"
              icon="mdi-domain"
              size="large"
              class="mr-2"
              ></v-icon>
              {{ user.company.name }}
            </v-card-text>
          </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'UserCards',
  setup() {
    const store = useStore();

    const users = computed(() => store.getters.allUsers);

    
    onMounted(() => {
      store.dispatch('fetchUsers');
    });

    const write = (user: { name: string }) => {
      console.log(user.name);
    };

    const hoveredUser = ref<number | null>(null);

    return {
      users,
      hoveredUser,
      write,
    };
  }
});
</script>

<style scoped lang="scss">
.custom-card {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;

  &.elevation-6 {
    box-shadow: 0 4px 8px ;
  }
  

  &.elevation-24 {
    box-shadow: 0 10px 20px #B2EBF2 !important ; 
    border-color: #B2EBF2;
  }
 
}

</style>
<style>
.custom-color{
  color: #B2EBF2
  ;
}

</style>