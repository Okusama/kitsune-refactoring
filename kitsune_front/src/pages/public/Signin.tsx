import React from "react";
import IFormComponents from "../../interfaces/IFormComponents";
// Router
import {Link, Redirect} from "react-router-dom";
// Api
import {signin} from "../../utils/api";
// Redux
import {connect} from "react-redux";
import {IRootState} from "../../store";
import { Dispatch } from "redux";
import { UserActions } from "../../store/user/types";
import * as actions from "../../store/user/actions";

interface ISigninState {
    email: string,
    password: string,
    redirectAuth: boolean,
    errorMsg: string
}

//Redux Wrap
const mapStateToProps = ({user}: IRootState) => {
    const {id, avatar, isAdmin, isLogin, token} = user;
    return {id, avatar, isAdmin, isLogin, token};
};

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        runActionUserAdmin: (id: string, avatar: string, token: string) => dispatch(actions.runActionUserAdmin(id, avatar, token)),
        runActionUserLogin: (id: string, avatar: string, token: string) => dispatch(actions.runActionUserLogin(id, avatar, token))
    }
};

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class Signin extends React.Component<ReduxType> implements IFormComponents{

    state: ISigninState;
    
    constructor(props: ReduxType){
        super(props);
        const {id, avatar, isAdmin, isLogin, token, runActionUserAdmin, runActionUserLogin} = this.props;
        this.state = {
            email: "",
            password: "",
            redirectAuth: false,
            errorMsg: ""
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
           [event.currentTarget.id]: event.currentTarget.value
        });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {

        event.preventDefault();

        if(this.state.email.length === 0) return;
        if(this.state.password.length === 0) return;

        let sendData = {
            email: this.state.email,
            password: this.state.password
        };

        signin(sendData)
            .then(res => {
                if (res.isLogin){

                    window.localStorage.setItem("token", res.token);

                    if (res.isAdmin) {
                        this.props.runActionUserAdmin(res.id, res.avatar, res.token);
                    } else {
                        this.props.runActionUserLogin(res.id, res.avatar, res.token);
                    }

                    this.setState({
                        redirectAuth: true
                    });

                } else {

                    this.setState({
                        errorMsg: res.res
                    });

                }
            });

    };

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let redirect = this.state.redirectAuth;
        let errorMsg = null;

        if (redirect) {
            return(<Redirect to="/home"/>);
        }

        if (this.state.errorMsg.length > 0){
            errorMsg = this.state.errorMsg
        }

        return(
            <div className="signIn">
                <h1>Sign In</h1>
                <Link to="/signup">Sign Up</Link>
                <div className="errorBox">
                    {errorMsg}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input id="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input id="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                    </div>
                    <input className="button-form" type="submit"/>
                </form>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatcherToProps)(Signin);