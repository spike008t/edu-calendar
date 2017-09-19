
import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';

import Person from './Person';

const KEY_PREFIX = 'person';

class PersonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [`${KEY_PREFIX}0`],
            idx: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.appendInput = this.appendInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    appendInput() {
        const newInput = `${KEY_PREFIX}${this.state.idx}`;
        this.setState({
            inputs: this.state.inputs.concat(newInput),
            idx: this.state.idx + 1
        });
    }

    handleChange(person) {
        console.log(person);
        this.props.onChange({
            id: person.id,
            data: person.data
        });    
    }

    handleDelete(person) {
        this.setState({
            inputs: this.state.inputs.filter((item) => {
                return item !== person.id;
            })
        });
        this.props.onDelete({
            id: person.id,
            data: person.data,
        });
    }

    render() {
        return (
            <div className="PersonList">
                <Row className="PersonList--list">
                    <Col>
                        {this.state.inputs.map((item, idx) => {
                            return (
                                <Person
                                    key={idx}
                                    id={item} 
                                    idx={idx} 
                                    onChange={this.handleChange} 
                                    onDelete={this.handleDelete}
                                    canDelete={idx !== 0}
                                />
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.appendInput}>Ajouter un eleve</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

PersonList.defaultProps = {
    onChange: function() {},
    onDelete: function() {},
};

export default PersonList;
