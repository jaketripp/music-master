import React from 'react';
import Footer from './Footer';

const LoginPage = () => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="box-layout__title">Music Master</h1>
			<p>Login to hear your favorite artists' most popular songs.</p>
			<a className="button" href="https://accounts.spotify.com/authorize/?client_id=b6fe7be1e4594b389dc0d42c9a3f7fd5&response_type=code&redirect_uri=https://jaketripp-music-master.herokuapp.com/"><i className="fa fa-spotify" aria-hidden="true"></i> Spotify</a>
		</div>
		<Footer />
	</div>
);

export default LoginPage;