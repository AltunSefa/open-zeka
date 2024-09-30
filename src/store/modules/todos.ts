// src/store/modules/todos.ts
import { Module } from 'vuex';
import axios from 'axios';
import { Todo } from '@/types/Todos';
import { RootState } from '@/store/index';

export interface TodosState {
    todos: Todo[];
    selectedTodo: Todo | null; // Seçili todo için yeni state
}

export const todos: Module<TodosState, RootState> = {
    state: {
        todos: [],
        selectedTodo: null, // Başlangıçta seçili todo yok
    },
    mutations: {
        SET_TODOS(state, todos: Todo[]) {
            state.todos = todos;
        },
        SET_SELECTED_TODO(state, todo: Todo | null) {
            state.selectedTodo = todo;
        },
    },
    actions: {
        async fetchTodos({ commit }) {
            const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
            commit('SET_TODOS', response.data);
        },
        selectTodoById({ commit, state }, id: string) {
            const todoId = Number(id);
            const todo = state.todos.find((todo) => todo.id === todoId) || null;
            commit('SET_SELECTED_TODO', todo);
        },
    },
    getters: {
        allTodos(state): Todo[] {
            return state.todos;
        },
        getTodoById: (state) => (id: string) => {
            const todoId = Number(id);
            return state.todos.find((todo) => todo.id === todoId) || null;
        },
        getSelectedTodo(state): Todo | null {
            return state.selectedTodo;
        },
    }
};
