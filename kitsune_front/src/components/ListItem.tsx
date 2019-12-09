import React from "react";
import {Button} from "react-bootstrap";

interface IListItemState {
    key: number
}

interface IListItemProps {
    key: number
}

export default class ListItem extends React.Component<IListItemProps> {

    state: IListItemState;

    constructor(props: IListItemProps){
        super(props);
        this.state = {
            key: this.props.key
        }
    }

    render(): React.ReactElement<React.JSXElementConstructor<any>> {
        return(
            <li key={this.state.key}>
                <div>
                    <p>Title</p>
                    <p>Date: 11/12/20</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate deserunt dolores eos illo magnam neque officiis reprehenderit, repudiandae! Accusantium asperiores culpa distinctio molestias nostrum nulla optio quasi saepe sunt totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus doloremque id tempora. Ad atque autem dolor earum expedita harum officia sequi! Amet blanditiis error ex nulla quibusdam quod quos voluptates.</p>
                    <Button>Detail</Button>
                </div>
            </li>
        );
    }

}