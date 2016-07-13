'use strict;'

const ytdl = require('ytdl-core');
const Song = require('./song');

module.exports = class YtSong extends Song {
    constructor(link, requester, type) {
        super(link, requester, type);
    }

    getInfo() {
        ytdl.getInfo(this.link, (err, info) => {
            if(err) {
                console.log(`Error getting yt song info: ${err}`)
                throw err;
            }

            if(!info) {
                throw new Error('Couldn\'t find a song with the search');
            }

            this.title = info.title;
            return Promise.resolve(this);
        });
    }

    getStream() {
        return Promise.resolve(ytdl(this.link, {filter: 'audioonly'}).on('error', err => {
            console.log(`Error getting yt song stream: ${err}`)
            throw err;
        }));
    }
}