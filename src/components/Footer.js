import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default function Footer() {
    return (
        <div className="section section--blue">
            <div className="content-container footer">
                <p>Made with <Glyphicon glyph="heart" /></p>
                <p><a href="http://jaketripp.com">Jake Tripp</a> &copy; 2018</p>
            </div>
        </div>
    )

};
