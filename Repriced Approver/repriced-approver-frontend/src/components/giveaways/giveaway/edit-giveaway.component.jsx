import React from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

import edit_giveaway_classes from './edit-giveaway.module.css';

export default class EditGiveaway extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costByParticipant: '',
            id: 0,
            status: '',
            participantsLimit: 0,
            expirationDate: new Date(),
            product: {
                title: '',
                description: '',
                photos: [],
                category: ''
            }
        }

        this.onChangeCostByParticipant = this.onChangeCostByParticipant.bind(this);
        this.onChangeGiveawayStatus = this.onChangeGiveawayStatus.bind(this);
        this.onChangeParticipantsLimit = this.onChangeParticipantsLimit.bind(this);
        this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
        this.onSubmitEdit = this.onSubmitEdit.bind(this);
    }

    componentDidMount() {
        loadProgressBar();
        axios.get('http://localhost:3000/giveaways/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.product.photos);
                this.setState({
                    costByParticipant: response.data.costByParticipant,
                    status: response.data.status,
                    participantsLimit: response.data.participantsLimit,
                    expirationDate: new Date (response.data.expirationDate.substring(0,10)),
                    product : {
                        title: response.data.product.title,
                        description: response.data.product.description,
                        photos: response.data.product.photos,
                        category: response.data.product.category

                    }
                })

                console.log(this.state.expirationDate)
            }).catch(err => console.log(err));
    }

    //update fields: giveaway details
    onChangeCostByParticipant(e) {
        this.setState({
            costByParticipant: e.target.value
        })
    }

    onChangeGiveawayStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangeParticipantsLimit(e) {
        this.setState({
            participantsLimit: e.target.value
        })
    }

    onChangeExpirationDate(date){
        this.setState({
            expirationDate: date
        })
    }

    onSubmitEdit(e) {
        e.preventDefault();
        const giveaway = {
            costByParticipant: this.state.costByParticipant,
            participantsLimit: this.state.participantsLimit,
            expirationDate: this.state.expirationDate
        }
        axios.put(process.env.REACT_APP_GIVEAWAYS_API + this.props.match.params.id, giveaway)
            .then(res => console.log(res.data));
        window.location = '/giveaways';
    }

    onSubmitApprove(e){
        e.preventDefault();
        const giveaway = {
            status: 'approved'
        }
        axios.put(process.env.REACT_APP_GIVEAWAYS_API + this.props.match.params.id, giveaway)
            .then(res => console.log(res.data));
        window.location = '/giveaways';
    }

    render() {
        return (
            <div>
                <h3>Edit Giveaway</h3>
                <form onSubmit={this.onSubmitEdit}>
                    <div className="form-group">
                        <label>Cost By Participant </label>
                        <input type="number"
                               required
                               className="form-control"
                               value={this.state.costByParticipant}
                               onChange={this.onChangeCostByParticipant}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.status}
                               onChange={this.onChangeGiveawayStatus}
                        />
                    </div>

                    <div className="form-group">
                        <label>Participants Limit</label>
                        <input type="number"
                               required
                               className="form-control"
                               value={this.state.participantsLimit}
                               onChange={this.onChangeParticipantsLimit}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.expirationDate}
                                onChange={this.onChangeExpirationDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Product Photos</label>
                        <div>
                            {
                                this.state.product.photos.map(product_photo => {
                                    return <img src={product_photo} className={edit_giveaway_classes} />
                                })
                            }
                        </div>
                    </div>

                    {/*SUBMIT ACTIONS
                                    EDIT
                                        APPROVE
                                            DECLINE*/}
                    <div className="row">
                        <div className="form-group mr-1">
                            <input type="submit" value="Edit Giveaway" className="btn btn-primary"/>
                        </div>

                        <div className="form-group mr-1">
                            <input type="submit" value="Approve" className="btn btn-success" onClick={this.onSubmitApprove.bind(this)}/>
                        </div>

                        <div className="form-group mr-1">
                            <input type="submit" value="Decline" className="btn btn-danger" />
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}