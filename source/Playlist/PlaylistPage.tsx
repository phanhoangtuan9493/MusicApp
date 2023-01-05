import React, { useCallback, useMemo, useRef } from 'react';
import { Animated, FlatList, ImageBackground, ListRenderItem, TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlayState, Song } from '../services/constansts';
import { SongItem } from '../components/ListItem';
import { useAppDispatch, useAppSelector } from '../../config/Hooks';
import { Time } from '../services/Time';
import { NavigationHelpers } from '../services/NavigationHelpers';
import BottomPlayer from '../Player/BottomPlayer';
import { changePlayingState, playPlaylistData, setPlayerPlaylistData } from '../action/Actions';
import TrackPlayer, { State } from 'react-native-track-player';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const H_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;
const H_MIN_HEIGHT = SCREEN_HEIGHT * 0.12;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;


const PlaylistPage = () => {

    const dispatch = useAppDispatch()

    const dataPlaylist = useAppSelector(state => state.playlist)

    const dataPlayer = useAppSelector(state => state.player)

    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    });

    const validateTheSamePlaylist = useCallback(() => {
        if (dataPlayer.playerState === PlayState.Playlist &&
            dataPlayer.playlistModel.playlist.key === dataPlaylist.playlist.key) {
            return true
        }
        return false
    }, [dataPlayer, dataPlaylist])

    const playOrPauseIcon = (dataPlayer.isPlaying && validateTheSamePlaylist()) ?
        'pause-circle' : 'play-circle';

    const onPressButton = useCallback(async () => {
        const state = await TrackPlayer.getState();

        if (validateTheSamePlaylist()) {
            if (state === State.Playing) {
                TrackPlayer.pause();
                dispatch(changePlayingState(false))
            }

            if (state === State.Paused) {
                TrackPlayer.play();
                dispatch(changePlayingState(true))
            }
        } else {
            dispatch(setPlayerPlaylistData({ data: dataPlaylist, index: 0 }))
        }
    }, [dataPlayer, dataPlaylist, TrackPlayer])

    const chooseItem = useCallback((song: Song) => {
        if (dataPlayer.data.streamSong.key !== song.key) {
            const index = dataPlaylist.songs.findIndex(item => item.key === song.key)
            dispatch(setPlayerPlaylistData({ data: dataPlaylist, index: index }))
        }
    }, [dataPlayer, dataPlaylist])

    const renderSongItem: ListRenderItem<Song> = ({ item, index }) => {
        return <SongItem index={index} item={item} choose={chooseItem} />
    }

    const image: any = dataPlaylist.playlist.thumbnail ? { uri: dataPlaylist.playlist.thumbnail } : require('../../assets/images.png')

    const goBack = () => NavigationHelpers.getInstance()?.goBack()

    const displayTotalTime = useMemo(() => {
        let totalSeconds = 0
        dataPlaylist.songs.map((ele: Song) => {
            totalSeconds += Time.MMSSToSeconds(ele.duration)
        })
        return Time.secondsToFormalHHMMSS(totalSeconds)
    }, [dataPlaylist])

    const header = useCallback(() => {
        return <View style={{ paddingTop: H_MAX_HEIGHT }}>
            <View style={{ flexDirection: 'row', paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <Text numberOfLines={1} style={styles.time}>{`${dataPlaylist.songs.length} songs - ${displayTotalTime}`}</Text>
            </View>
        </View>
    }, [dataPlaylist, displayTotalTime])

    const renderBottomPlayer = useCallback(() => {
        if (dataPlayer.showBottomPlayer) {
            return <BottomPlayer />
        }
        return <></>
    }, [dataPlayer.showBottomPlayer, dataPlayer.playerState])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#26292D' }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.05 }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
                        ])}
                        ListHeaderComponent={header}
                        style={{ flex: 0.9 }}
                        data={dataPlaylist.songs}
                        renderItem={renderSongItem}
                        keyExtractor={item => item.key} />
                    <View style={{ flex: 0.05 }} />
                </View>

                <Animated.View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        height: headerScrollHeight,
                        width: "100%",
                        overflow: "hidden",
                        zIndex: 999,
                        borderBottomColor: "#EFEFF4",
                        borderBottomWidth: 2,
                        backgroundColor: "blue",
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    }}
                >
                    <ImageBackground source={image} imageStyle={styles.image} style={styles.container}>
                        <View style={{ flexDirection: 'row', height: SCREEN_HEIGHT * 0.15 }}>
                            <View style={{ flex: 0.05 }} />
                            <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={goBack} style={{ alignSelf: 'center' }}>
                                    <View style={styles.backButton}>
                                        <Icon style={{ alignSelf: 'center' }} size={25} name="angle-left" color='white' />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={onPressButton}>
                                    <View style={styles.playButton}>
                                        <Icon size={65} name={playOrPauseIcon} color='#0095E9' />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.05 }} />
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
            {renderBottomPlayer()}
        </>
    )

}

const styles = StyleSheet.create({
    time: { flex: 1, fontSize: 15, color: 'gray', textAlign: 'right' },
    button: { justifyContent: 'center' },
    image: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#26292D',
        borderRadius: 50,
    },
    playButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 65,
        backgroundColor: '#26292D',
        borderRadius: 50,
    }
})

export default PlaylistPage