import { call, fork, put, takeEvery, takeLatest, all, takeLeading } from 'redux-saga/effects'
import { getHome, getPlaylistDetail, getPlaylists, getTopicDetail, getTopics, searchByKeyword, getSong, getLyric, explore, getTopKeyword } from 'nhaccuatui-api-full'
import { AsyncStore } from '../services/AsyncStore'
import { HomeModel } from '../Home/HomeModel'
import { setGlobalHomeModel } from '../reducer/HomeReducer'
import { addFavoriteSong, addRecentSearchData, changePlayingState, clearRecentSearchData, removeFavoriteSong, removeRecentSearchData, requestFavoritesData, requestHomeData, requestSearchData, playSongData, playFavoritesData, requestPlaylistData, playPlaylistData, setPlayerFavoritesData, setPlayerPlaylistData } from '../action/Actions'
import { PayloadAction } from '@reduxjs/toolkit'
import { PlaylistSearch, PlayState, Song, SongSearch, StreamSong } from '../services/constansts'
import { PlayerModel } from '../Player/PlayerModel'
import { setPlayerSong, setPlayerFavorite, setPlayerPlaying, setPlayerState, setFavorites, setPlaylist } from '../reducer/PlayerReducer'
import TrackPlayer from 'react-native-track-player'
import { showRecentSearch, setGlobalSearchModel } from '../reducer/SearchReducer'
import { SearchModel } from '../Search/SearchModel'
import { setGlobalFavoritesModel } from '../reducer/FavoritesReducer'
import { appSelect } from '../../config/Hooks'
import { NavigationHelpers } from '../services/NavigationHelpers'
import { PlaylistModel } from '../Playlist/PlaylistModel'
import { setGlobaPlaylistModel } from '../reducer/PlaylistReducer'

function* getHomeData(): any {
    const dataApi = yield getHome()
    const dataLocal = yield AsyncStore.getRecentListening()
    const data = new HomeModel(dataApi, dataLocal)
    yield put(setGlobalHomeModel(data));
}

function* playSong(action: PayloadAction<Song | SongSearch>): any {
    const streamUrl = yield getSong(action.payload.key)
    const lyric = yield getLyric(action.payload.key)
    const isFavorite = yield AsyncStore.isFavorites(action.payload.key)

    const data = new PlayerModel()
    data.createModelFromJson({
        data: streamUrl,
        lyric: lyric,
        song: action.payload
    })

    yield put(setPlayerSong(data))
    yield put(setPlayerFavorite(isFavorite))
    yield put(setPlayerState(PlayState.Song))
    yield TrackPlayer.reset()
    yield TrackPlayer.add({
        url: data.streamSong.url
    })
    yield TrackPlayer.play();
    yield AsyncStore.addRecentListening(data.streamSong)
    yield put(requestHomeData())
}

function* changePlayState(action: PayloadAction<boolean>): any {
    yield put(setPlayerPlaying(action.payload))
}

function* addFavorite(action: PayloadAction<StreamSong>): any {
    yield AsyncStore.addFavorites(action.payload)
    yield put(setPlayerFavorite(true))
    yield put(requestFavoritesData())
}

function* removeFavorite(action: PayloadAction<StreamSong>): any {
    yield AsyncStore.removeFavorite(action.payload)
    yield put(setPlayerFavorite(false))
    yield put(requestFavoritesData())
}

function* getSearchData(action: PayloadAction<string>): any {
    if (action.payload) {
        const dataApi = yield searchByKeyword(action.payload)
        const data = new SearchModel(dataApi)
        yield put(showRecentSearch(false))
        yield put(setGlobalSearchModel(data))
    } else {
        const data: SearchModel = yield AsyncStore.getRecentSearch();
        (data.result.length > 0) ? yield put(showRecentSearch(true)) :
            yield put(showRecentSearch(false))
        yield put(setGlobalSearchModel(data))
    }
}

function* addRecentSearch(action: PayloadAction<PlaylistSearch | SongSearch>): any {
    yield AsyncStore.addRecentSearch(action.payload)
    yield put(requestSearchData(''))
}

function* clearRecentSearch(): any {
    yield AsyncStore.clearRecentSearch()
    yield put(requestSearchData(''))
}

function* removeRecentSearch(action: PayloadAction<PlaylistSearch | SongSearch>): any {
    yield AsyncStore.removeRecentSearch(action.payload)
    yield put(requestSearchData(''))
}

