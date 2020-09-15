import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { UserInfo } from './UserInfo';
import { UserGiveawaysList } from './UserGiveawaysList';
import { WonGiveawaysList } from './WonGiveawaysList';
import { PartGiveawaysList } from './PartGiveawaysList';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            editing: false,
            userGiveaways: '',
        };

    }

    componentDidUpdate(prevProps) {
        if (prevProps.registrationComplete !== this.props.registrationComplete && this.props.registrationComplete) {
            this.props.history.push('/confirmation');
        }
    }

    componentWillMount() {
        this.props.getMe();
        this.props.getUserGiveaways();
        this.props.getGiveawaysWonByUser();
        this.props.getParticipatingGiveaways();
    }

    render() {
        if (typeof this.props.user !== 'undefined') {
            return (
                <div>
                    <UserInfo user={this.props.user} />
                    <UserGiveawaysList items={this.props.createdBy} />
                    <WonGiveawaysList items={this.props.winnerOf} />
                    <PartGiveawaysList items={this.props.participantOf} />
                </div>
            );
        } else {
            return(
                <div>Loading...</div>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.authenticatedUser,
        loggingIn: state.authentication,
        createdBy: state.users.createdBy,
        winnerOf: state.users.winnerOf,
        participantOf: state.users.participantOf,
    };
}

const mapActionToProps = {
    getMe: userActions.getMe,
    getUserGiveaways: userActions.getUserGiveaways,
    getGiveawaysWonByUser: userActions.getGiveawaysWonByUser,
    getParticipatingGiveaways: userActions.getParticipatingGiveaways,
}

const connectedUserProfile = connect(mapStateToProps, mapActionToProps)(UserProfile);
export { connectedUserProfile as UserProfile };