import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import "react-datepicker/dist/react-datepicker.css";

class EmailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.tokenHash) {
            this.props.confirmEmail(this.props.match.params.tokenHash);
        }
    }

    redirectToHome() {
        this.props.history.push('/');
    }

    componentDidUpdate(prevProps) {
        if (this.props.confirmationSuccess) {
            this.timeoutHandle = setTimeout(() => {
                this.redirectToHome();
            }, 2500);
        }
    }

    render() {
        if(!this.props.match.params.tokenHash || (typeof (this.props.match.params.tokenHash) == 'undefined')){
            return (
                <div className="container" style={{ paddingTop: '40px' }}>
                    <h1>Verification letter has been sent on your email.</h1>
                </div>
            )
        }
        else if (this.props.loading || (typeof (this.props.loading) == 'undefined')) {
            return (
                <div>
                    <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>)
        } else if (this.props.confirmationSuccess) {
            return (
                <div className="container" style={{ paddingTop: '40px' }}>
                    <h1>Congratulations on successful email verification!</h1>
                </div>
            );
        } else if (this.props.confirmationSuccess === false) {
            return (
                <div className="container" style={{ paddingTop: '40px' }}>
                    <h1>Something went wrong with your confirmation. Make sure you are logged in!</h1>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        confirmationSuccess: state.users.confirmationSuccess,
        loading: state.users.loading,
    };
}

const mapActionToProps = {
    confirmEmail: userActions.confirmEmail,
}

const connectedEmailConfirmation = connect(mapStateToProps, mapActionToProps)(EmailConfirmation);
export { connectedEmailConfirmation as EmailConfirmation };