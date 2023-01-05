import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StreamSong } from '../services/constansts'



// Define the initial state using that type
const initialState: StreamSong[] = []

export const favoritesSlice = createSlice({
    name: 'favoritesData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGlobalFavoritesModel: (_state, action: PayloadAction<StreamSong[]>) => action.payload,
    },
})

export const { setGlobalFavoritesModel } = favoritesSlice.actions

export default favoritesSlice.reducer