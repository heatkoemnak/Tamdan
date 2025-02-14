import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AppContext);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
