import React, {Component, JSXElementConstructor, ReactElement} from "react";
//React Router
import {Switch, Route, Link} from "react-router-dom";
import {ProtectedRoute} from './components/customRoutes';

//Redux
import {IRootState} from "./store";
import { connect } from 'react-redux';

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/css/main.css"

// Component
import Header from './components/Header';

// Pages
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/public/Home";
import Logout from "./pages/public/Logout";


//Redux Wrap
const mapStateToProps = ({user}: IRootState): any => {
    const {isAdmin, isLogin} = user;
    return {isAdmin, isLogin};
};

type ReduxType = ReturnType<typeof mapStateToProps>;

class App extends Component<ReduxType> {


    render(): ReactElement<JSXElementConstructor<any>> {
        return (
            <div className="App">
                <Header/>
                <main>
                    <div className="topAside">
                        <div>
                            {
                                this.props.isLogin ?
                                (
                                    <React.Fragment>
                                        <Link to="/logout">Logout</Link>
                                    </React.Fragment>
                                ) :
                                (
                                    <React.Fragment>
                                        <Link to="/signup">Sign Up</Link>
                                        <Link to="/">Sign In</Link>
                                    </React.Fragment>
                                )
                            }
                            <img src={require("./assets/img/default_avatar.png")} alt=""/>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Signin}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/logout" component={Logout}/>
                        <ProtectedRoute isLogin={this.props.isLogin} path="/home" component={Home}/>
                    </Switch>
                </main>
            </div>
        );
    }

}

export default connect(mapStateToProps, null)(App);
