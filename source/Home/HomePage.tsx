import React from 'react';
import { FlatList, Image, ListRenderItem, ScrollView } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../config/Hooks';
import { playSongData, requestPlaylistData } from '../action/Actions';
import { Playlist, Screens, Song, Topic } from '../services/constansts';
import { PlayListItem, SongItem, TopicItem } from '../components/ListItem';
import { Time } from '../services/Time';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');


const HomePage = () => {

    const dispatch = useAppDispatch()

    const dataHome = useAppSelector(state => state.home)

    const dataPlayer = useAppSelector(state => state.player)

    const playSong = (song: Song) => {
        if (dataPlayer.data.streamSong.key !== song.key) {
            dispatch(playSongData(song))
        }
    }

    const goToPlaylist = (playlist: Playlist) => dispatch(requestPlaylistData(playlist.key))

    const goToTopic = (topic: Topic) => { }

    const renderSongItem: ListRenderItem<Song> = ({ item, index }) => {
        return <SongItem index={index} item={item} choose={playSong} />
    }

    const renderPlaylistItem: ListRenderItem<Playlist> = ({ item, index }) => {
        return <PlayListItem index={index} item={item} choose={goToPlaylist} />
    }

    const renderTopicItem: ListRenderItem<Topic> = ({ item, index }) => {
        return <TopicItem index={index} item={item} choose={goToTopic} />
    }

    const renderRecentListenings = () => {
        if (dataHome.recentListenings.length > 0) {
            return <>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 0.05 }} />
                    <Text style={styles.title}>Your Recent Listenings</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.05 }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 0.9 }}
                        scrollEnabled={false}
                        data={dataHome.recentListenings}
                        renderItem={renderSongItem}
                        keyExtractor={item => item.key} />
                    <View style={{ flex: 0.05 }} />
                </View>
            </>
        } else {
            return <></>
        }
    }

    return (
        <>
            <View style={{ backgroundColor: '#26292D' }}>
                <View style={styles.container}>
                    <View style={{ flex: 0.05 }} />
                    <View style={styles.intro}>
                        <Text style={styles.intro1}>{Time.getHelloString()}</Text>
                        <Text style={styles.intro2}>Ready to dive into the world of music?</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Image style={styles.image} source={require('../../assets/images.png')} />
                    </View>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: '#26292D' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 0.05 }} />
                    <Text style={styles.title}>Top Playlist</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.05 }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 0.95 }}
                        horizontal
                        data={dataHome.playlist}
                        renderItem={renderPlaylistItem}
                        keyExtractor={item => item.key}
                    />
                </View>

                {renderRecentListenings()}

                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 0.05 }} />
                    <Text style={styles.title}>Top Topic</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.05 }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 0.95 }}
                        horizontal
                        data={dataHome.topic}
                        renderItem={renderTopicItem}
                        keyExtractor={item => item.key}
                    />
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 0.05 }} />
                    <Text style={styles.title}>Ranking 10 Songs</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.05 }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 0.9 }}
                        scrollEnabled={false}
                        data={dataHome.ranking}
                        renderItem={renderSongItem}
                        keyExtractor={item => item.key}
                    />
                    <View style={{ flex: 0.05 }} />
                </View>
            </ScrollView>
        </>
    )

}

const styles = StyleSheet.create({
    intro: { flex: 0.75, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' },
    avatar: { flex: 0.2, justifyContent: 'center' },
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

export default HomePage