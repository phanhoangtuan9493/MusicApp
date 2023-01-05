import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../source/reducer/HomeReducer'
import playerReducer from '../source/reducer/PlayerReducer'
import createSagaMiddleware from 'redux-saga'
import watcher from '../source/saga/watcher'
import SearchReducer from '../source/reducer/SearchReducer'
import FavoritesReducer from '../source/reducer/FavoritesReducer'
import PlaylistReducer from '../source/reducer/PlaylistReducer'


const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
  reducer: {
    home: homeReducer,
    player: playerReducer,
    searchResult: SearchReducer,
    favorites: FavoritesReducer,
    playlist: PlaylistReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(watcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
