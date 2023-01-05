export class Time {

    static getHelloString(): string {

        var today = new Date()
        var curHr = today.getHours()

        if (curHr > 3 && curHr <= 12) {
            return 'Good morning!'
        } else if (curHr <= 15) {
            return 'Good afternoon!'
        } else {
            return 'Good evening!'
        }
    }

    static secondsToHHMMSS = (seconds: number | string) => {
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
        const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
        return `${hrs}${mins}${scnds}`;
    };

    static secondsToFormalHHMMSS = (seconds: number | string) => {
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const hrs = h > 0 ? (h < 10 ? `0${h} hrs ` : `${h} hrs `) : '';
        const mins = m > 0 ? (m < 10 ? `0${m} min ` : `${m} min `) : '00 min ';
        const scnds = s > 0 ? (s < 10 ? `0${s} sec` : `${s} sec`) : '00 sec';
        return `${hrs}${mins}${scnds}`;
    };

    static MMSSToSeconds = (value: string) => {
        const a = value.split(':')
        const seconds = (+a[0]) * 60 + (+a[1]); 
        return seconds
    }
}