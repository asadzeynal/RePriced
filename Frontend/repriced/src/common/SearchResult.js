import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    ReactiveList,
    ResultList,
    ReactiveBase,
    DataSearch,
    MultiList,
    DynamicRangeSlider
} from '@appbaseio/reactivesearch';
import {userActions} from '../_actions';

class SearchResult extends Component {

    render() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let param = params.get('AppSearch');
        if (param === '""') {
            console.log(param);
            param = null;
        }
        return (
            <div className="container">
                <ReactiveBase
                    app="giveaways"
                    url="http://localhost:9200"
                >
                    <DataSearch
                        componentId="AppSearch"
                        // URLParams
                        dataField={["product.title",]}
                        style={{visibility: 'hidden'}}
                        // customQuery={(() => {
                        //     return {
                        //         query: {
                        //             match: {
                        //                 status: "incomplete",
                        //             }
                        //         }
                        //     }
                        // })}
                        value={param}
                    />
                    <div className="row">
                        <div className="col-6">
                            <MultiList componentId="CategoryFilter" title="Categories"
                                       showCheckbox={true} showSearch={false} dataField='product.category.keyword'/>
                        </div>
                        <div className="col-6">
                            <DynamicRangeSlider
                                componentId="CostSlider"
                                dataField="cost_by_participant"
                                title="Participation Fee"
                                rangeLabels={(min, max) => ({
                                    start: min + ' $',
                                    end: max + ' $',
                                })}
                                stepValue={1}
                                showHistogram={false}
                                showFilter={true}
                                interval={2}
                                loader="Loading ..."
                            />
                        </div>
                    </div>
                    <ReactiveList
                        componentId="AppSearchResult"
                        dataField="name"
                        from={0}
                        size={15}
                        renderItem={(item) => (
                            <ReactiveList.ResultListWrapper>
                                <ResultList key={item.id}>
                                    <ResultList.Image src={item.product.photos[0]}/>
                                    <ResultList.Content>
                                        <ResultList.Title>{item.product.title}</ResultList.Title>
                                        <ResultList.Description>
                                            <div>
                                                <p>{item.product.description}</p>
                                                <span key="costPerUser" className="tag">
                                                    Participation Fee: {item.cost_by_participant}$
                                            </span>
                                                <span className="tag">{item.cuisine}</span>
                                                <div>Category : {item.product.category}</div>
                                            </div>
                                        </ResultList.Description>
                                    </ResultList.Content>
                                </ResultList>
                            </ReactiveList.ResultListWrapper>
                        )}
                        pagination={true}
                        react={{
                            and: [
                                "AppSearch",
                                "CategoryFilter",
                                "CostSlider",
                            ]
                        }}
                        renderError={error => (
                            <div>
                                Something went wrong with ResultList!
                                <br/>
                                Error details
                                <br/>
                                {error}
                            </div>
                        )}
                    />
                </ReactiveBase>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {authenticatedUser, loading} = state.users;
    const {user} = state.authentication;
    return {authenticatedUser, loading, user};
}

const mapActionToProps = {
    loginForm: userActions.loginForm,
}

const connectedSearchResult = connect(mapStateToProps, mapActionToProps)(SearchResult);
export {connectedSearchResult as SearchResult};
