import React from 'react';
import { connect } from 'react-redux';

import { giveawayActions } from '../_actions';
import { GiveawaysList } from './GiveawaysList';
import {FilterComponent}  from '../common/FilterComponent'

class Giveaways extends React.Component {
    
    componentWillMount() {
        this.props.getAll();
    }

    getCategories() {
        if (typeof this.props.giveawaysList === 'undefined') return null;
        let categories = this.props.giveawaysList.map(item => item.product.category)
        //get distinct categories
        categories = [...new Set(categories)];
        const categoryOptions = categories.map(item => {
          return { value: item, label: item }
        })
        return categoryOptions;
    }
    
    render() {
        this.categories = this.getCategories();
        this.items = [];
        if (this.props.loading || (typeof (this.props.loading) == 'undefined')) {
            return(
                <div> 
                <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>)
        } else {
            return (
                <div className="container">
                    <h1>Giveaways List</h1>
                    <div className="row"> 
                        <div className ="col-xs-3 col-sm-3 col-lg-3 col-md-3">
                            <FilterComponent items={this.props.giveawaysList} categories={this.categories} />
                        </div>
                        <div className="col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5 col-sm-6 col-sm-offset-5 col-xs-6 col-xs-offset-5">
                            <GiveawaysList items={this.props.giveawaysList} filteredItems={this.props.filteredList} loading={this.props.loading} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { 
        giveawaysList: state.giveaway.giveawaysList,
        loading: state.giveaway.loading,
        filteredList: state.giveaway.filteredList,
        filtered: state.giveaway.filtered,
    };
}

const mapActionToProps = {
    getAll: giveawayActions.getAll,
};

const connectedGiveaways = connect(mapStateToProps, mapActionToProps)(Giveaways);
export { connectedGiveaways as Giveaways };