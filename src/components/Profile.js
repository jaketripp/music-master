import React, { Component } from 'react';

export default class Profile extends Component {
    commify(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            },
            images: [
                { url: '' }
            ],
            genres: []
        };

        artist = this.props.artist !== null ? this.props.artist : artist;
        return (
            <a href={this.props.url} target="_blank">
                <div className="profile content-container">
                    <img
                        src={artist.images[0].url}
                        alt="Profile"
                        className="profile-img"
                    />
                    <div className="profile-info">
                        <div className="profile-name">{artist.name}</div>
                        <div className="profile-followers">
                            {this.commify(artist.followers.total)} followers
                        </div>
                        <div className="profile-genres">
                            {
                                artist.genres.map((genre, k) => {
                                    genre = genre !== artist.genres[artist.genres.length - 1]
                                        ? `${genre}, `
                                        : `& ${genre}`;
                                    return (
                                        <span key={k}>{genre}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </a>

        )
    }
};
