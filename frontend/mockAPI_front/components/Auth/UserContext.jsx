import { authContext } from "./AuthContext.js";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import config from "../../src/config.js";
import { useLocation } from "react-router-dom";

const UserContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const location = useLocation();

  const getUser = useCallback(async (force = false) => {
    if(user !== null && !force){
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/api/get-user/`,{
        method:'GET',
        headers: {'Authorization':`Bearer ${token}`},
      });
      if(response.ok){
        const { dataUser } = await response.json();
        setUser(dataUser);
      }
      else{
        setUser({ invalid: true });
      }
    } catch (error) {
      console.error(error);
    }
  },[token, user])

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    getUser(true);
  }, [location]);

  return (
    <authContext.Provider value={{ user, logout, token }}>
      {children}
    </authContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
