import React from "react";
import {Col} from "react-bootstrap";
import FilterBox from "../../components/FilterBox";
import CreateButton from "../../components/CreateButton";
import CreateModalForm from "../../components/CreateModalForm";

export default class AdminPanel extends React.Component {

    render(): React.ReactElement<React.JSXElementConstructor<any>>{
        return(
            <React.Fragment>
                <Col lg={12} className="adminPanel">
                    <div>
                        <div>
                            <p>Tournaments</p>
                            <div>
                                <CreateButton/>
                                <FilterBox/>
                            </div>
                        </div>
                        <ul>
                            <li>No tournament</li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <p>Championships</p>
                            <div>
                                <CreateButton/>
                                <FilterBox/>
                            </div>
                        </div>
                        <ul>
                            <li>No Championship</li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <p>Race</p>
                            <div>
                                <CreateButton/>
                                <FilterBox/>
                            </div>
                        </div>
                        <ul>
                            <li>No Race</li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <p>Players</p>
                            <FilterBox/>
                        </div>
                        <ul>
                            <li>No players</li>
                        </ul>
                    </div>
                </Col>
                <CreateModalForm/>
            </React.Fragment>
        );
    }

}