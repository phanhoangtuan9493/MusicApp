import _ from "lodash";
import React from "react"
import { Dimensions, FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from "../../config/Hooks";
import { addRecentSearchData, clearRecentSearchData, removeRecentSearchData, requestSearchData, playSongData, requestPlaylistData } from "../action/Actions";
import { PlaylistSearch, SongSearch } from "../services/constansts";
import { RecentSearchItem, SearchItem } from "../components/ListItem";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');


const SearchPage = () => {

    const dispatch = useAppDispatch()

    const searchData = useAppSelector(state => state.searchResult)

    const dataPlayer = useAppSelector(state => state.player)

    const onChangeText = _.debounce((text: string) => {
        dispatch(requestSearchData(text))
    }, 1000)

    const clearRecentSearch = () => dispatch(clearRecentSearchData())


    const removeRecentSearch = (item: PlaylistSearch | SongSearch) => dispatch(removeRecentSearchData(item))


    const playRecentSearch = (item: PlaylistSearch | SongSearch) => {
        if (item instanceof SongSearch) {
            playSong(item)
        } else if (item instanceof PlaylistSearch) {
            dispatch(requestPlaylistData(item.key))
        }
    }

    const playSearch = (item: PlaylistSearch | SongSearch) => {
        dispatch(addRecentSearchData(item))
        if (item instanceof SongSearch) {
            playSong(item)
        } else if (item instanceof PlaylistSearch) {
            dispatch(requestPlaylistData(item.key))
        }

    }

    const playSong = (item: SongSearch) => {
        if (dataPlayer.data.streamSong.key !== item.key) {
            dispatch(playSongData(item))
        }
    }


    const renderRecentSearch = () => {
        if (searchData.showRecentSearch) {
            return <View style={{ position: 'absolute', top: SCREEN_HEIGHT * 0.115, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 0.05 }} />
                <Text style={{ flex: 0.45, color: 'white', fontWeight: 'bold', fontSize: 14, }}>Recent History</Text>
                <TouchableOpacity onPress={clearRecentSearch} style={{ flex: 0.45 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>CLEAR</Text>
                </TouchableOpacity>
                <View style={{ flex: 0.05 }} />
            </View>
        } else {
            return <></>
        }
    }

    const renderSearchItem: ListRenderItem<PlaylistSearch | SongSearch> = ({ item, index }) => {
        if (searchData.showRecentSearch) {
            return <RecentSearchItem item={item}
                removeRecentSearch={removeRecentSearch}
                chooseRecentSearch={playRecentSearch} />
        } else {
            return <SearchItem item={item} setRecentSearch={playSearch} />
        }
    }

    return (<>
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.05 }} />
                <View style={styles.searchSection}>
                    <View style={styles.searchIcon}>
                        <Icon style={{ padding: 10 }} name="search" size={20} color="white" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Input keyword to search song or playlist"
                        onChangeText={onChangeText}
                        // defaultValue={props.keyword}
                        placeholderTextColor='gray'
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={{ flex: 0.05 }} />
            </View>
            {renderRecentSearch()}
        </View>
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#26292D' }}>
            <View style={{ flex: 0.05 }} />
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={searchData.data.result}
                renderItem={renderSearchItem}
                keyExtractor={item => item.key}
            />
            <View style={{ flex: 0.05 }} />
        </View>
    </>)

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#26292D',
        flexDirection: 'column',
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.15,
        width: SCREEN_WIDTH,
    },
    searchSection: {
        flex: 0.95,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26292D',
    },
    searchIcon: {
        backgroundColor: '#373A3E',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        height: 40,
        backgroundColor: '#373A3E',
        color: 'gray',
        fontWeight: 'bold',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
})


export default SearchPage