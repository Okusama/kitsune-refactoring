import React from "react";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return(
            <header>
                <nav>
                    <ul className="list-unstyled">
                        <li>
                            <Link to="">
                                <img src={require("../assets/img/logo.png")} alt=""/>
                            </Link>
                        </li>
                        <li>
                            <Link to="">T<span className="hidden">ournament</span></Link>
                        </li>
                        <li>
                            <Link to="">C<span className="hidden">hampionship</span></Link>
                        </li>
                        <li>
                            <Link to="">R<span className="hidden">ace</span></Link>
                        </li>
                        <li>
                            <Link to="">A<span className="hidden">dmin</span></Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}