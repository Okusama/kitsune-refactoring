import React from "react";
import IFormComponents from "../../interfaces/IFormComponents";
import { signup } from "../../utils/api";
import {Redirect} from "react-router-dom";
import {Button, Form, Col} from "react-bootstrap";

interface ISignupState {
    email: string,
    password: string,
    cpassword: string,
    pseudo: string,
    redirect: boolean
}

export default class Signup extends React.Component implements IFormComponents{

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
    };

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

    };

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let redirect = this.state.redirect;

        if (redirect) {
            return(<Redirect to="/"/>);
        }

        return(
            <Col lg={12} className="signUp text-center">
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control id="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control id="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="cpassword">Confirm Password:</Form.Label>
                            <Form.Control id="cpassword" value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="pseudo">Pseudo:</Form.Label>
                            <Form.Control id="pseudo" value={this.state.pseudo} onChange={this.handleChange} type="text"/>
                        </Form.Group>
                        <Button className="button-form" type="submit">Submit</Button>
                    </Form>
                </div>
            </Col>
        );
    }

}