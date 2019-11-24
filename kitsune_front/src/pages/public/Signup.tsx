import React from "react";
import IFormComponents from "../../interfaces/IFormComponents";
import { signup } from "../../utils/api";
import { Redirect } from "react-router-dom";

interface ISignupState {
    email: string,
    password: string,
    cpassword: string,
    pseudo: string,
    redirect: boolean
}

export default class Signup extends React.Component<ISignupState> implements IFormComponents{

    state: ISignupState;

    constructor(props: any){
        super(props);
        this.state = {
            cpassword: "",
            email: "",
            password: "",
            pseudo: "",
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
        if(this.state.pseudo.length === 0) return;
        if(this.state.password !== this.state.cpassword) return;

        let sendData = {
            email: this.state.email,
            password: this.state.password,
            pseudo: this.state.pseudo
        };

        /**
         * Send to server
         */
        //TODO: Redirect with message
        signup(sendData)
            .then(res => {
            this.setState({
                redirect: true
            });
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let redirect = this.state.redirect;

        if (redirect) {
            return(<Redirect to="/"/>);
        }

        return(
            <div className="signUp">
                <h2>Sign Up</h2>
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
                    <div>
                        <label htmlFor="cpassword">
                            Confirm Password:
                        </label>
                        <input id="cpassword" value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                    </div>
                    <div>
                        <label htmlFor="pseudo">
                            Pseudo:
                        </label>
                        <input id="pseudo" value={this.state.pseudo} onChange={this.handleChange} type="text"/>
                    </div>
                    <input className="button-form" type="submit"/>
                </form>
            </div>
        );
    }

}