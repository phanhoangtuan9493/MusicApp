import { PlaylistModel } from "../Playlist/PlaylistModel";

export enum StorageType {
    RecentSearchs = 'RecentSearchs',
    RecentListenings = 'RecentListenings',
    Favorites = 'Favorites'
}

export enum PlayState {
    Song = 'Song',
    Favorites = 'Favorites',
    None = 'None',
    Playlist = 'Playlist'
}

export type Screens =  {
    Main: undefined;
    Player: undefined;
    Playlist: undefined
}

export enum ScreensName  {
    Main = 'Main',
    Player = 'Player',
    Playlist = 'Playlist'
}

export type PlayerFavorites = {
    data: StreamSong[],
    index: number
}

export type PlayerPlaylist = {
    data: PlaylistModel,
    index: number
}


export type ItemType = 'Playlist' | 'Topic' | 'Song' | 'StreamSong' | 'PlaylistSearch' | 'SongSearch'

export class Playlist {
    key: string = ''
    title: string = ''
    thumbnail: string = ''
    numOfItems: number = 0
    type: ItemType = 'Playlist'
    constructor(source: Partial<Playlist>) {
        Object.assign(this, source);
    }
}

export class Topic {
    key: string  = ''
    title: string = ''
    thumbnail: string = ''
    type: ItemType = 'Topic'
    constructor(source: Partial<Topic>) {
        Object.assign(this, source);
    }
}

export class Song  {
    key: string = ''
    title: string = ''
    artist: string = ''
    thumbnail: string = ''
    duration: string  = ''
    type: ItemType = 'Song'
    constructor(source: Partial<Song>) {
        Object.assign(this, source);
    }
}

export class StreamSong {
    key: string = ''
    title: string = ''
    artist: string = ''
    thumbnail: string = ''
    url: string = ''
    lyric: string = ''
    duration: string  = ''
    type: ItemType = 'StreamSong'
    constructor(source: Partial<StreamSong>) {
        Object.assign(this, source);
    }
}

export class PlaylistSearch  {
    key: string = ''
    title: string = ''
    thumbnail: string = ''
    numOfItems: number = 0
    artist: string = ''
    type: ItemType = 'PlaylistSearch'
    constructor(source: Partial<PlaylistSearch>) {
        Object.assign(this, source);
    }
}

export class SongSearch  {
    key: string = ''
    title: string = ''
    artist: string = ''
    thumbnail: string = ''
    duration: string = ''
    type: ItemType = 'SongSearch'
    constructor(source: Partial<SongSearch>) {
        Object.assign(this, source);
    }
}