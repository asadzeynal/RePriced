import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { giveaway } from './giveaway.reducer'; 
import { tempUser } from './tempUser.reducer';
import { messenger } from './messenger.reducer';
// import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  giveaway,
  tempUser,
  messenger
//   alert
});

export default rootReducer;