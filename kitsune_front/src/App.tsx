import React from 'react';
//React Router
import {Switch, Route} from "react-router-dom";
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

//Redux Wrap
const mapStateToProps = ({user}: IRootState): any => {
    const {isAdmin, isLogin} = user;
    return {isAdmin, isLogin};
};

type ReduxType = ReturnType<typeof mapStateToProps>;

class App extends React.Component<ReduxType> {

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let header = null;

        if (this.props.isLogin){
            header = <Header/>
        }

        return (
            <div className="App">
                {header}
                <main>
                    <Switch>
                        <Route exact path="/" component={Signin}/>
                        <Route exact path="/signup" component={Signup}/>
                        <ProtectedRoute isLogin={this.props.isLogin} path="/home" component={Home}/>
                    </Switch>
                </main>
            </div>
        );
    }

}

export default connect(mapStateToProps, null)(App);
