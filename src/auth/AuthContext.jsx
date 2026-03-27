import {createContext} from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  loggedUser: null,
  login: async (token, user) => {},
  logout: () => {},
});
