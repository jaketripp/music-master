import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: [],
            showError: false,
            ...props
        }
    }

    getUserInfo() {
        const access_token = localStorage.getItem('access_token');

        const url = "https://satin-taxi.glitch.me/test_token/";

        axios.get(url, { params: { access_token } })
            .then(response => {

                const display_name = response.data.display_name;
                const img = response.data.images[0].url;
                const spotify_url = response.data.external_urls.spotify;

                localStorage.setItem('display_name', display_name);
                localStorage.setItem('img', img);
                localStorage.setItem('spotify_url', spotify_url);
            })
            .catch(e => {
                console.log(e);
            });
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const ARTIST_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists';

        const authHeader = {
            headers: {
                Authorization: 'Bearer ' + this.state.access_token
            }
        };
        axios.get(ARTIST_URL, authHeader)
            .then(response => {

                const artist = response.data.artists.items[0];
                const url = artist.external_urls.spotify;
                const id = artist.id;
                const query = ''; // clear searchbar
                this.setState({ artist, id, url, query });


                const FETCH_TRACKS_URL = `${ALBUM_URL}/${id}/top-tracks?country=US`;
                axios.get(FETCH_TRACKS_URL, authHeader)
                    .then(response => {

                        const { tracks } = response.data;
                        this.getUserInfo();
                        this.setState({ tracks, showError: false });

                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ showError: true });
                    });
            })
            .catch((error) => {
                console.log('error ' + error);
                this.setState({ showError: true });
            });
    }


    render() {
        return (
            <div className="App">
                <Header />
                <div className="section section--blue">
                    <FormGroup className="content-container">
                        <InputGroup>
                            <FormControl
                                autoFocus
                                type="text"
                                placeholder="Search for an artist"
                                value={this.state.query}
                                onChange={e => this.setState({ query: e.target.value })}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        this.search();
                                    }
                                }}
                            />
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>
                {this.state.showError &&
                    <div className="error content-container">
                        <p>Something went wrong!</p>
                    </div>
                }
                {
                    (this.state.artist !== null && !this.state.showError) &&
                    <div className="section section--blue">
                        <Profile
                            artist={this.state.artist}
                            url={this.state.url}
                        />
                        <Gallery tracks={this.state.tracks} />
                    </div>
                }
                <Footer />
            </div>
        );
    }
};
