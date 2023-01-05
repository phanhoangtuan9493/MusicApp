import { createAction } from '@reduxjs/toolkit'
import { PlayerFavorites, PlayerPlaylist, PlaylistSearch, Song, SongSearch, StreamSong } from '../services/constansts'

export const requestHomeData = createAction('REQUEST_HOME_DATA')
export const playSongData = createAction<Song | SongSearch>('PLAY_SONG_DATA')
export const changePlayingState = createAction<boolean>('CHANGE_PLAY_STATE')
export const addFavoriteSong = createAction<StreamSong>('ADD_FAVORITE_SONG')
export const removeFavoriteSong = createAction<StreamSong>('REMOVE_FAVORITE_SONG')
export const requestSearchData = createAction<string>('REQUEST_SEARCH_DATA')
export const clearRecentSearchData = createAction('CLEAR_RECENT_SEARCH_DATA')
export const removeRecentSearchData = createAction<PlaylistSearch | SongSearch>('REMOVE_RECENT_SEARCH_DATA')
export const addRecentSearchData = createAction<PlaylistSearch | SongSearch>('ADD_RECENT_SEARCH_DATA')
export const requestFavoritesData = createAction('REQUEST_FAVORITES_DATA')
export const setPlayerFavoritesData = createAction<PlayerFavorites>('SET_PLAYER_FAVORITES_DATA')
export const playFavoritesData = createAction<number>('PLAY_FAVORITES_DATA')
export const requestPlaylistData = createAction<string>('REQUEST_PLAYLIST_DATA')
export const playPlaylistData = createAction<number>('PLAY_PLAYLIST_DATA')
export const setPlayerPlaylistData = createAction<PlayerPlaylist>('SET_PLAYER_PLAYLIST_DATA')


