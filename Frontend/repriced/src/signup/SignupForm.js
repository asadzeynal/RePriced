import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { userActions } from '../_actions';
import "react-datepicker/dist/react-datepicker.css";
import "../lib/customReactDatePicker.css"

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                gender: '',
                city: '',
                country: '',
                phoneNumber: '',
                dateOfBirth: {
                    day: 0,
                    month: 0,
                    year: 0,
                }
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.registrationComplete !== this.props.registrationComplete && this.props.registrationComplete) {
            this.props.history.push('/confirmation');
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="container">
                <div className="row d-flex justify-content-center" style={{ paddingTop: '40px' }}>
                    <div className="col-md-5 col-md-offset-3">
                        <h2>Register</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
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
                                <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="gender">Gender:</label>
                                    <select value={user.gender} className="form-control" name="gender" onChange={this.handleChange}>
                                        <option value='m'>Male</option>
                                        <option value='f'>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control" name="country" value={user.country} onChange={this.handleChange} />
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
                                    maxDate={new Date().setFullYear(new Date().getFullYear() - 18)} onChange={this.handleDateChange} />
                            </div>
                            <div className={'form-group' + (submitted && !user.phoneNumber ? ' has-error' : '')}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} onChange={this.handleChange} />
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
                                <button className="btn btn-primary">Register</button>
                                {registering &&
                                    <FontAwesomeIcon icon={faSpinner} spin size="sm" />
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

function mapStateToProps(state) {
    const { registering, registrationComplete } = state.registration;
    return { registering, registrationComplete };
}

const mapActionToProps = {
    register: userActions.register
}

const connectedSignupForm = connect(mapStateToProps, mapActionToProps)(SignupForm);
export { connectedSignupForm as SignupForm };