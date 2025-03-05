import { Navigate, Outlet } from "react-router-dom";

function ProtectRoutes() {
    const isAuth = localStorage.getItem("token");
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectRoutes;
