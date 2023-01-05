import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import _ from 'lodash';
import { store } from '../../config/Store';
import { requestPlaylistData } from '../action/Actions';
import { PlayState, Screens, ScreensName } from './constansts'



export class NavigationHelpers {

    private static instance: NavigationHelpers;

    private static navigator: NativeStackNavigationProp<Screens>

    private constructor(navigator: NativeStackNavigationProp<Screens>) {
        NavigationHelpers.navigator = navigator
    }

    public static createInstance(navigator: NativeStackNavigationProp<Screens>) {
        NavigationHelpers.instance = new NavigationHelpers(navigator);
    }

    public static getInstance() {
        if (!NavigationHelpers.instance) {
            return null
        }
        return NavigationHelpers.instance
    }

    public handleNavigateToScreen = () => {
        const routeName = _.last(NavigationHelpers.navigator.getState().routes)?.name
        const dataPlayer = store.getState().player
        const dataPlaylist = store.getState().playlist
        switch (dataPlayer.playerState) {
            case PlayState.Song:
            case PlayState.Favorites:
                NavigationHelpers.navigator.navigate('Player')
                break;
            case PlayState.Playlist: {
                if (dataPlayer.playlistModel.playlist.key === dataPlaylist.playlist.key &&
                    routeName === ScreensName.Playlist) {
                    NavigationHelpers.navigator.navigate('Player')
                    break;
                }
                store.dispatch(requestPlaylistData(dataPlayer.playlistModel.playlist.key))
                break;
            }
        }
    }

    public navigateToPlaylistScreen = () => NavigationHelpers.navigator.navigate('Playlist')

    public goBack = () => NavigationHelpers.navigator.goBack()

}