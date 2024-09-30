<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="3" class="pa-0">
          <NavbarComponent :user="user" :selected-tab="selectedTab" @tab-selected="updateSelectedTab" />
        </v-col>

        <v-col cols="9">
          <component :is="selectedTab" :user="user" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import UserPosts from './UserPosts.vue';
import UserInfo from './UserInfo.vue';
import UserComments from './UserComments.vue';
import UserAlbums from './UserAlbums.vue';
import UserPhotos from './UserPhotos.vue';
import UserTodos from './UserTodos.vue';

export default {
  components: {
    NavbarComponent,
    UserPosts,
    UserComments,
    UserAlbums,
    UserPhotos,
    UserTodos,
    UserInfo,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: 'UserInfo', 
    };
  },
  methods: {
    updateSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
}
</script>

<style scoped>
.pa-0 {
  padding: 0 !important;
}
</style>
