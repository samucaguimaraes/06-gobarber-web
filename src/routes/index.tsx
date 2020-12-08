import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Signin from '../pages/Signin'
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
     <Route path="/" exact component={Signin}></Route>
     <Route path="/signup" component={SignUp}></Route>

     <Route path='/Dashboard' component={Dashboard} isPrivate ></Route>
  </Switch>
);

export default Routes;
