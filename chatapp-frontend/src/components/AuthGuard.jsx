import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authUserSelector } from "../redux/selectors/selectors";

const AuthGuard = ({ children }) => {
  const { loginSuccess } = useSelector(authUserSelector);
  const location = useLocation();

  if (!loginSuccess) {
    if (
      location.pathname === "/signup" ||
      location.pathname === "/forgot-password"
    ) {
      return <Navigate to={location.pathname} />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
