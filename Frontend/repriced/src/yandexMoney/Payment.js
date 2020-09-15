import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { paymentUrl } from './config'
import { userActions } from '../_actions';
import { apiUrl } from '../_services';

class Payment extends React.Component {

    render() {
        return (
            <iframe src={paymentUrl} width="100%" height="250" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}
const mapActionToProps = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedPayment = connect(mapStateToProps, mapActionToProps)(Payment);
export { connectedPayment as Payment };