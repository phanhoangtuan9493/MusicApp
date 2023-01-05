import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SearchModel } from '../Search/SearchModel'

type SearchState = {
    data: SearchModel
    showRecentSearch: boolean
}

// Define the initial state using that type
const initialState: SearchState = {
    data: {
        result: []
    },
    showRecentSearch: false
}

export const searchSlice = createSlice({
    name: 'searchData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGlobalSearchModel: (_state, action: PayloadAction<SearchModel>) => {
            _state.data = action.payload
        },
        showRecentSearch: (_state, action: PayloadAction<boolean>) => {
            _state.showRecentSearch = action.payload
        }
    },
})

export const { setGlobalSearchModel, showRecentSearch } = searchSlice.actions

export default searchSlice.reducer