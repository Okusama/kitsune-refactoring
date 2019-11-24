import React from 'react';
//React Router
import {Switch, Route, withRouter} from "react-router-dom";
import {ProtectedRoute} from './components/customRoutes';

//Redux
import {connect} from "react-redux";
import { IUserState } from './redux/reducers/userReducer';
import {runActionUserAdmin, runActionUserLogin} from "./redux/action";

// Styles
import "bootstrap/dist/css/bootstrap.min.css"

// Pages
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/public/Home";

//Redux Wrap
interface IAppState {
    state: IUserState
}

const mapStateToProps = (state: IAppState) => state;
const mapDispatchTiProps = {
    runActionUserAdmin,
    runActionUserLogin
};

type IProps = IAppState & typeof mapDispatchTiProps;

class App extends React.Component<IProps, {}> {

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

const NewAppWithRedux = withRouter(connect(mapStateToProps, mapDispatchTiProps)(App));

export default NewAppWithRedux;
