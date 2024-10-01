// src/store/modules/comments.ts
// Import necessary modules and types
import { Module } from 'vuex';
import axios from 'axios';
import { Comment } from '@/types/Comments';
import { RootState } from '@/store/index';

// Define the state interface for comments
export interface CommentsState {
    comments: Comment[];
    selectedComment: Comment | null;
}

// Define the Vuex module for comments
export const comments: Module<CommentsState, RootState> = {
    // Initial state
    state: {
        comments: [],
        selectedComment: null,
    },
    // Mutations to modify the state
    mutations: {
        // Set the comments array in the state
        SET_COMMENTS(state, comments: Comment[]) {
            state.comments = comments;
        },
        // Set the selected comment in the state
        SET_SELECTED_COMMENT(state, comment: Comment | null) {
            state.selectedComment = comment;
        },
    },
    // Actions to perform asynchronous operations
    actions: {
        // Fetch comments from an API and commit the result to the state
        async fetchComments({ commit }, userId: number) {
            const postsResponse = await axios.get<{ id: number }[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const postIds = postsResponse.data.map(post => post.id);
            const commentsPromises = postIds.map(postId => axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`));
            const commentsResponses = await Promise.all(commentsPromises);
            const comments = commentsResponses.flatMap(response => response.data);

            commit('SET_COMMENTS', comments);
        },
        // Select a comment by ID and commit the result to the state
        selectComment({ commit, state }, id: string) {
            const commentId = Number(id);
            const comment = state.comments.find((comment) => comment.id === commentId) || null;
            commit('SET_SELECTED_COMMENT', comment);
        },
    },
    // Getters to access the state
    getters: {
        // Get all comments from the state
        allComments(state): Comment[] {
            return state.comments;
        },
        // Get the selected comment by ID from the state
        getCommentById: (state) => (id: string) => {
            return state.selectedComment;
        },
    }
};
