
import { Module } from 'vuex';
import axios from 'axios';
import { Comment } from '@/types/Comments';
import { RootState } from '@/store/index';

export interface CommentsState {
    comments: Comment[];
    selectedComment: Comment | null;
}

export const comments: Module<CommentsState, RootState> = {
    state: {
        comments: [],
        selectedComment: null,
    },
    mutations: {
        SET_COMMENTS(state, comments: Comment[]) {
            state.comments = comments;
        },
        SET_SELECTED_COMMENT(state, comment: Comment | null) {
            state.selectedComment = comment;
        },
    },
    actions: {
        async fetchComments({ commit }, userId: number) {
            const postsResponse = await axios.get<{ id: number }[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const postIds = postsResponse.data.map(post => post.id);
            const commentsPromises = postIds.map(postId => axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`));
            const commentsResponses = await Promise.all(commentsPromises);
            const comments = commentsResponses.flatMap(response => response.data);

            commit('SET_COMMENTS', comments);
        },
        selectComment({ commit, state }, id: string) {
            const commentId = Number(id);
            const comment = state.comments.find((comment) => comment.id === commentId) || null;
            commit('SET_SELECTED_COMMENT', comment);
        },
    },
    getters: {
        allComments(state): Comment[] {
            return state.comments;
        },
        getCommentById: (state) => (id: string) => {
            return state.selectedComment;
        },
    }
};
