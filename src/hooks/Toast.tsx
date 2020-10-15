/** Hook para adicionar e remover toast */
import React, { createContext,  useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer'

export interface ToastMessage{
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastData{
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const Toast = createContext<ToastData>( {} as ToastData);

const ToastProvider: React.FC = ({children}) => {
  /** Estado para armazenar  */
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages(oldMessages => [...oldMessages, toast]);

  },[]);

  const removeToast = useCallback((id:string)=>{
    /** Filtrar e setar todas as messages com keys diferentes de id */
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
  },[]);

  return (
    <Toast.Provider value={{addToast, removeToast}}>
      {children}
      <ToastContainer messages={messages}/>
    </Toast.Provider>);
};

function useToast(): ToastData {
  const context = useContext(Toast);

  if(!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export {ToastProvider, useToast};
