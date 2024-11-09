import { authContext } from "./AuthContext.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import config from "../../src/config.js";

const UserContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  

  const getUser = async () => {
    if(user !== null){
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
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    getUser();
  }, []);

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
