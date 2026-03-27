import {createContext} from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  loggeduser: null,
  login: async (token, user) => {},
  logout: () => {},
});