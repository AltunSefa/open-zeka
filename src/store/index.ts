// src/store/index.ts
import { createStore } from 'vuex';
import { users } from './modules/users';
import { User } from '@/types/User';


// RootState tipini tanımlıyoruz
export interface RootState {
  // Her modülün state'ini burada belirtin
  users: User[];

}

// Store'u modüllerle birlikte oluşturun
export default createStore<RootState>({
  modules: {
    users,
  }
});
