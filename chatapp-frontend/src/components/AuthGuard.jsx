import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authUserSelector } from "../redux/selectors/selectors";

const AuthGuard = ({ children }) => {
  const { loginSuccess } = useSelector(authUserSelector);

  if (!loginSuccess) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
