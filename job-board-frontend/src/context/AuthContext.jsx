import React, { Children, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:4000";
  const [user, setUser] = useState(null);

  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
