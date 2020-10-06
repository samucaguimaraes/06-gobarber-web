//** Craindo um variável de context para gerenciar autenticação */
import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credencials: SignInCredentials): Promise<void>;
  signOut(): void;
}
/** Como o createContext não pode receber vazio, hack as AuthContext */
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  /** Salvando o token e usuario em um estado e retornando caso exista */
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  /*
  * 1- Buscando o token e usuario do data reponse
  * 2- Armazena o token e usuario no localStorage
  * 3- Salvar os dados em um useState para facilitar o acesso pelo front-end
  */
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, [])

  /** Função SignOut  */
  const signOut = useCallback( () => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState)
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Criar uma função para omitir o useContext da tela*/
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}


