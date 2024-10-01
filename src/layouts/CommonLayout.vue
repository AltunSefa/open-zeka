<template>
    <v-app>
      <v-container fluid>
        <v-row>
          <v-col cols="3" class="pa-0 custom-col">
            <v-list density="compact" nav>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, index) in navItems"
                  :key="index"
                  :class="{ active: selectedTab === item.component }"
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
  
          <v-col cols="9">
            <slot /> 
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>
  
<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();
    const userId = route.params.id;

    const navItems = ref([
        { title: 'Genel Bilgiler', icon: 'mdi-information', component: 'UserInfo' },
        { title: 'Gönderiler', icon: 'mdi-post', component: 'UserPosts' },
        { title: 'Yorumlar', icon: 'mdi-comment', component: 'UserComments' },
        { title: 'Albümler', icon: 'mdi-album', component: 'UserAlbums' },
        { title: 'Fotoğraflar', icon: 'mdi-image', component: 'UserPhotos' },
        { title: 'Yapılacaklar', icon: 'mdi-check', component: 'UserTodos' },
    ]);

    const selectedTab = ref('UserInfo'); 

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