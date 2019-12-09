import React from "react";
import {Button, Modal} from "react-bootstrap";

export default class CreateModalForm extends React.Component {

    constructor(props: any){
        super(props);
    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Title
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Create</h4>
                    <p>Form</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Save</Button>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}