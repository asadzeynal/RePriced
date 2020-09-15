import React from 'react';

class GiveawaysList extends React.Component {

    render() {
        if (this.props.loading || (typeof (this.props.loading) == 'undefined') || 
        (typeof this.props.items == 'undefined' && typeof this.props.filteredItems == 'undefined')) {
            return(
            <div> 
                <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>)
        } else {
            if (typeof this.props.filteredItems !== 'undefined') {
                if (this.props.filteredItems.length) {
                    this.listItems = this.props.filteredItems.map((giveaway) => {
                        return <li key = { giveaway.id }> <a href = {'/giveaways/' + giveaway.id} > { giveaway.product.title } </a></li>;
                    });
                    return (
                        <ul>{this.listItems}</ul>
                    );
                } else {
                    return (
                        <div> Nothing matches</div>
                    )
                }
                    
            } else {
                this.listItems = this.props.items.map((giveaway) => {
                    return <li key = { giveaway.id }> <a href = {'/giveaways/' + giveaway.id} > { giveaway.product.title } </a></li>;
                });
                return (
                    <ul>{this.listItems}</ul>
                );
            }
        }
    }
}

export { GiveawaysList };