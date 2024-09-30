// src/store/modules/posts.ts
import { Module } from 'vuex';
import axios from 'axios';
import { Post } from '@/types/Post';
import { RootState } from '@/store/index';

export interface PostsState {
    posts: Post[];
    selectedPost: Post | null;
}

export const posts: Module<PostsState, RootState> = {
    state: {
        posts: [],
        selectedPost: null,
    },
    mutations: {
        SET_POSTS(state, posts: Post[]) {
            state.posts = posts;
        },
        SET_SELECTED_POST(state, post: Post | null) {
            state.selectedPost = post;
        },
    },
    actions: {
        async fetchPosts({ commit }, userId: number) {
            const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            commit('SET_POSTS', response.data);
        },
        selectPost({ commit }, post: Post) {
            commit('SET_SELECTED_POST', post);
        },
    },
    getters: {
        allPosts(state): Post[] {
            return state.posts;
        },
        getPostById: (state) => (id: string) => {
            const postId = Number(id);
            return state.posts.find((post) => post.id === postId) || null;
        },
        getSelectedPost(state): Post | null {
            return state.selectedPost;
        },
    }
};
