import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PlayerModel } from '../Player/PlayerModel'
import { Playlist, PlayState, Song, StreamSong } from '../services/constansts'
import { PlaylistModel } from '../Playlist/PlaylistModel'

export type Player = {
    data: PlayerModel
    isPlaying: boolean
    isFavorite: boolean
    showBottomPlayer: boolean
    playerState: PlayState
    favorites: StreamSong[]
    playlistModel: PlaylistModel
}

const initialState: Player = {
    data: new PlayerModel(),
    isPlaying: false,
    isFavorite: false,
    showBottomPlayer: false,
    playerState: PlayState.None,
    playlistModel:  {
        playlist: new Playlist({}),
        songs: [],
    },
    favorites: []
}

export const playerSlice = createSlice({
    name: 'playerData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPlayerSong: (_state, action: PayloadAction<PlayerModel>) => {
            _state.data = action.payload
            _state.isPlaying = true
            _state.showBottomPlayer = true
        },
        setPlayerState: (_state, action: PayloadAction<PlayState>) => {
            _state.playerState = action.payload
        },
        setPlayerPlaying: (_state, action: PayloadAction<boolean>) => {
            _state.isPlaying = action.payload
        },
        setPlayerFavorite: (_state, action: PayloadAction<boolean>) => {
            _state.isFavorite = action.payload
        },
        showBottomPlayer: (_state, action: PayloadAction<boolean>) => {
            _state.showBottomPlayer = action.payload
        },
        setPlaylist: (_state, action: PayloadAction<PlaylistModel>) => {
            _state.playlistModel = action.payload
        },
        setFavorites: (_state, action: PayloadAction<StreamSong[]>) => {
            _state.favorites = action.payload
        },
    },
})

export const { setPlayerSong, setPlayerPlaying, setPlaylist, setFavorites,
    setPlayerFavorite, showBottomPlayer, setPlayerState } = playerSlice.actions

export default playerSlice.reducer