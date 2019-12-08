import {FormEvent} from "react";

export default interface IFormComponents {
    handleChange(event: FormEvent<HTMLInputElement>):void;
    handleSubmit(event: FormEvent<HTMLFormElement>):void;
}