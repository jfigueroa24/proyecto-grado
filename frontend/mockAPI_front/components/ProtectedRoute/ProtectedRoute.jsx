import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Auth/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate()
  const { user } = useContext(authContext);

  useEffect(() => {
    if(user?.invalid){
      navigate('/login');
    }
  }, [user]);

  return user ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
