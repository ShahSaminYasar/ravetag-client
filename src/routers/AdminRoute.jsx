import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const check = JSON.parse(sessionStorage.getItem("admin_token"));

  if (check === import.meta.env.VITE_ADMIN_TOKEN) {
    return children;
  } else {
    return <Navigate to="/admin-login" />;
  }
};
export default AdminRoute;
