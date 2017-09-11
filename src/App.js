
import React, { Component } from 'react';
import { Container, Row, Col, Nav, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Calendrier from './Calendrier';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  renderFormEleve() {
    return (
      <Form inline>
        <FormGroup>
          <Label for="elevePrenom" hidden>Prénom</Label>
          <Input type="text" name="elevePrenom" placeholder="Prénom" />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="eleveDate" hidden>Date</Label>
          <Input type="text" name="eleveDate" placeholder="Date" />
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Génération de calendrier scolaire</h2>
        </div>
        <Container fluid>
          <Row>
            <Col sm="4" md="4">
              <h3>Parametre</h3>
              <Row>Annee: 2017-2018</Row>
              <h3>Liste des élèves</h3>
              <div className="js-form-eleves">
                <Row>{this.renderFormEleve()}</Row>
              </div>
              <Row>
                <Button>Ajouter un eleve</Button>
              </Row>
            </Col>
            <Col sm="8" md="8">
              <h3>Calendrier</h3>
              <Calendrier />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
