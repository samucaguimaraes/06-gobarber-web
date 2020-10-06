import React from 'react';

import SignIn from './pages/Signin/index';
//import SignUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

/** Provider é um componente que colocaremos em
 * volta dos componentes que terão acesso ao contexto de autenticação
 */
import { AuthProvider } from './hooks/Auth';
import ToastContainer from './components/ToastContainer';
import { ToastProvider } from './hooks/Toast';


const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <ToastContainer />
    <GlobalStyle />
  </>
);
export default App;
