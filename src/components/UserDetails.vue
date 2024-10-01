<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="9">
          <router-view :user="user" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavbarComponent from '@/components/NavbarComponent.vue';
import { defineProps } from 'vue';
import { ref } from 'vue';

const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const selectedTab = ref('UserInfo');
router.push({ name: 'UserInfo', params: { id: props.user.id } });


function updateSelectedTab(tab) {
  if (tab === 'UserPosts') {
    router.push({ name: 'UserPosts', params: { id: props.user.id } });
  } else if (tab === 'UserComments') {
    router.push({ name: 'UserComments', params: { id: props.user.id } });
  } else if (tab === 'UserAlbums') {
    router.push({ name: 'UserAlbums', params: { id: props.user.id } });
  } else if (tab === 'UserPhotos') {
    router.push({ name: 'UserPhotos', params: { id: props.user.id } });
  } else if (tab === 'UserTodos') {
    router.push({ name: 'UserTodos', params: { id: props.user.id } });
  } else if (tab === 'UserInfo') {
    router.push({ name: 'UserInfo', params: { id: props.user.id } });
  }
}
</script>


<style scoped>
.pa-0 {
  padding: 0 !important;
}
.custom-col {
  max-width: 15% !important;
}
</style>
