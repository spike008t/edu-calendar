
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import moment from 'moment';
import 'moment/locale/fr';

import Calendar from './Calendar';
import PersonList from './PersonList';
import ParameterForm from './ParameterForm';

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    date: {
      start: moment([2017, 8, 1]),
      end: moment([2018, 6, 31]),
    },
    persons: {
      data: {},
      date: {}
    },
    weekdayColor: {
      r: 150,
      g: 150,
      b: 150,
      a: 1
    },
    offdayColor: {
      r: 255,
      g: 200,
      b: 150,
      a: 1
    },
    workdayColor: {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    },
    nodayColor: {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    },
    birthdayColor:{
      r: 255,
      g: 0,
      b: 0,
      a: 1
    },
    offdays: {
      '01': {
        '01': ['Nouvel an']
      },
      '05': {
        '01': ['Fete du travail'],
        '08': ['Armistice 45'],
      },
      '07': {
        '14': ['Fete national'],
      },
      '08': {
        '15': ['Assomption'],
      },
      '11': {
        '11': ['Armistice 18'],
      },
      '12': {
        '25': ['Noel']
      }
    }
  }

  constructor(props) {
    super(props);

    this.handleParametersChange = this.handleParametersChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handlePersonDelete = this.handlePersonDelete.bind(this);

    this.handleWeekdayColorChange = this.handleColorChange.bind(this, 'weekdayColor');
    this.handleWorkdayColorChange = this.handleColorChange.bind(this, 'workdayColor');
    this.handleNodayColorChange = this.handleColorChange.bind(this, 'nodayColor');
    this.handleBirthdayColorChange = this.handleColorChange.bind(this, 'birthdayColor');
    this.handleOffdayColorChange = this.handleColorChange.bind(this, 'offdayColor');
  }

  handlePersonChange(person) {
    console.log(`App::onPersonChange`, person);

    const persons = this.state.persons;
    const id = person.id;
    const data = person.data;
    const exists = persons.data.hasOwnProperty(id);

    if (exists === false || persons.data[id].hash !== data.hash) {

      this.setState((prevState) => {

        let persons = prevState.persons;

        if (exists === true) {
          const oldData = persons.data[id];
          // if different -> delete name
          if (oldData.date.diff(data.date) === 0 ) {
            const oldDateId = oldData.date.format("MM-DD");
            delete persons.date[oldDateId].data[id];
            persons.date[oldDateId].count--;
            if (persons.date[oldDateId].count === 0) {
              delete persons.date[oldDateId];
            }
          }
        }
  
        persons.data[id] = data;
  
        const dateId = data.date.format("MM-DD");
        if (persons.date.hasOwnProperty(dateId) === false) {
          persons.date[dateId] = {
            count: 1,
            data: {}
          };
        }
        persons.date[dateId].data[id] = data;      

        return {
          persons: persons
        };
      });
    }
  }

  handlePersonDelete(person) {
    console.log(`App:handlePersonDelete`, person);
    const id = person.id;
    const persons = this.state.persons;

    const exists = persons.data.hasOwnProperty(id);
    if (exists === false) {
      return ;
    }

    this.setState((state) => {
      let persons = state.persons;
      const oldData = persons.data[id];
      const oldDateId = oldData.date.format("MM-DD");
      delete persons.date[oldDateId].data[id];
      persons.date[oldDateId].count--;
      if (persons.date[oldDateId].count === 0) {
        delete persons.date[oldDateId];
      }

      delete persons.data[id];
      return {
        persons: persons
      };
    });

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

  handleColorChange(name, color) {
    this.setState({
      [name]: color
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
                workdayColor={this.state.workdayColor}
                weekdayColor={this.state.weekdayColor}
                nodayColor={this.state.nodayColor}
                birthdayColor={this.state.birthdayColor}
                offdayColor={this.state.offdayColor}
                onWorkdayColorChange={this.handleWorkdayColorChange}
                onWeekdayColorChange={this.handleWeekdayColorChange}
                onNodayColorChange={this.handleNodayColorChange}
                onBirthdayColorChange={this.handleBirthdayColorChange}
                onOffdayColorChange={this.handleOffdayColorChange}
              />
              <h3>Liste des élèves</h3>
              <PersonList
                onChange={this.handlePersonChange}
                onDelete={this.handlePersonDelete}
              />
            </Col>
            <Col sm="8" md="8">
              <h3>Calendrier</h3>
              <Calendar 
                persons={this.state.persons}
                offdays={this.state.offdays}
                dateStart={this.state.date.start}
                dateEnd={this.state.date.end}
                workdayColor={this.state.workdayColor}
                weekdayColor={this.state.weekdayColor}
                nodayColor={this.state.nodayColor}
                birthdayColor={this.state.birthdayColor}
                offdayColor={this.state.offdayColor}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

