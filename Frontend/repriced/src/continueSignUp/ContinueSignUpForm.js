import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { isEqual } from 'lodash/lang';
import { tempUserActions, userActions } from '../_actions';
import { UserActions } from '../_actions';
import "react-datepicker/dist/react-datepicker.css";

class ContinueSignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                gender: 'm',
                city: '',
                country: '',
                phoneNumber: '',
                dateOfBirth: {
                    day: 0,
                    month: 0,
                    year: 0,
                },
                vkontakteId: '',
                isApproved: false,
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    componentWillMount() {
        this.props.getMe();
    }

    redirectToHome() {
        this.props.history.push('/');
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.gender) {
            this.props.register(user);
        }
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.tempUser, this.props.tempUser)) { this.setState({ user: this.props.tempUser}); }
        if (!this.state.user.gender) { this.state.user.gender = 'm' };
    }
    render() {
        const { registering, registrationComplete } = this.props;
        const { user, submitted } = this.state;
        if (this.props.loading || (typeof (this.props.loading) == 'undefined')) {
            return (
                <div>
                    <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>)
        }
        else {
	    return (
                <div className="container">
                    <div className="row d-flex justify-content-center" style={{ paddingTop: '40px' }}>
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Just one more step</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" disabled={this.props.tempUser.firstName !== null} defaultValue={this.props.tempUser.firstName || ''} className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                    {submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" disabled={this.props.tempUser.lastName !== null} defaultValue={this.props.tempUser.lastName || ''} className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                                    {submitted && !user.username &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" disabled={this.props.tempUser.email !== null} defaultValue={this.props.tempUser.email || ''} className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                    {submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div>
                                    <div className={'form-group' + (submitted && !user.gender ? ' has-error' : '')}>
                                        <label htmlFor="gender">Gender:</label>
                                        <select disabled={this.props.tempUser.gender !== null} defaultValue={this.props.tempUser.gender || ''} value={user.gender} className="form-control" name="gender" onChange={this.handleChange}>
                                            <option value='m'>Male</option>
                                            <option value='f'>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                    <label htmlFor="country">Country</label>
                                    <input type="text" disabled={this.props.tempUser.country !== null} defaultValue={this.props.tempUser.country || ''} className="form-control" name="country" value={user.country} onChange={this.handleChange} />
                                    {submitted && !user.country &&
                                        <div className="help-block">Country is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.city ? ' has-error' : '')}>
                                    <label htmlFor="city">City</label>
                                    <input type="text" disabled={this.props.tempUser.city !== null} defaultValue={this.props.tempUser.city || ''} className="form-control" name="city" value={user.city} onChange={this.handleChange} />
                                    {submitted && !user.city &&
                                        <div className="help-block">City is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.DateOfBirth ? ' has-error' : '')}>
                                    <label htmlFor="DateOfBirth">DateOfBirth</label>
                                    <DatePicker showYearDropdown
                                        dateFormatCalendar="MMMM"
                                        yearDropdownItemNumber={40}
                                        scrollableYearDropdown autoComplete="off" selected={this.state.startDate} dateFormat="dd/MM/yyyy"
                                        maxDate={new Date().setFullYear(new Date().getFullYear() - 18)} onChange={this.handleDateChange} />
                                </div>
                                <div className={'form-group' + (submitted && !user.phoneNumber ? ' has-error' : '')}>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input disabled={this.props.tempUser.phoneNumber !== null} defaultValue={this.props.tempUser.phoneNumber || ''} type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} onChange={this.handleChange} />
                                    {submitted && !user.phoneNumber &&
                                        <div className="help-block">Phone number is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Complete Registration</button>
                                    {registering &&
                                        <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    {registrationComplete &&
                                        this.redirectToHome()
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        tempUser: state.tempUser.tempUser,
        registering: state.registration.registering,
        registrationComplete: state.registration.registrationComplete,
        loading: state.tempUser.loading
    };
}

const mapActionToProps = {
    getMe: tempUserActions.getMe,
    register: userActions.register,
}

const connectedContinueSignUpForm = connect(mapStateToProps, mapActionToProps)(ContinueSignUpForm);
export { connectedContinueSignUpForm as ContinueSignUpForm };
