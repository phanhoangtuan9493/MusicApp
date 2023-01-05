import { get } from "lodash"
import { Playlist, Song, SongSearch, Topic } from "../services/constansts"

export class HomeModel {

    playlist: Playlist[] = []
    topic: Topic[] = []
    ranking: Song[] = []
    recentListenings: (Song | SongSearch)[] = []

    constructor(dataApi: any, dataLocal: (Song | SongSearch)[]) {

        const topicEvents = get(dataApi, 'topicEvent', [])
        topicEvents.map((ele: any) => {
            const listPlaylists = get(ele, 'listPlaylist', [])
            listPlaylists.map((playList: any) => {
                const key = get(playList, 'key', '')
                const title = get(playList, 'title', '')
                const thumbnail = get(playList, 'thumbnail', '')
                const numOfItems = get(playList, 'numOfItems', 0)
                if (key && title && thumbnail && numOfItems) {
                    this.playlist.push(new Playlist({
                        key: key,
                        title: title,
                        thumbnail: thumbnail,
                        numOfItems: numOfItems,
                        type: 'Playlist'
                    }))
                }
            })
        })

        const topics = get(dataApi, 'topic', [])
        topics.map((topic: any) => {
            const key = get(topic, 'key', '')
            const title = get(topic, 'title', '')
            const thumbnail = get(topic, 'thumbURL', '')
            if (key && title && thumbnail) {
                this.topic.push(new Topic({
                    key: key,
                    title: title,
                    thumbnail: thumbnail,
                    type: 'Topic'
                }))
            }
        })

        const ranking = get(dataApi, 'ranking.song', [])
        ranking.map((song: any) => {
            const key = get(song, 'songKey', '')
            const title = get(song, 'title', '')
            const thumbnail = get(song, 'thumbnail', '')
            const artists: [] = get(song, 'artists') || []
            const artist = artists.map((artist: any) => artist.name).join(', ') || ''
            if (title && key && artist) {
                this.ranking.push(new Song({
                    key: key,
                    title: title,
                    thumbnail: thumbnail,
                    artist: artist,
                    duration: '',
                    type: 'Song'
                }))
            }
        })

        this.recentListenings = dataLocal

    }

}