import Slider from "@react-native-community/slider";
import React, { useCallback } from "react"
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import TrackPlayer, { State, useProgress } from "react-native-track-player";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch, useAppSelector } from "../../config/Hooks";
import { addFavoriteSong, changePlayingState, playFavoritesData, playPlaylistData, removeFavoriteSong } from "../action/Actions";
import { Time } from "../services/Time"
import { NavigationHelpers } from "../services/NavigationHelpers";
import { PlayState } from "../services/constansts";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');


const PlayerPage = () => {

    const progress = useProgress()

    const dispatch = useAppDispatch()

    const dataPlayer = useAppSelector(state => state.player)

    const playOrPauseIcon = dataPlayer.isPlaying ? 'pause-circle' : 'play-circle';

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

    const slideChange = (value: number) => {
        TrackPlayer.seekTo(value)
    }

    const goBack = () => NavigationHelpers.getInstance()?.goBack()

    const image: any = dataPlayer.data.streamSong.thumbnail ?
        { uri: dataPlayer.data.streamSong.thumbnail } :
        require('../../assets/images.png')

    const changeFavorites = () => dataPlayer.isFavorite ?
        dispatch(removeFavoriteSong(dataPlayer.data.streamSong)) :
        dispatch(addFavoriteSong(dataPlayer.data.streamSong))

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
            return <TouchableOpacity onPress={goBackwardSong} style={{ alignSelf: 'center' }}>
                <Icon style={{ textAlign: 'center' }} size={22} name="step-backward" color='white' />
            </TouchableOpacity>
        }
        return <></>
    }, [dataPlayer, goBackwardSong])

    const renderForwardButton = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Favorites ||
            dataPlayer.playerState === PlayState.Playlist) {
            return <TouchableOpacity onPress={goForwardSong} style={{ alignSelf: 'center' }}>
                <Icon style={{ textAlign: 'center' }} size={22} name="step-forward" color='white' />
            </TouchableOpacity>
        }
        return <></>
    }, [dataPlayer, goForwardSong])

    const renderFavoriteButton = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Song ||
            dataPlayer.playerState === PlayState.Playlist) {
            return <TouchableOpacity onPress={changeFavorites}>
                <Icon style={{ alignSelf: 'center' }} size={25} name={favoriteIcon} color='gray' />
            </TouchableOpacity>
        }
        return <></>
    }, [dataPlayer, favoriteIcon])

    return (<>
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={goBack} style={{ alignSelf: 'center' }}>
                        <Icon style={{ alignSelf: 'center' }} size={25} name="angle-left" color='white' />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}>PLAYING NOW</Text>
                    <TouchableOpacity onPress={() => { }} style={{ alignSelf: 'center' }}>
                        <Icon style={{ alignSelf: 'center' }} size={20} name="file-text-o" color='gray' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.05 }} />
            </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#0A2B54' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.05 }} />
                <Image source={image} style={styles.image} />
                <View style={{ flex: 0.05 }} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: SCREEN_HEIGHT * 0.04 }}>
                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text numberOfLines={1} style={styles.titleSong}>{`${dataPlayer.data.streamSong.title}`}</Text>
                    {renderFavoriteButton()}
                </View>
                <View style={{ flex: 0.05 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.05 }} />
                <Text numberOfLines={1} style={styles.titleArtist}>{`${dataPlayer.data.streamSong.artist}`}</Text>
                <View style={{ flex: 0.05 }} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: SCREEN_HEIGHT * 0.04 }}>
                <View style={{ flex: 0.05 }} />
                <Slider
                    style={{ flex: 0.9 }}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    onValueChange={slideChange}
                    minimumTrackTintColor="#36C4F5"
                    maximumTrackTintColor="#14263C"
                    thumbTintColor="#36C4F5"
                    value={progress.position}
                />
                <View style={{ flex: 0.05 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.05 }} />
                <Text style={styles.track}>{Time.secondsToHHMMSS(Math.floor(progress.position || 0))}</Text>
                <Text style={styles.duration}>{Time.secondsToHHMMSS(progress.duration || 0)}</Text>
                <View style={{ flex: 0.05 }} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: SCREEN_HEIGHT * 0.04, justifyContent: 'space-evenly' }}>
                {renderBackwardButton()}
                <TouchableOpacity onPress={onPlayPausePress}>
                    <Icon style={{ textAlign: 'center' }} size={80} name={playOrPauseIcon} color='#0095E9' />
                </TouchableOpacity>
                {renderForwardButton()}
            </View>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    titleSong: { color: 'white', fontWeight: 'bold', fontSize: 22, alignSelf: 'center' },
    titleArtist: { flex: 0.9, color: 'gray', fontWeight: 'bold', fontSize: 16, textAlign: 'left' },
    duration: { flex: 0.45, color: 'gray', fontSize: 14, textAlign: 'right' },
    track: { flex: 0.45, color: 'white', fontSize: 14, textAlign: 'left' },
    image: {
        height: SCREEN_HEIGHT * 0.45,
        borderRadius: 10,
        flex: 0.9,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: '#0A2B54',
        flexDirection: 'column',
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.15,
        width: SCREEN_WIDTH,
    },
})

export default PlayerPage