import React from "react";
import {Button} from "react-bootstrap";

export default class FilterBox extends React.Component {

    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return(
            <div>
                <Button>Open</Button>
                <Button>Closed</Button>
                <Button>Finish</Button>
            </div>
        );
    }

}