import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/Auth";

function ProtectedRoute({ children }) {

  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;