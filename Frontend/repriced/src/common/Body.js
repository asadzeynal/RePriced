import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../home/Home'
import { SignupForm } from '../signup'
import { LoginForm } from '../login'
import Loader from './Loader'
import { GiveawayPage } from '../giveaway'
import { Giveaways } from '../giveaways'
import { GiveawayProfile } from '../giveawayProfile'
import { Payment } from '../yandexMoney'
import { ContinueSignUpForm } from '../continueSignUp';
import { EmailConfirmation } from '../emailConfirmation';
import { UserProfile } from '../userDashboard';
import { Messenger } from '../messenger';
import NavigationBar from './NavigationBar.js'
import { SearchResult } from './SearchResult';

class Body extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Loader />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignupForm} />
          <Route path='/continuesignup' component={ContinueSignUpForm} />
          <Route path='/giveaway' component={GiveawayPage} />
          <Route path='/giveawaysSearch' component={Giveaways} />
          <Route path='/giveaways/:id' component={GiveawayProfile} />
          <Route path='/confirmation/:tokenHash?' component={EmailConfirmation} />
          <Route path='/yandexPayment' component={Payment} />
          <Route path='/userProfile' component={UserProfile} />
          <Route path='/messenger' component={Messenger} />
          <Route path='/searchResult' component={SearchResult} />
        </Switch>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.setCurrentUser
  }
}
export default connect(mapStateToProps, null)(Body);
