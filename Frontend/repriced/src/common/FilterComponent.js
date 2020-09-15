import React, { Component } from 'react'
import Select from 'react-select';
import { connect } from 'react-redux';

import { giveawayActions } from '../_actions';


class FilterComponent extends Component {
  state = {
    selectedCategories: null,
    min_price: '',
    max_price: '',
  };

  handleChange = selectedCategories => {
    this.setState({ selectedCategories });
  };
  
  handleChangePrice = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedCategories, min_price, max_price } = this.state;
    this.props.filterList(selectedCategories, min_price, max_price, this.props.items, this.props.giveawaysList);
  }

  render() {
    const { selectedCategories, min_price, max_price } = this.state;
    this.cats = this.props.categories;
    return (
      <div>
        <h3> Filter </h3>
        Categories
        <Select
          value={selectedCategories}
          onChange={this.handleChange}
          options={this.cats}
          isMulti={true}
        />  
        <div className="container">
                <div className="row d-flex justify-content-center" style={{ paddingTop: '5%' }}>
                    <div className="col-md-10" >
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (  !min_price ? ' has-error' : '')}>
                                <input type="text" placeholder="min_price" className="form-control" name="min_price" value={min_price} onChange={this.handleChangePrice} />
                            </div>
                            <div className={'form-group' + (  !max_price ? ' has-error' : '')}>
                                <input type="number" placeholder="max_price" className="form-control" name="max_price" value={max_price} onChange={this.handleChangePrice} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Filter</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>    
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
      giveawaysList: state.giveaway.giveawaysList,
      loading: state.giveaway.loading
  };
}

const mapActionToProps = {
  filterList: giveawayActions.filterList,
};

const connectedFilterComponent = connect(mapStateToProps, mapActionToProps)(FilterComponent);
export { connectedFilterComponent as FilterComponent };
