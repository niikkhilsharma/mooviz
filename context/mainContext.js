import React from "react";

export const initialState = { user: null, Authenticated: false };

export const mainReducer = (prevState, action) => {
  // console.log(action);

  switch (action.type) {
    case "SIGN_IN":
      return {
        ...prevState,
        data: action.data,
        Authenticated: true,
      };
    case "SIGN_OUT":
      return {
        // ...prevState,
        data: null,
        Authenticated: false,
      };
    case "UPDATE_USER":
      return {
        ...prevState,
        data: { ...prevState.user, ...action.data },
      };
  }
};

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authData, authDispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ authData, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
