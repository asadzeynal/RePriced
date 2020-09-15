import React from 'react';
import { connect } from 'react-redux';

import { giveawayActions } from '../_actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../lib/customReactDatePicker.css"


class GiveawayPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            status: 'inited',
            participantsLimit: '',
            costByParticipant: '',
            cost: '',
            category: '',
            expirationDate: '',
            submitted: false,
            photos: [],
            currentStep: 1,
            photoInputCount: 3,
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        if (name === 'photo') {

            const files = Array.from(e.target.files);
            this.setState({ uploading: true })
            const formData = new FormData()

            formData.append('photo', files[0]);
            formData.append('giveawayID', this.state.giveaway.data.id);
            formData.append('index',e.target.getAttribute('index'));

            this.props.uploadPhoto(formData);
        }
        else {
            this.setState({ [name]: value });
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        // this.setState({ submitted: true });
        // let { title, description, status, participantsLimit, costByParticipant, cost, category, expirationDate, submitted, photos } = this.state;
        // if (title && description && participantsLimit && cost && category && expirationDate) {
        //     expirationDate = {
        //         day: expirationDate.getDate(),
        //         month: expirationDate.getMonth(),
        //         year: expirationDate.getFullYear(),
        //     }
        //     this.props.createGiveaway({ title, description, status, participantsLimit, costByParticipant, cost, category, expirationDate, submitted, photos });
        // }
    }
    handleDateChange(date) {
        this.setState({
            expirationDate: date,
        });
    }

    handleCreate() {
        // console.log(this.state.giveaway.data.id);
        // const formData = new FormData()
        // this.state.photos;
        // files.forEach((file, i) => {
            // formData.append(i, file)
        // })
    }

    MainForm(props) {
        const { title, description, participantsLimit, cost, category, expirationDate, submitted, currentStep } = props.state;
        const handleChange = props.handleChange;
        const handleSubmit = props.handleSubmit;
        const handleDateChange = props.handleDateChange;
        if (currentStep !== 1) {
            return null;
        }
        return (
            <div >
                <form name="form" onSubmit={handleSubmit}>
                    <h2>Giveaway Creation</h2>
                    <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="Title" className="form-control" name="title" value={title} onChange={handleChange} />
                        {submitted && !title &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" value={description} onChange={handleChange} />
                        {submitted && !title &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !participantsLimit ? ' has-error' : '')}>
                        <label htmlFor="participantsLimit">Maximum number of participants</label>
                        <input type="text" className="form-control" name="participantsLimit" value={participantsLimit} onChange={handleChange} />
                        {submitted && !participantsLimit &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !cost ? ' has-error' : '')}>
                        <label htmlFor="cost">Product Cost</label>
                        <input type="text" className="form-control" name="cost" value={cost} onChange={handleChange} />
                        {submitted && !cost &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !category ? ' has-error' : '')}>
                        <label htmlFor="category">Product Category</label>
                        <input type="text" className="form-control" name="category" value={category} onChange={handleChange} />
                        {submitted && !category &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>
                    <div className={'customDatePickerWidth form-group' + (submitted && !expirationDate ? ' has-error' : '')}>
                        <DatePicker className="form-control" name="expirationDate" showYearDropdown
                            dateFormatCalendar="MMMM"
                            yearDropdownItemNumber={40}
                            scrollableYearDropdown autoComplete="off" placeholderText="Expiration Date" selected={expirationDate} dateFormat="dd/MM/yyyy"
                            minDate={new Date()} maxDate={new Date().setMonth(new Date().getMonth() + 1)} onChange={handleDateChange} />
                        {submitted && !expirationDate &&
                            <div className="text-danger">Field is required</div>
                        }
                    </div>

                    {/* <div className="form-group"> */}
                    {/* <button className="btn btn-primary">Save</button> */}
                    {/* {GiveawaySaved &&
                            // <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                    {/* </div> */}
                </form>
            </div>
        );

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ giveaway: this.props.giveaway });
        }
    }

    render() {
        const { creatingGiveaway } = this.props;
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <this.MainForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state} handleDateChange={this.handleDateChange} />

                    <PhotoUpload
                        creatingGiveaway={creatingGiveaway}
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        photoInputCount={this.state.photoInputCount}
                        handleCreate={this.handleCreate}
                    />
                    <div>
                        {/* {this.previousButton()} */}
                        {this.nextButton()}
                    </div>
                </div>
            </div >
        );
    }
    _next = () => {
        this.setState({ submitted: true });
        let { title, description, status, participantsLimit, costByParticipant, cost, category, expirationDate, submitted, photos } = this.state;

        if (title && description && participantsLimit && cost && category && expirationDate) {
            expirationDate = {
                day: expirationDate.getDate(),
                month: expirationDate.getMonth(),
                year: expirationDate.getFullYear(),
            }
            this.props.createGiveaway({ title, description, status, participantsLimit, costByParticipant, cost, category, expirationDate, submitted, photos });
            let currentStep = this.state.currentStep;
            if (currentStep === 1) {
                currentStep = 2;
            }
            this.setState({
                currentStep: currentStep
            });
        }
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        if (currentStep === 2) {
            currentStep = 1;
        }
        this.setState({
            currentStep: currentStep
        })
    }
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 2) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
            </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
            </button>
            )
        }
        return null;
    }
}

class PhotoUpload extends React.Component {

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        const inputs = [];

        const { creatingGiveaway, photoInputCount, handleChange, handleCreate } = this.props;
        for (let i = 1; i <= photoInputCount; i++) {
            inputs.push(
                <div key={'fg' + i} className="form-group">
                    <input className="form-control-file" type="file" name='photo' key={i} index={i} onChange={handleChange} />
                </div>
            )
        }
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="photoInputCount">Number of photos to upload</label>
                    <select name="photoInputCount" className="browser-default custom-select" onChange={handleChange}>
                        <option key="3" value="3">3</option>
                        <option key="4" value="4">4</option>
                        <option key="5" value="5">5</option>
                    </select>
                </div>
                {inputs}
                <div>
                    <button className="btn btn-primary float-right" type="button" onClick={handleCreate} >Create Giveaway</button>
                    {creatingGiveaway &&
                        <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { creatingGiveaway, giveaway } = state.giveaway;
    return { creatingGiveaway, giveaway };
}

const mapActionToProps = {
    createGiveaway: giveawayActions.createGiveaway,
    uploadPhoto: giveawayActions.uploadPhoto,
};

const connectedGiveawayPage = connect(mapStateToProps, mapActionToProps)(GiveawayPage);
export { connectedGiveawayPage as GiveawayPage };
