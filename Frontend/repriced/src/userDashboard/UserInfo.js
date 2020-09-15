import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { userActions } from '../_actions';
import "react-datepicker/dist/react-datepicker.css";
import "../lib/customReactDatePicker.css"

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            submitted: false,
            editing: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSave(event) {
        event.preventDefault();
        const { user } = this.state;
        this.props.updateProfile(user);
        this.setState({ submitted: true, editing: false });
    }

    handleDateChange(date) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                dateOfBirth: {
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                },
            },
            startDate: date,
        });
    }

    handleEdit(event) {
        event.preventDefault();

        this.setState({ editing: true });
        const { user } = this.state;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.registrationComplete !== this.props.registrationComplete && this.props.registrationComplete) {
            this.props.history.push('/confirmation');
        }
    }

    render() {
        let { user, submitted, loading, editing } = this.state;
        if (typeof user !== 'undefined') {
            return (
                <div className="container">
                    <div className="row d-flex justify-content-center" style={{ paddingTop: '40px' }}>
                        <div className="col-md-5 col-md-offset-3">
                            <h2>Your profile</h2>
                            <h4>Personal information</h4>
                            <form name="form" onSubmit={this.handleEdit}>
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control"  name="firstName" value={user.firstName} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={user.lastName} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={user.username} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.username &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value={user.email} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div>
                                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                        <label htmlFor="gender">Gender:</label>
                                        <select value={user.gender} className="form-control" name="gender" disabled={!editing} onChange={this.handleChange}>
                                            <option value='m'>Male</option>
                                            <option value='f'>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                    <label htmlFor="country">Country</label>
                                    <input type="text" className="form-control" name="country" value={user.country} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.country &&
                                        <div className="help-block">Country is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.city ? ' has-error' : '')}>
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" name="city" value={user.city} onChange={this.handleChange} />
                                    {submitted && !user.city &&
                                        <div className="help-block">City is required</div>
                                    }
                                </div>
                                <div className={'form-group customDatePickerWidth' + (submitted && !user.DateOfBirth ? ' has-error' : '')}>
                                    <label htmlFor="DateOfBirth">Date Of Birth</label>
                                    <DatePicker className="form-control" showYearDropdown
                                        dateFormatCalendar="MMMM"
                                        yearDropdownItemNumber={40}
                                        scrollableYearDropdown autoComplete="off" selected={this.state.startDate} dateFormat="dd/MM/yyyy"
                                        maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}  disabled={!editing} onChange={this.handleDateChange} />
                                </div>
                                <div className={'form-group' + (submitted && !user.phoneNumber ? ' has-error' : '')}>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.phoneNumber &&
                                        <div className="help-block">Phone number is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={user.password} disabled={!editing} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Edit</button>
                                    {editing &&
                                        <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>Loading</div>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
    };
}

const mapActionToProps = {
    updateProfile: userActions.updateProfile,
}

const connectedUserInfo = connect(mapStateToProps, mapActionToProps)(UserInfo);
export { connectedUserInfo as UserInfo };