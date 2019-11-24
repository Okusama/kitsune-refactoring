import { RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
    isLogin: boolean
}

export interface PrivateRouteProps extends RouteProps {
    isAdmin: boolean
}