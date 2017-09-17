
import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';

import Eleve from './Eleve';

class EleveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: ['eleve0'],
            idx: 1,
        };

        this.handleEleveChange = this.handleEleveChange.bind(this);
        this.appendEleveInput = this.appendEleveInput.bind(this);
        this.handleEleveDelete = this.handleEleveDelete.bind(this);
    }

    appendEleveInput() {
        const newInput = `eleve${this.state.idx}`;
        this.setState({
            inputs: this.state.inputs.concat(newInput),
            idx: this.state.idx + 1
        });
    }

    handleEleveChange(eleve) {
        console.log(eleve);
        this.props.onChange({
            id: eleve.id,
            data: eleve.data
        });    
    }

    handleEleveDelete(eleve) {
        console.log(`DELETE`, eleve);
        this.setState({
            inputs: this.state.inputs.filter((item) => {
                return item !== eleve.id;
            })
        });
        this.props.onDelete({
            id: eleve.id,
            data: eleve.data,
        });
    }

    render() {
        return (
            <div className="EleveList">
                <Row className="EleveList--list">
                    <Col>
                        {this.state.inputs.map((item, idx) => {
                            return (
                                <Eleve 
                                    key={idx}
                                    id={item} 
                                    idx={idx} 
                                    onChange={this.handleEleveChange} 
                                    onDelete={this.handleEleveDelete}
                                    canDelete={idx !== 0}
                                />
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.appendEleveInput}>Ajouter un eleve</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

EleveList.defaultProps = {
    onChange: function() {},
    onDelete: function() {},
};

export default EleveList;
