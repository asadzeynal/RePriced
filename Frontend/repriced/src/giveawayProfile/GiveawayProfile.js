import React from 'react';
import { connect } from 'react-redux';

import { giveawayActions, userActions, messengerActions } from '../_actions';
import { Carousel, ProgressBar, Button, Modal, } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { isEqual } from 'lodash/lang';
import './giveawayProfile.css';

class GiveawayProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleParticipate = this.handleParticipate.bind(this);
        this.handleFindWinner = this.handleFindWinner.bind(this);
        this.handleProductDelivered = this.handleProductDelivered.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);

        this.state = {
            showMessageInput: false,
            msgText: '',
        };
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    componentDidMount() {
        this.getGiveawayProfile();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            if (this.props.authenticatedUser && !isEqual(this.props.authenticatedUser, this.authenticatedUser)) {
                this.authenticatedUser = this.props.authenticatedUser;
            }
            if (!isEqual(this.props.priorConversation, prevProps.priorConversation)) {
                this.props.history.push('/messenger');
            }
        }
    }
    CarouselItems(props) {
        const { photos } = props;
        const items = [];
        if (photos === null) {
            return null;
        }
        photos.forEach((photo, i) => {
            items.push(
                <Carousel.Item className="item" key={i}>
                    <img
                        className="d-block h-100"
                        src={photo}
                        alt=""
                    />
                </Carousel.Item>
            )
        });
        return (<Carousel className="w-85">
            {items}
        </Carousel>)
    }
    render() {
        this.giveaway = this.props.giveaway;
        if (this.giveaway === undefined) {
            return (
                <div>
                    <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            );
        }

        if (this.props.giveaway.loading) {
            return (
                <div>
                    <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            )
        } else {
            this.participating = false;
            if (this.authenticatedUser !== undefined) {
                this.isOwner = this.authenticatedUser.id === this.props.giveaway.owner_id;
                this.isWinner = this.authenticatedUser.id === this.props.giveaway.winner_id;
                Object.values(this.giveaway.participants).forEach(value => {
                    if (value.id === this.authenticatedUser.id) {
                        this.participating = true;
                    }
                });
            }

            let button;
            if (this.giveaway.status === 'winnerSelected') {
                button = <h3>The winner is user by id {this.giveaway.winner_id} </h3>
            }
            else if (this.isOwner) {
                button = <Button variant="primary" block size="lg" onClick={this.handleFindWinner} >Find the winner!</Button>
            } else if (this.participating) {
                button = <div>
                    <h3 className="text-right">You are participating.</h3>
                    <Button variant="success" block size="lg" onClick={() => this.showMessageDialogBox()}>Write a message</Button>
                </div>;
            }
            else if (this.authenticatedUser !== undefined) {
                button = <div><Button variant="primary" block size="lg" onClick={this.handleParticipate} >Participate!</Button>
                    <Button variant="success" block size="lg" onClick={() => this.showMessageDialogBox()}>Write a message</Button></div>;
            }
            else {
                button = <Button variant="primary" block size="lg" onClick={() => this.props.loginForm(true)} >Participate!</Button>;
            }
            if (this.isWinner) {
                button = <Button variant="primary" block size="lg" onClick={this.handleProductDelivered}>Product delivered!</Button>;
            }
            return (
                <div className="container w-75">
                    <div className="row">
                        <div className="col-8">
                            <h2>{this.giveaway.product.title}</h2>
                        </div>
                        <div className="col-4">
                            <h2 className="float-right">Cost of chance {this.giveaway.costByParticipant} $</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ProgressBar id="progressBar" animated now={this.giveaway.participants.length} label={`${this.giveaway.participants.length}/${this.giveaway.participantsLimit} Participants`} max={this.giveaway.participantsLimit} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <this.CarouselItems photos={this.giveaway.product.photos}></this.CarouselItems>
                        </div>
                        <div className="col-4">
                            {button}
                            {this.props.loading &&
                                <FontAwesomeIcon icon={faSpinner} spin size="sm" />
                            }
                            <hr></hr>
                            <p>{this.giveaway.product.description}</p>
                            <p><b>{this.giveaway.owner.firstName} {this.giveaway.owner.lastName}</b> <br />
                                <span style={{ fontSize: "14px" }}>On Repriced from {new Date(this.giveaway.owner.createdAt).
                                    toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', })}</span></p>
                            <hr></hr>
                        </div>
                    </div>
                    <Modal show={this.state.showMessageInput} onHide={() => this.setState({ showMessageInput: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Message to {this.giveaway.owner.firstName}</Modal.Title>
                        </Modal.Header>
                        <div className="container mb-2">
                            <div className="col-12 mt-2">
                                <textarea onKeyDown={this.onEnterPress} name="msgText" onChange={this.handleChange} value={this.state.msgText} style={{ resize: 'none' }} className="form-control"></textarea>
                            </div>
                            <div className="col-12 md-2 mt-2 ">
                                <Button onClick={this.handleSendMessage} className="float-right">Send</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
    }

    getGiveawayProfile() {
        this.props.getGiveaway(this.props.match.params.id);
    }

    handleParticipate(e) {
        e.preventDefault();
        this.props.addGiveawayParticipant(this.giveaway.id);
    }

    handleFindWinner(e) {
        e.preventDefault();
        this.props.findGiveawayWinner(this.props.giveaway);
    }

    handleProductDelivered(e) {
        e.preventDefault();
        this.props.productDelivered(this.props.giveaway);
    }

    onEnterPress(event) {
        if (event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            this.handleSendMessage();
        }
    }

    handleSendMessage() {
        if (this.state.msgText === undefined || this.state.msgText === null
            || this.state.msgText === '') {
            return;
        }
        const message = {
            text: this.state.msgText,
            user_id: this.props.authenticatedUser.id,
            conversation_id: undefined,
            created_at: new Date(),
            updated_at: new Date(),
        }
        this.props.sendMessage(message, this.props.giveaway.owner_id);
        this.setState({showMessageInput: false, msgText: ''});
    }

    showMessageDialogBox() {
        this.setState({ showMessageInput: true });
    }
}
function mapStateToProps(state) {
    return {
        loading: state.giveaway.loading,
        giveaway: state.giveaway.giveaway,
        authenticatedUser: state.users.authenticatedUser,
        priorConversation: state.messenger.priorConversation,
    };
}
const mapActionToProps = {
    getGiveaway: giveawayActions.getGiveaway,
    addGiveawayParticipant: giveawayActions.addGiveawayParticipant,
    findGiveawayWinner: giveawayActions.findGiveawayWinner,
    productDelivered: giveawayActions.productDelivered,
    loginForm: userActions.loginForm,
    sendMessage: messengerActions.sendMessage,
};

const connectedGiveawayProfile = connect(mapStateToProps, mapActionToProps)(GiveawayProfile);
export { connectedGiveawayProfile as GiveawayProfile };