import React from "react";
import {Col} from "react-bootstrap";
import ListItem from "../../components/ListItem";

export default class TournamentsList extends React.Component {

    render(): React.ReactElement<React.JSXElementConstructor<any>>{
        return(
            <Col lg={12}>
                <ul className="list-unstyled">
                    <ListItem key={1}/>
                </ul>
            </Col>
        );
    }

}