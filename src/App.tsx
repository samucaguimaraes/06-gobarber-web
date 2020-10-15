import React from 'react';
import SignIn from './pages/Signin/index';
//import SignUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';


const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);
export default App;
