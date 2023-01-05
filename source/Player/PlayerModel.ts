import { get } from "lodash"
import { Song, StreamSong } from "../services/constansts"

type DataApi = {
    data: any,
    lyric: any,
    song: Song
}

export class PlayerModel {

    streamSong: StreamSong = new StreamSong({})

    createModelFromJson(dataApi: DataApi) {

        this.streamSong.type = 'StreamSong'
        this.streamSong.artist = dataApi.song.artist
        this.streamSong.key = dataApi.song.key
        this.streamSong.thumbnail = dataApi.song.thumbnail
        this.streamSong.title = dataApi.song.title

        const duration = get(dataApi.data, 'song.duration', '00:00')
        this, this.streamSong.duration = duration

        const streamUrls = get(dataApi.data, 'song.streamUrls', [])

        streamUrls.forEach((stream: any) => {
            const streamUrl = get(stream, 'streamUrl', '')
            if (streamUrl) { this.streamSong.url = streamUrl }
        });


        const lyricData = get(dataApi.lyric, 'lyric.lyric', '')
        this.streamSong.lyric = lyricData

    }

    createModelFromStreamSong(data: StreamSong) {
        this.streamSong = data
    }

}