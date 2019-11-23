import React from 'react';
import {Switch, Route} from "react-router-dom";

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
                        <Route path="/signup" component={Signup}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </main>
            </div>
        );
    }

}
