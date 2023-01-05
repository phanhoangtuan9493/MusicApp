import React, { useMemo, useCallback } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, { State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../config/Hooks';
import { changePlayingState, playFavoritesData, setPlayerFavoritesData } from '../action/Actions';
import { PlayState, StreamSong } from '../services/constansts';
import { FavoritesItem } from '../components/ListItem';
import { Time } from '../services/Time';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const FavoritesPage = () => {

    const dispatch = useAppDispatch()

    const dataFavorites = useAppSelector(state => state.favorites)

    const dataPlayer = useAppSelector(state => state.player)

    const playOrPauseIcon = (dataPlayer.isPlaying && dataPlayer.playerState === PlayState.Favorites) ?
        'pause-circle' : 'play-circle';

    const onPressButton = useCallback(async () => {
        const state = await TrackPlayer.getState();

        if (dataPlayer.playerState === PlayState.Favorites) {
            if (state === State.Playing) {
                TrackPlayer.pause();
                dispatch(changePlayingState(false))
            }

            if (state === State.Paused) {
                TrackPlayer.play();
                dispatch(changePlayingState(true))
            }
        } else {
            dispatch(setPlayerFavoritesData({ data: dataFavorites, index: 0 }))
        }
    }, [dataPlayer, dataFavorites, TrackPlayer])

    const playSong = useCallback((song: StreamSong) => {
        if (dataPlayer.data.streamSong.key !== song.key) {
            const index = dataFavorites.findIndex(item => item.key === song.key)
            dispatch(setPlayerFavoritesData({ data: dataFavorites, index: index }))
        }
    }, [dataPlayer, dataFavorites])

    const renderSongItem: ListRenderItem<StreamSong> = ({ item, index }) => {
        return <FavoritesItem item={item} chooseSong={playSong} />
    }

    const displayTotalTime = useMemo(() => {
        let totalSeconds = 0
        dataFavorites.map((ele: StreamSong) => {
            totalSeconds += Time.MMSSToSeconds(ele.duration)
        })
        return Time.secondsToFormalHHMMSS(totalSeconds)
    }, [dataFavorites])

    return (
        <>
            <View style={{ backgroundColor: '#26292D' }}>
                <View style={styles.container}>
                    <View style={{ flex: 0.05 }} />
                    <View style={styles.intro}>
                        <Text style={styles.intro1}>Favorite Track</Text>
                        <Text style={styles.intro2}>{`${dataFavorites.length} songs - ${displayTotalTime}`}</Text>
                    </View>
                    {
                        dataFavorites.length > 0 ? <TouchableOpacity style={styles.button} onPress={onPressButton}>
                            <Icon style={{ textAlign: 'right' }} size={65} name={playOrPauseIcon} color='#0095E9' />
                        </TouchableOpacity> : <></>
                    }
                    <View style={{ flex: 0.05 }} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#26292D' }}>
                <View style={{ flex: 0.05 }} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 10 }}
                    data={dataFavorites}
                    renderItem={renderSongItem}
                    keyExtractor={item => item.key}
                />
                <View style={{ flex: 0.05 }} />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    intro: { flex: 0.7, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' },
    button: { flex: 0.2, justifyContent: 'center' },
    intro1: { fontSize: 25, color: 'white', fontWeight: 'bold' },
    intro2: { fontSize: 15, color: 'white' },
    image: { height: 45, width: 45, borderRadius: 100 },
    title: { fontSize: 20, color: 'white', fontWeight: 'bold', flex: 0.95 },
    container: {
        backgroundColor: '#373A3E',
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.15,
        width: SCREEN_WIDTH,
        borderRadius: 50,
    },
})

export default FavoritesPage