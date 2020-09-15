import React, { Component } from 'react'
import { connect } from 'react-redux';

import './App.css';
import { userActions, messengerActions } from './_actions/'

import NavigationBar from './common/NavigationBar.js'
import Body from './common/Body';


class App extends Component {
    componentDidMount() {
        this.checkAuth();
        this.props.connectMessenger();
        this.timer = setInterval(() => this.checkAuth(), 3000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    checkAuth() {
        this.props.getMe();
    }
    render() {
        return (
            <div>
                <Body />
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { loading, authenticatedUser } = state.users;
    return {
        loading, authenticatedUser
    };
}
const mapActionToProps = {
    getMe: userActions.getMe,
    connectMessenger: messengerActions.connect,
};
const connectedApp = connect(mapStateToProps, mapActionToProps)(App);
export default connectedApp;
