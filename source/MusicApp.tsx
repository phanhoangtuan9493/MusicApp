import React, { useCallback, useEffect, useState } from 'react';
import BottomNavigation from './components/BottomNavigation';
import { View } from 'react-native';
import HomePage from './Home/HomePage';
import SearchPage from './Search/SearchPage';
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import BottomPlayer from './Player/BottomPlayer';
import FavoritesPage from './Favorites/FavoritesPage';
import { useAppDispatch, useAppSelector } from '../config/Hooks';
import { playFavoritesData, playPlaylistData, requestFavoritesData, requestHomeData, requestSearchData } from './action/Actions';
import { PlayState, Screens } from './services/constansts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationHelpers } from './services/NavigationHelpers';


const routes: string[] = ['home', 'search', 'heart']

const MusicApp = () => {

    const dispatch = useAppDispatch()

    const dataPlayer = useAppSelector(state => state.player)

    const navigator = useNavigation<NativeStackNavigationProp<Screens>>()

    const [page, setPage] = useState(routes[0])

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
        const trackObject = await TrackPlayer.getTrack(0);
        if (dataPlayer.playerState === PlayState.Favorites) {
            if ((trackObject?.index + 1) < dataPlayer.favorites.length) {
                dispatch(playFavoritesData(trackObject?.index + 1))
            } else {
                dispatch(playFavoritesData(0))
            }
        } else if (dataPlayer.playerState === PlayState.Playlist) {
            if ((trackObject?.index + 1) < dataPlayer.playlistModel.songs.length) {
                dispatch(playPlaylistData(trackObject?.index + 1))
            } else {
                dispatch(playPlaylistData(0))
            }
        } else if (dataPlayer.playerState === PlayState.Song) {
            TrackPlayer.seekTo(0)
            TrackPlayer.play()
        }
    });

    const onChangeBottomPage = (key: string) => setPage(key)

    const renderPage = useCallback(() => {
        switch (page) {
            case 'home':
                return <HomePage />
            case 'search':
                return <SearchPage />
            case 'heart':
                return <FavoritesPage />
            default:
                return <></>
        }
    }, [page])

    const renderBottomPlayer = useCallback(() => {
        if (dataPlayer.showBottomPlayer) {
            return <BottomPlayer />
        }
        return <></>
    }, [dataPlayer.showBottomPlayer, dataPlayer.playerState])

    useEffect(() => {
        NavigationHelpers.createInstance(navigator)
        dispatch(requestHomeData())
        dispatch(requestSearchData(''))
        dispatch(requestFavoritesData())
        TrackPlayer.setupPlayer()
        // TrackPlayer.setVolume(1)
        TrackPlayer.setVolume(0)
    }, [])

    return (
        <>
            <View style={{ flex: 1 }}>
                {renderPage()}
            </View>
            {renderBottomPlayer()}
            <BottomNavigation data={routes}
                init={page} onChangePage={onChangeBottomPage} />
        </>
    )
}

export default MusicApp;