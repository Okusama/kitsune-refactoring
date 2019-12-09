import React, {Component} from "react";
import {Link} from "react-router-dom";
import {IRootState} from "../store";
import {connect} from "react-redux";

interface IHeaderState {
    tournamentNav: boolean,
    championshipNav: boolean,
    raceNav: boolean,
    adminNav: boolean
}

//Redux Wrap
const mapStateToProps = ({user}: IRootState): any => {
    const {isAdmin, isLogin} = user;
    return {isAdmin, isLogin};
};

type ReduxType = ReturnType<typeof mapStateToProps>;

class Header extends Component<ReduxType> {

    state: IHeaderState;

    constructor(props: ReduxType){
        super(props);
        this.state = {
            tournamentNav: false,
            championshipNav: false,
            raceNav: false,
            adminNav: false
        }
    }

    handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>): void => {
        this.setState({
            [event.currentTarget.id]: true
        });
    };

    renderPublicNav = (): React.ReactElement<React.JSXElementConstructor<any>> => {
        return(
            <React.Fragment>
                <li id="tournamentNav" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <Link to="/tournament/list">T<span className={this.state.tournamentNav ? "" : "hidden"}>ournament</span></Link>
                </li>
                <li id="championshipNav" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <Link to="">C<span className={this.state.championshipNav ? "" : "hidden"}>hampionship</span></Link>
                </li>
                <li id="raceNav" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <Link to="">R<span className={this.state.raceNav ? "" : "hidden"}>ace</span></Link>
                </li>
            </React.Fragment>
        );
    };

    renderAdminNav = (): React.ReactElement<React.JSXElementConstructor<any>> => {
        return(
            <li id="adminNav" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <Link to="/admin">A<span className={this.state.adminNav ? "" : "hidden"}>dmin</span></Link>
            </li>
        );
    };

    handleMouseLeave = (event: React.MouseEvent<HTMLLIElement>): void => {
        this.setState({
            [event.currentTarget.id]: false
        });
    };

    render(): React.ReactElement<React.JSXElementConstructor<any>> {

        let loginNav = null;
        let adminNav = null;

        if (this.props.isLogin){
            loginNav = this.renderPublicNav();
        }

        if (this.props.isAdmin){
            adminNav = this.renderAdminNav();
        }

        return(
            <header>
                <nav>
                    <ul className="list-unstyled">
                        <li>
                            <Link to="">
                                <img src={require("../assets/img/logo.png")} alt=""/>
                            </Link>
                        </li>
                        {loginNav}
                        {adminNav}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default connect(mapStateToProps, null)(Header);