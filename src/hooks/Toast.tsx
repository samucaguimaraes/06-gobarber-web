/** Hook para adicionar e remover toast */
import React, { createContext,  useContext, useCallback } from 'react';

interface ToastData{
  addToast(): void;
  removeToast(): void;
}

const Toast = createContext<ToastData>( {} as ToastData);

const ToastProvider: React.FC = ({children}) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  },[]);

  const removeToast = useCallback(()=>{
    console.log('removeToast');
  },[]);

  return <Toast.Provider value={{addToast, removeToast}}> {children} </Toast.Provider>
};

function useToast(): ToastData {
  const context = useContext(Toast);

  if(!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export {ToastProvider, useToast};
