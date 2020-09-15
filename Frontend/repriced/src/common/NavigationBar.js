import style from './common.module.css';
import styleHome from './commonHome.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {connect} from 'react-redux';
import {ReactiveBase, DataSearch} from '@appbaseio/reactivesearch';
import {LoginForm} from '../login';
import {userActions} from '../_actions';
import {withRouter} from "react-router";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
        };
        this.login = this.login.bind(this);
        this.style = {};
        this.class = {};
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({authenticatedUser: this.props.authenticatedUser, loading: this.props.loading})
        }
        if (this.props.location.pathname === '/') {
            this.style = styleHome
            this.class = 'fixed-top'
        } else {
            this.style = style;
            this.class = 'bg-dark'
        }
    }

    login() {
        this.props.loginForm(true);
    }

    render() {
        const {authenticatedUser, loading, showLogin} = this.state;
        const {user} = this.props;
        if (authenticatedUser === undefined) {
            return null;
        }
        return (
            <div>
                <Navbar className={`${this.style.navbar} ${this.class}`} variant="dark" expand="lg">
                    <Navbar.Brand href="/"><img className="d-inline-block align-top" alt="Repriced"
                                                src={require('../logo.png')}
                                                width="119.997" height="37.494"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className={this.style.navlink} href="/">Home</Nav.Link>
                            {!(authenticatedUser || user) &&
                            <Nav.Link className={this.style.navlink} onClick={this.login}>Login</Nav.Link>
                            } {!(authenticatedUser || user) &&
                        <Nav.Link className={this.style.navlink} href="/signup">Sign Up</Nav.Link>
                        }
                            <LoginForm/>
                            <Nav.Link className={this.style.navlink} href="/giveaway">Giveaway</Nav.Link>
                            <Nav.Link className={this.style.navlink} href="/giveawaysSearch">Giveaways List</Nav.Link>
                            {(authenticatedUser || user) &&
                            <Nav.Link className={this.style.navlink} href="/userProfile">Profile</Nav.Link>
                            }
                        </Nav>
                        <Nav>
                            <ReactiveBase
                                app="giveaways"
                                url="http://localhost:9200"
                            >
                                <DataSearch
                                    componentId="AppSearch"
                                    dataField={["product.title",]}
                                    // URLParams
                                    onValueSelected={(val) => this.props.history.push(`/searchResult/?AppSearch="${val}"`)}
                                />
                            </ReactiveBase>
                        </Nav>
                        {(authenticatedUser || user) &&
                        <Nav>
                            <Nav.Link className="navlink" href="/messenger"><FontAwesomeIcon icon={faEnvelope}
                                                                                             size="lg"/></Nav.Link>
                        </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authenticatedUser, loading} = state.users;
    const {user} = state.authentication;
    return {authenticatedUser, loading, user};
}

const mapActionToProps = {
    loginForm: userActions.loginForm,
};
export default connect(mapStateToProps, mapActionToProps)(withRouter(NavigationBar));
