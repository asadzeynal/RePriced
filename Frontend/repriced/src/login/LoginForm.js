import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, } from 'react-bootstrap';
import { apiUrl } from '../_services/config'
import '../bootstrap-social.css';
import { userActions } from '../_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faVk, faGoogle } from "@fortawesome/free-brands-svg-icons"



class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            showLoginForm: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.showLoginForm !== this.props.showLoginForm) {
            this.setState({ showLoginForm: this.props.showLoginForm });
        }
        if(this.props.loggedIn) {
            this.handleClose();
        }
        if (prevProps.authenticatedUser === null || prevProps.authenticatedUser === undefined)
            if (this.props.authenticatedUser !== undefined && this.props.authenticatedUser !== null) {
                this.handleClose();
            }
    }
    handleClose = () => this.props.loginForm(false);

    render() {
        const { loggingIn, } = this.props;
        const { email, password, submitted, showLoginForm } = this.state;
        return (
            <Modal show={showLoginForm} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <div className="container">
                    <div className="row d-flex justify-content-center" style={{ paddingTop: '5%' }}>
                        <div  >
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <input type="text" placeholder="Email address" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                    {submitted && !email &&
                                        <div className="help-block">email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <input type="password" placeholder="Password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Login</button>
                                    {loggingIn &&
                                        <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/signup" onClick={this.handleClose} className="btn btn-link btn-outline-info btn-block ">Register</Link>
                                </div>
                                <p className="text-muted" style={{ marginBottom: 4, marginTop: 20 }}>Login using social networks:</p>
                                <div className="form-group">
                                    <a href={`${apiUrl}/auth/google`} className="btn btn-social btn-block btn-google text-white btn-md ">
                                        <div>
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </div>
                                        Sign in with Google
                                </a>
                                    <a href={`${apiUrl}/auth/facebook`} className="btn btn-social btn-facebook text-white btn-md btn-block">
                                        <div>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </div>
                                        Sign in with Facebook
                                </a>
                                    <a href={`${apiUrl}/auth/vk`} className="btn btn-social btn-vk text-white btn-md btn-block">
                                        <div>
                                            <FontAwesomeIcon icon={faVk} />
                                        </div>
                                        Sign in with Vkontakte
                                </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    const { authenticatedUser, showLoginForm } = state.users;
    return { loggingIn, authenticatedUser, showLoginForm, loggedIn };
}

const mapActionToProps = {
    login: userActions.login,
    logout: userActions.logout,
    loginForm: userActions.loginForm,
};

const connectedLoginForm = connect(mapStateToProps, mapActionToProps)(LoginForm);
export { connectedLoginForm as LoginForm };
