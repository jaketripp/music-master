import React, { Component } from 'react';
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';
import Dashboard from './Dashboard';
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            access_token: localStorage.getItem('access_token') || null,
            showLoadingPage: true,
            userPictureVisible: false
        }
    }
    
    componentWillMount() {
        this.updateAccessToken();
    }

    // send auth code to receive refresh token and access token
    sendAuthCodeToServer() {
        const codeStr = window.location.search.substr(1);
        // "code=AQAxD8_pslriTQVBFTInUu6zelMjoivbKIaXfpgr4v3F08IkJs-cqli2-k2yBdsWje7n6X2c7b-VmpXbW7WIpxKW7n8_cQT31RfH2ccuGsYl2E5kBKvmT5BY9zTlEmHH_THqLwhds-HrluZ0YD3iJuzpbgE6YeRGU00ReKuFJoPqaafb4DM4cUrFQUgrMsEZn6S_QOjQ"
        const url = "https://kiafarhang.com/music-master/spotify/";

        axios.post(url, codeStr)
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    localStorage.setItem('access_token', response.data.access_token);
                    this.setState({
                        access_token: response.data.access_token,
                        isAuthenticated: true,
                        showLoadingPage: false
                    });
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    showLoadingPage: false
                });
            });
    }

    // update access_token using refresh_token stored in localStorage
    updateAccessToken() {

        const refresh_token = localStorage.getItem('refresh_token');
        const url = `https://kiafarhang.com/music-master/refresh_token?refresh_token=${refresh_token}`;
        axios.get(url)
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                this.setState({
                    access_token: response.data.access_token
                });
                this.testAccessToken()
            })
            .catch(e => {
                localStorage.clear();
                this.setState({
                    isAuthenticated: false,
                    showLoadingPage: false
                });
                this.sendAuthCodeToServer();
            });
    }

    testAccessToken() {
        const access_token = localStorage.getItem('access_token');
        const url = "https://kiafarhang.com/music-master/test_token/";

        axios.get(url, { params: { access_token } })
            .then(response => {
                this.setState({
                    isAuthenticated: true,
                    showLoadingPage: false
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    isAuthenticated: false,
                    showLoadingPage: false,
                });
            });
    }

    render() {
        if (this.state.showLoadingPage) {
            return (
                <LoadingPage />
            );
        } else {
            if (this.state.isAuthenticated) {
                return (
                    <Dashboard {...this.state}/>
                );
            } else {
                return (
                    <LoginPage />
                );
            }
        }
    }
};
