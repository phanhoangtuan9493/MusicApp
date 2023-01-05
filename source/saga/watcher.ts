import { all } from "redux-saga/effects";
import {
    watchRequestHomeData, watchRequestPlaySongData, watchRequestChangePlayingState,
    watchRequestAddFavorite, watchRequestRemoveFavorite, watchRequestSearchData,
    watchRequestAddRecentSearchData, watchRequestClearRecentSearchData,
    watchRequestRemoveRecentSearchData, watchRequestFavoritesData,
    watchRequestPlayFavoritesData, watchRequestPlaylistData, watchRequestPlayPlaylistData,
    watchRequestSetPlayerFavoritesData, watchRequestSetPlayerPlaylistData
} from "./saga";

function* watcher() {
    yield all([
        watchRequestHomeData(),
        watchRequestPlaySongData(),
        watchRequestChangePlayingState(),
        watchRequestAddFavorite(),
        watchRequestRemoveFavorite(),
        watchRequestFavoritesData(),
        watchRequestSetPlayerFavoritesData(),
        watchRequestSearchData(),
        watchRequestAddRecentSearchData(),
        watchRequestRemoveRecentSearchData(),
        watchRequestClearRecentSearchData(),
        watchRequestPlayFavoritesData(),
        watchRequestPlaylistData(),
        watchRequestPlayPlaylistData(),
        watchRequestSetPlayerPlaylistData()
    ])
}

export default watcher;