
import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

import moment from 'moment';

class ParameterDateForm extends Component {
    render() {
        const now = moment();
        let yearNow = now.year();
        let yearNext = yearNow + 1;
        let options = [];
    
        for (let i = 0; i < 3; ++i) {
          options.push(<option value={yearNow + i}>{yearNow + i}-{yearNext + i}</option>);
        }

        return (
            <FormGroup row>
              <Label sm={6} for="yearSelect">Année scolaire</Label>
              <Col sm={6}>
                <Input type="select" name="year" id="yearSelect" onChange={this.props.onChange}>
                  {options}
                </Input>
              </Col>
            </FormGroup>
        );
    }
}

ParameterDateForm.defaultProps = {
    onChange: function() {}
};

class WeekdayColorForm extends Component {

    state = {
        displayColorPicker: false,
        color: {
            r: '150',
            g: '150',
            b: '150',
            a: '1'
        },
    }

    handleClick = () => {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker,
        });
    }

    handleClose = () => {
        this.setState({
            displayColorPicker: false,
        });
    }

    handleChange = (color) => {
        this.setState({
            color: color.rgb,
        });
    }

    render() {
        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });
            
        return (
            <FormGroup row>
                <Label sm={6} for="weekdayColor">Couleur weekend</Label>
                <Col sm={6}>
                    <div style={styles.swatch}  onClick={this.handleClick}>
                        <div style={ styles.color }  />
                    </div>
                    {this.state.displayColorPicker ? 
                        <div style={ styles.popover }><div style={ styles.cover } onClick={this.handleClose} /><SketchPicker color={this.state.color} onChange={this.handleChange} /></div> 
                        : null}
                </Col>
            </FormGroup>
        );
    }
}

class ParameterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: moment().year()
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(e) {
        this.setState({
            year: e.target.value
        }, this.notifyChange);
    }

    notifyChange() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <div className="parameter">
                <h3>Paramètres</h3>
                <Form>
                    <ParameterDateForm onChange={this.onDateChange} />
                    <WeekdayColorForm />
                </Form>
            </div>
        );
    }
}

ParameterForm.defaultProps = {
    onChange: function() {}
};

export default ParameterForm;