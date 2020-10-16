import React from 'react';
import { Switch, Route  } from 'react-router-dom';

import Signin from '../pages/Signin'
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
     <Route path="/" exact component={Signin}></Route>
     <Route path="/" component={SignUp}></Route>
  </Switch>
);

export default Routes;
