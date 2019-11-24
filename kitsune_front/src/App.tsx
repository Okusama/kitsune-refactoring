import React from 'react';
//React Router
import {Switch, Route, withRouter} from "react-router-dom";
import {ProtectedRoute} from './components/customRoutes';

//Redux
import {IRootState} from "./store";
import {Dispatch} from "redux";
import {UserActions} from "./store/user/types";
import * as actions from "./store/user/actions";
import {connect} from "react-redux";

// Styles
import "bootstrap/dist/css/bootstrap.min.css"

// Api
import {authentication} from "./utils/api";

// Pages
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/public/Home";



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

class App extends React.Component<ReduxType> {

    constructor(props: ReduxType){
        super(props);
        const {id, avatar, isAdmin, isLogin, token, runActionUserAdmin, runActionUserLogin} = this.props
    }

    isLogin = () => {

        let sendData = {
            token: window.localStorage.getItem("token")
        };

        authentication({sendData})
            .then(res => {
                if (res.isLogin){
                    if (res.isAdmin){
                        this.props.runActionUserAdmin(res.id, res.avatar, res.token);
                    } else {
                        this.props.runActionUserLogin(res.id, res.avatar, res.token)
                    }
                }
            })

    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return (
            <div className="App">
                <main>
                    <Switch>
                        <Route exact path="/" component={Signin}/>
                        <Route exact path="/signup" component={Signup}/>
                        <ProtectedRoute isLogin={true} path="/home" component={Home}/>
                    </Switch>
                </main>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
