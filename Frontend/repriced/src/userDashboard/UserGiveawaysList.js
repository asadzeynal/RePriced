import React from 'react';

class UserGiveawaysList extends React.Component {
    render() {
        if (typeof this.props.items !== 'undefined' && (this.props.items.length)) {
            this.listItems = this.props.items.map((giveaway) => {
                return <li key = { giveaway.id }> <a href = {'/giveaways/' + giveaway.id} > { giveaway.product.title } </a></li>;
            });
            return (
                <div className="container">
                    <div className="row d-flex justify-content-center" style={{ paddingTop: '40px' }}>
                        <div className="col-md-5 col-md-offset-3">
                            <h3>Giveaways you have created</h3>   
                            <ul>{this.listItems}</ul>
                        </div>
                    </div>
                </div>
                );
        } else {
            return null;
        }
        
    }
}

export { UserGiveawaysList };