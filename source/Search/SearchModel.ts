import { get } from "lodash"
import { PlaylistSearch, SongSearch } from "../services/constansts"

export class SearchModel {

    result: (PlaylistSearch | SongSearch)[] = []

    constructor(data: any) {

        let playlists: PlaylistSearch[] = []
        const playlist = get(data, 'search.playlist.playlist', [])
        playlist.map((playlist: any) => {
            const key = get(playlist, 'key', '')
            const title = get(playlist, 'title', '')
            const thumbnail = get(playlist, 'thumbnail', '')
            const numOfItems = get(playlist, 'numOfItems', 0)
            const artists = get(playlist, 'artists', [])
            const artist = artists.map((artist: any) => artist.name).join(', ') || ''
            playlists.push(new PlaylistSearch({
                key: key,
                title: title,
                thumbnail: thumbnail,
                numOfItems: numOfItems,
                artist: artist,
                type: 'PlaylistSearch'
            }))
        })

        let songs: SongSearch[] = []
        const song = get(data, 'search.song.song', [])
        song.map((song: any) => {
            const key = get(song, 'key', '')
            const title = get(song, 'title', '')
            const thumbnail = get(song, 'thumbnail', '')
            const duration = get(song, 'duration', '')
            const artists = get(song, 'artists', [])
            const artist = artists.map((artist: any) => artist.name).join(', ') || ''
            songs.push(new SongSearch({
                key: key,
                title: title,
                thumbnail: thumbnail,
                duration: duration,
                artist: artist,
                type: 'SongSearch'
            }))
        })

        if (songs.length > 0) { this.result = this.result.concat(songs) }
        if (playlists.length > 0) { this.result = this.result.concat(playlists) }

    }

}