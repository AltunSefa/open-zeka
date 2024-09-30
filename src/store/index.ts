// src/store/index.ts
import { createStore } from 'vuex';
import { users } from './modules/users';
import { albums } from './modules/albums';
import { photos } from './modules/photos';
import { posts } from './modules/posts';
import { todos } from './modules/todos';
import { comments } from './modules/comments';
import { User } from '@/types/User';
import { Album } from '@/types/Albums';
import { Photo } from '@/types/Photos';
import { Post } from '@/types/Post';
import { Todo } from '@/types/Todos';
import { Comment } from '@/types/Comments';



// RootState tipini tanımlıyoruz
export interface RootState {
  users: User[];
  albums: Album[];  
  photos: Photo[];
  posts: Post[];
  todos: Todo[];
  comments: Comment[];

}


export default createStore<RootState>({
  modules: {
    users,
    albums,
    photos,
    posts,
    todos,
    comments,
  }
});
