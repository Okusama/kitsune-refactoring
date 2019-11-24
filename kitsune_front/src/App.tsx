import React from 'react';
import {Switch, Route} from "react-router-dom";
import {ProtectedRoute} from './components/customRoutes';

// Styles
import "bootstrap/dist/css/bootstrap.min.css"

// Pages
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/public/Home";


export default class App extends React.Component {

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
