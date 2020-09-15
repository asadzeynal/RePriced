import React, {Component} from "react";
import { connect } from 'react-redux';
import { giveawayActions } from '../../_actions/giveaway.actions';
import Giveaway from "./giveaway/giveaway.component";



class GiveawaysList extends Component{
    componentDidMount() {
        this.props.getAll();
    }


    giveawaysList(){
        if (this.props.giveawaysList!==undefined){
            return this.props.giveawaysList.map(currentGiveaway => {
                    return <Giveaway giveaway={currentGiveaway} key={currentGiveaway.id} />;
                }
            )
        }

    }

    render() {
        return <div className="col-md-10 d-none d-md-block bg-light">
            <h3>Giveaways</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Cost By Participant</th>
                    <th>Expiration Date</th>
                    <th>Status</th>
                    <th>Participants Limit</th>
                    <th>Created</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {/*fetch giveaways here*/}
                {
                    this.giveawaysList()
                    //console.log(this.props.giveawaysList)
                }
                </tbody>
            </table>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        giveawaysList: state.giveaway.giveawaysList,
        loading: state.giveaway.loading
    };
}

const mapActionToProps = {
    getAll: giveawayActions.getAll,
};

const connectedGiveaways = connect(mapStateToProps, mapActionToProps)(GiveawaysList);

export default connectedGiveaways;

