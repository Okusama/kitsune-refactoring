import React from "react";
import { Route, Redirect } from "react-router-dom";
import {PrivateRouteProps, ProtectedRouteProps} from "../interfaces/components/ICustomRouteProps";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    if (!props.isLogin) {
        const renderComponent = () => <Redirect to="/" />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
};

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
    if (!props.isAdmin) {
        const renderComponent = () => <Redirect to="/" />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
};