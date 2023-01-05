import { get } from "lodash";
import { Playlist, Song } from "../services/constansts";
import { Time } from "../services/Time";

export class PlaylistModel {

    playlist: Playlist = new Playlist({})
    songs: Song[] = []

    constructor(data: any) {

        const playList = get(data, 'playlist', {})

        const key = get(playList, 'key', '')
        const title = get(playList, 'title', '')
        const thumbnail = get(playList, 'thumbnail', '')
        const songs = get(playList, 'songs', [])
        this.playlist.key = key
        this.playlist.title = title
        this.playlist.thumbnail = thumbnail
        this.playlist.numOfItems = songs.length
        this.playlist.type = 'Playlist'

        songs.map((song: any) => {
            const key = get(song, 'key', '')
            const title = get(song, 'title', '')
            const thumbnail = get(song, 'thumbnail', '')
            const artists = get(song, 'artists', [])
            const duration = get(song, 'duration', '')
            const artist = artists.map((artist: any) => artist.name).join(', ') || ''
            if (title && key && artist) {
                this.songs.push(new Song({
                    key: key,
                    title: title,
                    thumbnail: thumbnail,
                    artist: artist,
                    duration: duration,
                    type: 'Song'
                }))
            }
        })
    }

}