import React from "react";
import { Redirect } from "react-router-dom";
import { UserActions } from "../../store/user/types";
import * as actions from "../../store/user/actions";
import { Dispatch } from "redux";
import {connect} from "react-redux";

interface ILogoutState {
    redirect: boolean
}

//Redux Wrap
const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        runActionUserLogout: () => dispatch(actions.runActionUserLogout()),
    }
};

type ReduxType = ReturnType<typeof mapDispatcherToProps>;

class Logout extends React.Component<ReduxType> {

    state: ILogoutState;

    constructor(props: ReduxType){
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount(): void {

        window.localStorage.setItem("token", "");
        this.props.runActionUserLogout();
        window.setTimeout(() => {
            this.setState({
                redirect: true
            });
        },3000);

    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        if (this.state.redirect){
            return(<Redirect to="/"/>);
        }

        return(
            <div className="logoutPage">
                <p>Disconnected</p>
            </div>
        );
    }
}

export default connect(null, mapDispatcherToProps)(Logout);