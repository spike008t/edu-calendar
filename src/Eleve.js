
import React, { Component } from 'react';
import { 
    Form, 
    FormGroup, 
    FormRow,
    Label, 
    Input, 
    Row, 
    Col, 
    Button 
} from 'reactstrap';

export default class Eleve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            date: null,
            hash: null,
        };
        this.notifyChange = this.notifyChange.bind(this);
    }

    handleNameChange(e) {
        if (this.state.name === e.target.value) {
            return ;
        }
        this.setState({
            name: e.target.value,
            hash: this.state.date + e.target.value,
        }, this.notifyChange);
    }

    handleDateChange(e) {
        if (this.state.date === e.target.value) {
            return ;
        }
        this.setState({
            date: e.target.value,
            hash: e.target.value + this.state.name,
        }, this.notifyChange);
    }

    notifyChange() {
        if (this.state.name && this.state.date) {
            this.props.onChange({
                id: this.props.id,
                data: this.state,
            });
        }
    }

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <Label for={this.props.id + '-name'} hidden>Prénom</Label>
                    <Input onBlur={this.handleNameChange.bind(this)} type='text' name={this.props.id + '-name'} placeholder='Prénom' />
                </FormGroup>
                <FormGroup>
                    <Label for={this.props.id + '-date'} hidden>Date</Label>
                    <Input onBlur={this.handleDateChange.bind(this)} type='date' name={this.props.id + '-date'} placeholder='Date de naissance' />
                </FormGroup>
                    {/* <Button>X</Button> */}
            </Form>
        );
    }   
}