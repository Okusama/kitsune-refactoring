import React from "react";
import IFormComponents from "../../interfaces/components/IFormComponents";
import ISigninState from "../../interfaces/states/ISigninState";
import {Link, Redirect} from "react-router-dom";
import {signin} from "../../utils/api";

export default class Signin extends React.Component<ISigninState> implements IFormComponents{

    state: ISigninState;
    
    constructor(props: any){
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
           [event.currentTarget.id]: event.currentTarget.value
        });
    }

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
                    console.log("Connected");
                } else {
                    console.log("User Not Exist");
                }
            });

    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let redirect = this.state.redirect;

        if (redirect) {
            return(<Redirect to="/home"/>);
        }

        return(
            <div className="signIn">
                <h1>Sign In</h1>
                <Link to="/signup">Sign Up</Link>
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