// RequireAuth.js
import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from 'react-router-dom';


const RequireAuth = (WrappedComponent) => {
  const navigate = useNavigation()
  const Component = ({ isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      // Redirect to the login page or a specific route for unauthorized access
      return navigate.navigate("/login");
    }
    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.loadUser.isAuthenticated,
  });

  return connect(mapStateToProps)(Component);
};

export default RequireAuth;
