import React, { Component } from 'react';

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const display_name = localStorage.getItem('display_name');
        const img = localStorage.getItem('img');
        const spotify_url = localStorage.getItem('spotify_url');
        return (
            <div className="section section--green">
                <div className="header content-container">
                    <h1>Music<br/>Master</h1>
                    <div className="user">
                        <a href={spotify_url}>
                            {img && <img src={img} className="user--img" alt={`An image of ${display_name}`} />}
                            <p className="user--name">{display_name}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
};
