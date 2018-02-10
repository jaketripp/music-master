import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            playing: false,
            audio: null
        }
    }
    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        // if nothing is playing
        if (!this.state.playing) {
            // keep playing last song
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.play();
                this.setState({
                    playing: true
                })
                // play new song
            } else {
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                });
            }
            // if something is playing
        } else {
            // pause current track
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
                // switch tracks 
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playingUrl: previewUrl,
                    playing: true,
                    audio
                })
            }
        }
    }

    render() {
        const { tracks } = this.props;
        return (
            <div className="content-container tracks">
                {
                    tracks.map((track, k) => {
                        const trackImg = track.album.images[0].url;
                        return (
                            <div
                                key={k}
                                className="track"
                                onClick={() => this.playAudio(track.preview_url)}
                            >
                                <img
                                    src={trackImg}
                                    alt="track"
                                    className="track-img"
                                />
                                <div className="track-play">
                                    <div className="track-play-inner">
                                        {
                                            ((this.state.playingUrl === track.preview_url) && this.state.playing)
                                                ? <Glyphicon
                                                    glyph="pause"></Glyphicon>
                                                : <Glyphicon
                                                    glyph="play"></Glyphicon>
                                        }
                                    </div>
                                </div>
                                <p className="track-text">
                                    {track.name}
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
};
