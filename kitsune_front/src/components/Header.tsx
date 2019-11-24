import React from "react";
import {Col} from "react-bootstrap";

export default class Header extends React.Component {
    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return(
            <header>
                <Col lg={2}>
                    <nav>
                        <ul className="list-unstyled">
                            <li>
                                <img src={require("../assets/img/logo.png")} alt=""/>
                            </li>
                        </ul>
                    </nav>
                </Col>
            </header>
        );
    }
}