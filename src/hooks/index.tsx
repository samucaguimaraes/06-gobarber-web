/** Abstração de todos os providers para evitar aumentar código no app.tsx */
import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';

const AppProvider: React.FC = ({children}) => {
 return(
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
  );
}

export default AppProvider;
