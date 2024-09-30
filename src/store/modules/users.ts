// src/store/modules/users.ts
import { Module } from 'vuex';
import axios from 'axios';
import { User } from '@/types/User';
import { RootState } from '@/store/index';

export interface UsersState {
  users: User[];
  selectedUser: User | null; // Seçili kullanıcı için yeni state
}

export const users: Module<UsersState, RootState> = {
  state: {
    users: [],
    selectedUser: null, // Başlangıçta seçili kullanıcı yok
  },
  mutations: {
    SET_USERS(state, users: User[]) {
      state.users = users;
    },
    
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      commit('SET_USERS', response.data);
    },
    
  },
  getters: {
    allUsers(state): User[] {
      return state.users;
    },
    getUserById: (state) => (id: string) => {
      const userId = Number(id); 
      const user = state.users.find((user) => user.id === userId);
      state.selectedUser = user || null;
      return user; 
    },
    getSelectedUser(state): User | null { 
      return state.selectedUser;
    },

  }
};
