import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {usersReducer} from './slices/usersSlice';
import {albumsApi} from './apis/albumsApi';
import {photosApi} from './apis/photosApi';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        // we use [] not for array but for
        // a purpose of searching for the name
        // of the reducer path in the albums' api
        // and unwrap it with square brackets,
        // apparently fancy syntax, don't be startled
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} from './apis/albumsApi';
export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,
} from './apis/photosApi';