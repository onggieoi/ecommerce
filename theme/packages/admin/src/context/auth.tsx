import React from 'react';
import axiosRequest from '../services/axiosRequest';

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  const token = localStorage.getItem('token');
  // JWT decode & check token validity & expiration.
  if (token) {
    axiosRequest.setAuthentication(token);
    return true;
  }

  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());

  function authenticate(token: string, cb: Function) {
    makeAuthenticated(true);
    axiosRequest.setAuthentication(token);
    localStorage.setItem('token', token);
    setTimeout(cb, 100); // fake async
  }

  function signout(cb) {
    makeAuthenticated(false);
    localStorage.removeItem('token');
    setTimeout(cb, 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
