import React from "react"
import { Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Playlist, PlaylistSearch, Song, SongSearch, StreamSong, Topic } from "../services/constansts"

type PlaylistItemProps = {
    index: number
    item: Playlist
    choose: (item: Playlist) => void
}

export const PlayListItem = (props: PlaylistItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const onPress = (item: Playlist) => {
        props.choose(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)}>
        <View style={{ flexDirection: 'column' }}>
            <Image style={styles.image} source={image} />
            <Text numberOfLines={1} style={styles.title}>{`${props.item.title}`}</Text>
            <Text style={styles.body}>{`${props.item.numOfItems} Songs`}</Text>
        </View>
    </TouchableOpacity>)

}

type TopicItemProps = {
    index: number
    item: Topic
    choose: (item: Topic) => void
}

export const TopicItem = (props: TopicItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const onPress = (item: Topic) => {
        props.choose(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)}>
        <View style={{ flexDirection: 'column' }}>
            <Image style={styles.image} source={image} />
            <Text numberOfLines={1} style={styles.title}>{`${props.item.title}`}</Text>
        </View>
    </TouchableOpacity>)

}

type SongItemProps = {
    index: number
    item: Song
    choose: (item: Song) => void
}

export const SongItem = (props: SongItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const onPress = (item: Song) => {
        props.choose(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: 10 }}>
        <Text style={styles.index}>{`${props.index + 1}.`}</Text>
        <Image style={styles.imageSong} source={image} />
        <View style={{ flexDirection: 'column', flex: 0.75, paddingLeft: 10 }}>
            <Text numberOfLines={1} style={styles.title}>{`${props.item.title}`}</Text>
            <Text numberOfLines={1} style={styles.body}>{`${props.item.artist}`}</Text>
        </View>
        {props.item.duration && <Text style={styles.duration}>{props.item.duration}</Text>}
    </TouchableOpacity>)

}


type FavoritesItemProps = {
    item: StreamSong
    chooseSong: (item: StreamSong) => void
}

export const FavoritesItem = (props: FavoritesItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const onPress = (item: StreamSong) => {
        props.chooseSong(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)}
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: 10 }}>
        <Image style={styles.imageSong} source={image} />
        <View style={{ flexDirection: 'column', flex: 0.7, paddingLeft: 10 }}>
            <Text numberOfLines={1} style={styles.title}>{`${props.item.title}`}</Text>
            <Text numberOfLines={1} style={styles.body}>{`${props.item.artist}`}</Text>
        </View>
        <Text style={styles.duration}>{props.item.duration}</Text>
    </TouchableOpacity>)

}



type SearchItemProps = {
    item: PlaylistSearch | SongSearch
    setRecentSearch: (item: PlaylistSearch | SongSearch) => void
}

export const SearchItem = (props: SearchItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const renderText = (item: PlaylistSearch | SongSearch) => {
        if (item instanceof PlaylistSearch) {
            return `${item.numOfItems} Songs`
        } else if (item instanceof SongSearch) {
            return `${item.duration}`
        } else {
            return ''
        }
    }

    const onPress = (item: PlaylistSearch | SongSearch) => {
        props.setRecentSearch(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: 10 }}>
        <Image style={styles.imageSong} source={image} />
        <View style={{ flexDirection: 'column', flex: 0.85, paddingLeft: 10 }}>
            <Text numberOfLines={1} style={styles.titleSearch}>{`${props.item.title}`}</Text>
            <Text numberOfLines={1} style={styles.body}>{`${props.item.artist} - ${renderText(props.item)}`}</Text>
        </View>
    </TouchableOpacity>)

}

type RecentSearchItemProps = {
    item: PlaylistSearch | SongSearch
    chooseRecentSearch: (item: PlaylistSearch | SongSearch) => void
    removeRecentSearch: (item: PlaylistSearch | SongSearch) => void
}

export const RecentSearchItem = (props: RecentSearchItemProps) => {

    const image: any = props.item.thumbnail ? { uri: props.item.thumbnail } : require('../../assets/images.png')

    const renderText = (item: PlaylistSearch | SongSearch) => {
        if (item instanceof PlaylistSearch) {
            return `${item.numOfItems} Songs`
        } else if (item instanceof SongSearch) {
            return `${item.duration}`
        } else {
            return ''
        }
    }

    const onPress = (item: PlaylistSearch | SongSearch) => {
        props.chooseRecentSearch(item)
    }

    const onPressClose = async (item: PlaylistSearch | SongSearch) => {
        props.removeRecentSearch(item)
    }

    return (<TouchableOpacity onPress={onPress.bind(this, props.item)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: 10 }}>
        <Image style={styles.imageSong} source={image} />
        <View style={{ flexDirection: 'column', flex: 0.75, paddingLeft: 10 }}>
            <Text numberOfLines={1} style={styles.titleSearch}>{`${props.item.title}`}</Text>
            <Text numberOfLines={1} style={styles.body}>{`${props.item.artist} - ${renderText(props.item)}`}</Text>
        </View>
        <TouchableOpacity style={{ flex: 0.1, alignItems: 'flex-end' }} onPress={onPressClose.bind(this, props.item)}>
            <Icon size={20} name='close' color='gray' />
        </TouchableOpacity>
    </TouchableOpacity>)

}

const styles = StyleSheet.create({
    imageSong: {
        height: 50,
        borderRadius: 10,
        flex: 0.15
    },
    index: {
        color: 'white',
        size: 10,
        flex: 0.1
    },
    duration: {
        color: 'white',
        size: 10,
        flex: 0.15
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5,
        color: 'white',
        fontWeight: 'bold',
        size: 10,
        width: 200,
    },
    titleSearch: {
        paddingTop: 10,
        paddingBottom: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
    body: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 13
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginRight: 15,
    },
})