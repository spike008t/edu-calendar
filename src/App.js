
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PhotoshopPicker } from 'react-color';

import moment from 'moment';
import 'moment/locale/fr';

import Calendrier from './Calendrier';
import EleveList from './EleveList';
import ParameterForm from './ParameterForm';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: {
        start: moment([2017, 8, 1]),
        end: moment([2018, 6, 31]),
      },
      eleves: {
        data: {},
        date: {}
      },
    };

    this.handleParametersChange = this.handleParametersChange.bind(this);
    this.handleEleveChange = this.handleEleveChange.bind(this);
  }

  __handleEleveChange(event) {
    console.log(event.target);

    const name = event.target.name;
    const value = event.target.value;

    const [key, field] = name.split('-');

    let ret = {
      eleves: {
        data: {
          [key]: {
            [field]: value
          }
        }
      }
    };
    
    if (field === 'date') {

      this.setState((prevState) => {
        ret.eleves.date = {};

        if (prevState.eleves.data[key].hasOwnProperty('date') === true) {
          const prevDate = prevState.eleves.data[key].date;
          // if not change, do nothing
          if (prevDate === value) {
            return ;
          }
          if (prevState.eleves.date.hasOwnProperty(prevDate)) {
            // if exists remove it
            if (prevState.eleves.date[prevDate].hasOwnProperty(key)) {
              ret.eleves.date[prevDate] = {
                [key]: undefined
              };
            }
          }
        }

        ret.eleves.date[value] = {
          [key]: true
        };

        return ret;
      });
      return ;
    }

    this.setState(ret);
  }

  handleEleveChange(eleve) {
    console.log(`App::onEleveChange`, eleve);

    let eleves = this.state.eleves;
    const id = eleve.id;
    const data = eleve.data;
    const exists = eleves.data.hasOwnProperty(id);

    if (exists === false || eleves.data[id].hash !== data.hash) {

      if (exists === true) {
        const oldData = eleves.data[id];
        // if different -> delete name
        if (oldData.date != data.date) {
          delete eleves.date[oldData.date].data[id];
          eleves.date[oldData.date].count--;
          if (eleves.date[oldData.date].count === 0) {
            delete eleves.date[oldData.date];
          }
        }
      }

      eleves.data[id] = data;

      if (eleves.date.hasOwnProperty(data.date) === false) {
        eleves.date[data.date] = {
          count: 1,
          data: {}
        };
      }
      eleves.date[data.date].data[id] = data;      
      this.setState({
        eleves: eleves
      });  
    }
  }

  handleParametersChange(params) {
    console.log(`parameter has changed`, params);
    const year = parseInt(params.year, 10);
    this.setState((prevState) => {
      const ret = {
        date: {
          start: this.state.date.start.year(year),
          end: this.state.date.end.year(year + 1),
        }
      };

      console.log(ret);

      return ret;
    });
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
              <ParameterForm 
                onChange={this.handleParametersChange}
              />
              <h3>Liste des élèves</h3>
              <EleveList
                onChange={this.handleEleveChange}
              />
            </Col>
            <Col sm="8" md="8">
              <h3>Calendrier</h3>
              <Calendrier 
                eleves={this.state.eleves}
                dateStart={this.state.date.start}
                dateEnd={this.state.date.end}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

