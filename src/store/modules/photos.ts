// src/store/modules/photos.ts
import { Module } from 'vuex';
import axios from 'axios';
import { Photo } from '@/types/Photos';
import { RootState } from '@/store/index';

export interface PhotosState {
    photos: Photo[];
    selectedPhoto: Photo | null;
}

export const photos: Module<PhotosState, RootState> = {
  state: {
    photos: [],
    selectedPhoto: null, // Initially no photo is selected
  },
  mutations: {
    SET_PHOTOS(state, photos: Photo[]) {
      state.photos = photos;
    },
    SET_SELECTED_PHOTO(state, photo: Photo | null) {
      state.selectedPhoto = photo;
    },
  },
  actions: {
    async fetchPhotos({ commit }, userId: number) {
      const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
      const albumIds = albumsResponse.data.map((album: { id: number }) => album.id);
      const photoPromises = albumIds.map((id: number) => axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`));
      const photosResponses = await Promise.all(photoPromises);
      const photos = photosResponses.flatMap(response => response.data);
      commit('SET_PHOTOS', photos);
    },
    selectPhoto({ commit }, photo: Photo) {
      commit('SET_SELECTED_PHOTO', photo);
    },
  },
  getters: {
    allPhotos(state): Photo[] {
      return state.photos;
    },
    getPhotoById: (state) => (id: string) => {
      const photoId = Number(id); 
      const photo = state.photos.find((photo) => photo.id === photoId);
      state.selectedPhoto = photo || null;
      return photo; 
    },
    getSelectedPhoto(state): Photo | null { 
      return state.selectedPhoto;
    },
  }
};
