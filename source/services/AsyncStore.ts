import AsyncStorage from '@react-native-async-storage/async-storage'
import { PlaylistSearch, Song, SongSearch, StorageType, StreamSong } from './constansts'
import { SearchModel } from '../Search/SearchModel';


export class AsyncStore {

    static addRecentSearch = async (item: PlaylistSearch | SongSearch) => {
        let json = await AsyncStorage.getItem(StorageType.RecentSearchs);
        let data: (PlaylistSearch | SongSearch)[] = []
        if (json) { data = JSON.parse(json) }
        if (!(data.filter(ele => ele.key === item.key).length > 0)) { 
            if (data.length >= 6) { data.pop() }
            data.unshift(item)
        }
        AsyncStorage.setItem(StorageType.RecentSearchs, JSON.stringify(data))
    }

    static getRecentSearch = async (): Promise<SearchModel> => {
        let json = await AsyncStorage.getItem(StorageType.RecentSearchs);
        let data: (PlaylistSearch | SongSearch)[] = []
        if (json) {
            let dataPlain: (PlaylistSearch | SongSearch)[] = JSON.parse(json)
            dataPlain.map(ele => {
                ele.type === 'PlaylistSearch' && data.push(new PlaylistSearch(ele))
                ele.type === 'SongSearch' && data.push(new SongSearch(ele))
            })
        }
        let result: SearchModel = new SearchModel({})
        result.result = data
        return result
    }

    static removeRecentSearch = async (item: PlaylistSearch | SongSearch) => {
        let json = await AsyncStorage.getItem(StorageType.RecentSearchs);
        let data: (PlaylistSearch | SongSearch)[] = []
        if (json) { data = JSON.parse(json) }
        data = data.filter(function (obj) {
            return obj.key !== item.key;
        });
        await AsyncStorage.setItem(StorageType.RecentSearchs, JSON.stringify(data))
    }

    static clearRecentSearch = async () => {
        await AsyncStorage.removeItem(StorageType.RecentSearchs)
    }

    static addRecentListening = async (item: Song | SongSearch | StreamSong) => {
        let json = await AsyncStorage.getItem(StorageType.RecentListenings);
        let data: (Song | SongSearch | StreamSong)[] = []
        if (json) { data = JSON.parse(json) }
        if (!(data.filter(ele => ele.key === item.key).length > 0)) {
            if (data.length >= 3) { data.pop() }
            data.unshift(item)
        }
        AsyncStorage.setItem(StorageType.RecentListenings, JSON.stringify(data))
    }

    static getRecentListening = async (): Promise<(Song | SongSearch | StreamSong)[]> => {
        let json = await AsyncStorage.getItem(StorageType.RecentListenings);
        let data: (Song | SongSearch | StreamSong)[] = []
        if (json) {
            let dataPlain: (Song | SongSearch | StreamSong)[] = JSON.parse(json)
            dataPlain.map(ele => {
                ele.type === 'Song' && data.push(new Song(ele))
                ele.type === 'SongSearch' && data.push(new SongSearch(ele))
                ele.type === 'StreamSong' && data.push(new StreamSong(ele))
            })
        }
        return data
    }

    static addFavorites = async (item: StreamSong) => {
        let json = await AsyncStorage.getItem(StorageType.Favorites);
        let data: (StreamSong)[] = []
        if (json) { data = JSON.parse(json) }
        if (!(data.filter(ele => ele.key === item.key).length > 0)) {
            data.push(item)
        }
        await AsyncStorage.setItem(StorageType.Favorites, JSON.stringify(data))
    }

    static removeFavorite = async (item: StreamSong) => {
        let json = await AsyncStorage.getItem(StorageType.Favorites);
        let data: StreamSong[] = []
        if (json) { data = JSON.parse(json) }
        data = data.filter(function (obj) {
            return obj.key !== item.key;
        });
        await AsyncStorage.setItem(StorageType.Favorites, JSON.stringify(data))
    }

    static getFavorites = async (): Promise<StreamSong[]> => {
        let json = await AsyncStorage.getItem(StorageType.Favorites);
        let data: StreamSong[] = []
        if (json) {
            let dataPlain: (StreamSong)[] = JSON.parse(json)
            dataPlain.map(ele => { data.push(new StreamSong(ele)) })
        }
        return data
    }

    static isFavorites = async (key: string): Promise<boolean> => {
        let json = await AsyncStorage.getItem(StorageType.Favorites);
        let data: (StreamSong)[] = []
        if (json) { data = JSON.parse(json) }
        return (data.filter(ele => ele.key === key).length > 0)
    }

}