import React, { useCallback } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import TrackPlayer, { State } from "react-native-track-player";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from "../../config/Hooks";
import { addFavoriteSong, changePlayingState, playFavoritesData, playPlaylistData, removeFavoriteSong, requestPlaylistData } from "../action/Actions"
import { PlayState } from "../services/constansts";
import { NavigationHelpers } from "../services/NavigationHelpers";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BottomPlayer = () => {

    const dispatch = useAppDispatch()

    const dataPlayer = useAppSelector(state => state.player)

    const favoriteIcon = dataPlayer.isFavorite ? 'heart' : 'heart-o';

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getState();

        if (state === State.Playing) {
            TrackPlayer.pause();
            dispatch(changePlayingState(false))
        }

        if (state === State.Paused) {
            TrackPlayer.play();
            dispatch(changePlayingState(true))
        }
    };

    const changeFavorites = () => dataPlayer.isFavorite ?
        dispatch(removeFavoriteSong(dataPlayer.data.streamSong)) :
        dispatch(addFavoriteSong(dataPlayer.data.streamSong))

    const goToPlayerScreen = () => NavigationHelpers.getInstance()?.handleNavigateToScreen()

    const image: any = dataPlayer.data.streamSong.thumbnail ? { uri: dataPlayer.data.streamSong.thumbnail } : require('../../assets/images.png')

    const playOrPauseIcon = dataPlayer.isPlaying ? 'pause-circle' : 'play-circle';

    const goForwardSong = useCallback(async () => {
        const trackObject = await TrackPlayer.getTrack(0);
        switch (dataPlayer.playerState) {
            case PlayState.Favorites: {
                if ((trackObject?.index + 1) < dataPlayer.favorites.length) {
                    dispatch(playFavoritesData(trackObject?.index + 1))
                } else {
                    dispatch(playFavoritesData(0))
                }
                break;
            }
            case PlayState.Playlist: {
                if ((trackObject?.index + 1) < dataPlayer.playlistModel.songs.length) {
                    dispatch(playPlaylistData(trackObject?.index + 1))
                } else {
                    dispatch(playPlaylistData(0))
                }
                break;
            }
        }
    }, [TrackPlayer, dataPlayer])

    const goBackwardSong = useCallback(async () => {
        const trackObject = await TrackPlayer.getTrack(0);
        switch (dataPlayer.playerState) {
            case PlayState.Favorites: {
                if ((trackObject?.index - 1) >= 0) {
                    dispatch(playFavoritesData(trackObject?.index - 1))
                } else {
                    dispatch(playFavoritesData(dataPlayer.favorites.length - 1))
                }
                break;
            }
            case PlayState.Playlist: {
                const playlist = dataPlayer.playlistModel.songs
                if ((trackObject?.index + 1) < playlist.length) {
                    dispatch(playPlaylistData(trackObject?.index - 1))
                } else {
                    dispatch(playPlaylistData(playlist.length - 1))
                }
                break;
            }
        }
    }, [TrackPlayer, dataPlayer])

    const renderBackwardButton = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Favorites ||
            dataPlayer.playerState === PlayState.Playlist) {
            return <>
                <View style={{ flex: 0.1 }} />
                <TouchableOpacity onPress={goBackwardSong} style={{ alignSelf: 'center' }}>
                    <Icon style={{ textAlign: 'center' }} size={20} name="step-backward" color='white' />
                </TouchableOpacity>
            </>
        }
        return <></>
    }, [dataPlayer, goBackwardSong])

    const renderForwardButton = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Favorites ||
            dataPlayer.playerState === PlayState.Playlist) {
            return <>
                <View style={{ flex: 0.1 }} />
                <TouchableOpacity onPress={goForwardSong} style={{ alignSelf: 'center' }}>
                    <Icon style={{ textAlign: 'center' }} size={20} name="step-forward" color='white' />
                </TouchableOpacity>
            </>
        }
        return <></>
    }, [dataPlayer, goForwardSong])

    const renderFavoriteButton = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Song ||
            dataPlayer.playerState === PlayState.Playlist) {
            return <>
                <View style={{ flex: 0.1 }} />
                <TouchableOpacity onPress={changeFavorites} style={{ alignSelf: 'center' }}>
                    <Icon style={{ alignSelf: 'center' }} size={25} name={favoriteIcon} color='gray' />
                </TouchableOpacity>
            </>
        }
        return <></>
    }, [dataPlayer, favoriteIcon])

    return (
        <View style={{ backgroundColor: '#26292D' }}>
            <View style={styles.container}>
                <View style={{ flex: 0.05 }} />
                <TouchableOpacity onPress={goToPlayerScreen} style={{ flexDirection: 'row', flex: 0.9 }}>
                    <View style={{ flexDirection: 'row', flex: 0.5 }}>
                        <Image style={styles.image} source={image} />
                        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                            <Text numberOfLines={1} style={styles.titleSong}>{`${dataPlayer.data.streamSong.title}`}</Text>
                            <Text numberOfLines={1} style={styles.titleArtist}>{`${dataPlayer.data.streamSong.artist}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5 }}>
                        {renderBackwardButton()}
                        <View style={{ flex: 0.1 }} />
                        <TouchableOpacity onPress={onPlayPausePress} style={{ alignSelf: 'center' }}>
                            <Icon style={{ textAlign: 'center' }} size={40} name={playOrPauseIcon} color='#0095E9' />
                        </TouchableOpacity>
                        {renderFavoriteButton()}
                        {renderForwardButton()}
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.05 }} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B3F44',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 10,
        alignSelf: 'center'
    },
    titleSong: { color: 'white', fontWeight: 'bold', fontSize: 15, },
    titleArtist: { color: 'gray', fontWeight: 'bold', fontSize: 12, },
})

export default BottomPlayer;
