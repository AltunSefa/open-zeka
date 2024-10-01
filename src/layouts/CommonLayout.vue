<template>
    <v-app>
      <v-container fluid>
        <v-row >
          <v-col cols="3" class="pa-0 custom-col">
            <v-list density="compact" nav>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, index) in navItems"
                  :key="index"
                  :class="{ active: selectedTab === item.route }"
                  class="justify-start"
                  :prepend-icon="item.icon"
                  @click="selectTab(item.component)"
                  :ripple="{ class: 'custom-color' }"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
  
          <v-col cols="9" >
            <slot /> 
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>
  
<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRouter, useRoute } from 'vue-router';
    import { onMounted } from 'vue';

    const router = useRouter();

    const route = useRoute();
    const userId = route.params.id;

    const navItems = ref([
        { title: 'User Info', icon: 'mdi-information', component: 'UserInfo', route:"info" },
        { title: 'Posts', icon: 'mdi-post', component: 'UserPosts', route:"posts" },
        { title: 'Comments', icon: 'mdi-comment', component: 'UserComments', route:"comments" },
        { title: 'Albums', icon: 'mdi-album', component: 'UserAlbums', route:"albums" },
        { title: 'Photos', icon: 'mdi-image', component: 'UserPhotos', route:"photos" },
        { title: 'Todos', icon: 'mdi-check', component: 'UserTodos', route:"todos" },
    ]);

    const selectedTab = ref(''); 
    onMounted(() => {
        const path = route.fullPath.split("/");
        const lastRoute = path[path.length - 1];
        selectedTab.value = lastRoute;
    });
  
    



    const selectTab = (component) => {
        selectedTab.value = component;
        router.push({ name: component, params: { id: userId } });
    };
  
</script>
  
<style scoped>
.active {
  background-color: #ECEFF1;
  box-shadow: 0 10px 20px #CFD8DC !important;
}
.v-col-3 {
  width: 15% !important;
  max-width: 16% !important;
}
</style>

<style lang="scss">
.v-list {
  margin-top: 10px;
  cursor: pointer;
  width: 15%;
  height: 100vh;
  position: fixed;
  background-color: #CFD8DC;

} 

.custom-color{
  color: #ECEFF1;
}

</style>