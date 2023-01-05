import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HomeModel } from '../Home/HomeModel'

// Define the initial state using that type
const initialState: HomeModel = {
    playlist: [],
    topic: [],
    ranking: [],
    recentListenings: []
}

export const homeSlice = createSlice({
    name: 'homeData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGlobalHomeModel: (_state, action: PayloadAction<HomeModel>) => action.payload,
    },
})

export const { setGlobalHomeModel } = homeSlice.actions

export default homeSlice.reducer