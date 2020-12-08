/*
    Metas para o componente
      1- Acessar o contexto de autenticação
      2- Validar o acesso a parte privada da aplicação
      3- IMportar o RouteProps do react-router-dom, com isso já teremos uma interface
      pronta para rotas
*/
import React from 'react';
import { useAuth } from '../hooks/Auth';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom'

interface RouteProps extends ReactDOMRouteProps{
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ( { isPrivate=false , component: Component, ...rest}) => {

  const { user } =  useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={ ({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{
            pathname: isPrivate ? '/' : '/Dashboard',
            state: {from: location}
          }}/>
        )
      }}
    />
  );
};

export default Route;