function* getFavoritesData(): any {
    const data: StreamSong[] = yield AsyncStore.getFavorites()
    yield put(setGlobalFavoritesModel(data))
}

function* setPlayerFavorites(action: PayloadAction<{ data: StreamSong[], index: number }>): any {
    yield put(setFavorites(action.payload.data))
    yield put(playFavoritesData(action.payload.index))
}

function* playFavorites(action: PayloadAction<number>): any {
    const dataPlayer = yield* appSelect(state => state.player);

    const data = new PlayerModel()
    data.createModelFromStreamSong(dataPlayer.favorites[action.payload])

    yield put(setPlayerSong(data))
    yield put(setPlayerFavorite(true))
    yield put(setPlayerState(PlayState.Favorites))
    yield TrackPlayer.reset()
    yield TrackPlayer.add({
        url: data.streamSong.url,
        index: action.payload
    })
    yield TrackPlayer.play();
    yield AsyncStore.addRecentListening(dataPlayer.favorites[action.payload])
    yield put(requestHomeData())
}

function* getPlaylistData(action: PayloadAction<string>): any {
    const dataApi = yield getPlaylistDetail(action.payload)
    const dataPlaylist = new PlaylistModel(dataApi)
    yield put(setGlobaPlaylistModel(dataPlaylist))
    NavigationHelpers.getInstance()?.navigateToPlaylistScreen()
}

function* setPlayerPlaylist(action: PayloadAction<{ data: PlaylistModel, index: number }>): any {
    yield put(setPlaylist(action.payload.data))
    yield put(playPlaylistData(action.payload.index))
}

function* playPlaylist(action: PayloadAction<number>): any {
    const dataPlayer = yield* appSelect(state => state.player);
    const song = dataPlayer.playlistModel.songs[action.payload]

    const streamUrl = yield getSong(song.key)
    const lyric = yield getLyric(song.key)
    const isFavorite = yield AsyncStore.isFavorites(song.key)

    const data = new PlayerModel()
    data.createModelFromJson({
        data: streamUrl,
        lyric: lyric,
        song: song
    })

    yield put(setPlayerSong(data))
    yield put(setPlayerFavorite(isFavorite))
    yield put(setPlayerState(PlayState.Playlist))
    yield TrackPlayer.reset()
    yield TrackPlayer.add({
        url: data.streamSong.url,
        index: action.payload
    })
    yield TrackPlayer.play();
    yield AsyncStore.addRecentListening(data.streamSong)
    yield put(requestHomeData())
}










export function* watchRequestHomeData() {
    yield takeEvery(requestHomeData.type, getHomeData);
}

export function* watchRequestPlaySongData() {
    yield takeEvery(playSongData.type, playSong);
}

export function* watchRequestChangePlayingState() {
    yield takeEvery(changePlayingState.type, changePlayState);
}

export function* watchRequestAddFavorite() {
    yield takeEvery(addFavoriteSong.type, addFavorite);
}

export function* watchRequestRemoveFavorite() {
    yield takeEvery(removeFavoriteSong.type, removeFavorite);
}

export function* watchRequestFavoritesData() {
    yield takeEvery(requestFavoritesData.type, getFavoritesData);
}

export function* watchRequestSetPlayerFavoritesData() {
    yield takeEvery(setPlayerFavoritesData.type, setPlayerFavorites);
}

export function* watchRequestSearchData() {
    yield takeLeading(requestSearchData.type, getSearchData);
}

export function* watchRequestAddRecentSearchData() {
    yield takeEvery(addRecentSearchData.type, addRecentSearch);
}

export function* watchRequestClearRecentSearchData() {
    yield takeEvery(clearRecentSearchData.type, clearRecentSearch);
}

export function* watchRequestRemoveRecentSearchData() {
    yield takeEvery(removeRecentSearchData.type, removeRecentSearch);
}

export function* watchRequestPlayFavoritesData() {
    yield takeEvery(playFavoritesData.type, playFavorites);
}

export function* watchRequestPlaylistData() {
    yield takeEvery(requestPlaylistData.type, getPlaylistData);
}

export function* watchRequestPlayPlaylistData() {
    yield takeEvery(playPlaylistData.type, playPlaylist);
}

export function* watchRequestSetPlayerPlaylistData() {
    yield takeEvery(setPlayerPlaylistData.type, setPlayerPlaylist);
}