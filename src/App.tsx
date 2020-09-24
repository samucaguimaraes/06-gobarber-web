import React from 'react';

import SignIn from './pages/Signin/index';
//import SignUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
     <SignIn />
         {/*<SignUp /> */}
    <GlobalStyle />
  </>
);
export default App;
