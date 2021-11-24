import React, { useReducer } from 'react';

import axiosRequest from 'services/axiosRequest';
import { AuthContext } from './auth.context';

const isBrowser = typeof window !== 'undefined';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SIGNUP':
      return {
        ...state,
        currentForm: 'signUp',
      };
    case 'FORGOTPASS':
      return {
        ...state,
        currentForm: 'forgotPass',
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  let isAuthenticated = false;
  if (isBrowser) {
    const token = localStorage.getItem('access_token');

    if (token) {
      isAuthenticated = true;
      axiosRequest.setAuthentication(token);
    }
  }

  const [authState, authDispatch] = useReducer(reducer, {
    isAuthenticated,
    currentForm: 'signIn',
  });

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
