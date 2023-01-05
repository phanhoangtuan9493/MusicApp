import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Playlist, StreamSong } from '../services/constansts'
import { PlaylistModel } from '../Playlist/PlaylistModel'



// Define the initial state using that type
const initialState: PlaylistModel = {
    playlist: new Playlist({}),
    songs: [],
}

export const PlaylistSlice = createSlice({
    name: 'playlistData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGlobaPlaylistModel: (_state, action: PayloadAction<PlaylistModel>) => action.payload,
    },
})

export const { setGlobaPlaylistModel } = PlaylistSlice.actions

export default PlaylistSlice.reducer