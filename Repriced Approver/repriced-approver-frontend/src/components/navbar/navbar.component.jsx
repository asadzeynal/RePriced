import React, {Component} from "react";
import {Link} from "react-router-dom";
import nav_classes from './navbar.module.css'

export default class Navbar extends Component {
    render() {
        return (
            <div className={nav_classes.sidebar}>
                <nav className="col-md-2 d-none d-md-block sidebar">
                    <Link to="/" className="navbar-brand">Repriced Approver</Link>
                    <div className="sidebar-sticky">

                        <ul className="nav flex-column">
                            <li className={nav_classes.nav_item}>
                                <Link to="/giveaways" className="nav-link">Giveaways</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}