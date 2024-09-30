// src/store/modules/albums.ts
import { Module } from 'vuex';
import axios from 'axios';
import { Album } from '@/types/Albums';
import { RootState } from '@/store/index';

export interface AlbumsState {
    albums: Album[];
    selectedAlbum: Album | null; // Seçili albüm için yeni state
}

export const albums: Module<AlbumsState, RootState> = {
    state: {
        albums: [],
        selectedAlbum: null, // Başlangıçta seçili albüm yok
    },
    mutations: {
        SET_ALBUMS(state, albums: Album[]) {
            state.albums = albums;
        },
        SET_SELECTED_ALBUM(state, album: Album | null) {
            state.selectedAlbum = album;
        }
    },
    actions: {
        async fetchAlbums({ commit }, userId: number) {
            try {
            const response = await axios.get<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
            commit('SET_ALBUMS', response.data);
            } catch (error) {
            console.error('Error fetching albums:', error);
            }
        },
        selectAlbum({ commit }, album: Album) {
            commit('SET_SELECTED_ALBUM', album);
        }
    },
    getters: {
        allAlbums(state): Album[] {
            return state.albums;
        },
        getAlbumById: (state) => (id: string) => {
            const albumId = Number(id); 
            const album = state.albums.find((album) => album.id === albumId);
            state.selectedAlbum = album || null;
            return album; 
        },
        getSelectedAlbum(state): Album | null { 
            return state.selectedAlbum;
        },
    }
};
