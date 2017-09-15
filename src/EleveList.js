
import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';

import Eleve from './Eleve';

class EleveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eleveInputs: ['eleve0'],
            eleves: {}
        };

        this.handleEleveChange = this.handleEleveChange.bind(this);
        this.appendEleveInput = this.appendEleveInput.bind(this);
    }

    appendEleveInput() {
        const newInput = `eleve${this.state.eleveInputs.length}`;
        this.setState({
            eleveInputs: this.state.eleveInputs.concat(newInput)
        });
    }

    handleEleveChange(eleve) {
        // console.log(eleve);
        this.state.eleves[eleve.id] = eleve.data;
        this.props.onChange({
            id: eleve.id,
            data: eleve.data
        });
    }

    render() {
        return (
            <div className="EleveList">
                <Row className="EleveList--list">
                    <Col sm={{offset: 1, size: 11}}>
                        {this.state.eleveInputs.map((item, idx) => {
                            return (
                                <Eleve 
                                    id={item} 
                                    idx={idx} 
                                    onChange={this.handleEleveChange} 
                                />
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col sm={{offset: 1, size: 10}}>
                        <Button onClick={this.appendEleveInput}>Ajouter un eleve</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

EleveList.defaultProps = {
    onChange: function () {}
};

export default EleveList;
