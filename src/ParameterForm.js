
import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, Collapse, Button, CardBlock, Card } from 'reactstrap';
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
          options.push(<option key={yearNow + i} value={yearNow + i}>{yearNow + i}-{yearNext + i}</option>);
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

class InputColorForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: {
                r: this.props.r,
                g: this.props.g,
                b: this.props.b,
                a: this.props.a,
            },
        }
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
        console.log(`InputColorForm::handleChange`, color);
        this.setState({
            color: color.rgb,
        });
        // notify color changed
        this.props.onChange(color);
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
                <Label sm={6}>{this.props.label}</Label>
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

InputColorForm.defaultProps = {
    onChange: function() {},
    label: 'Color',
    r: '255',
    g: '255',
    b: '255',
    a: '1'
};

class ColorsForm extends Component {

    constructor(props) {
        super(props);

        this.handleWorkdayColorChange = this.handleWorkdayColorChange.bind(this);
        this.handleWeekdayColorChange = this.handleWeekdayColorChange.bind(this);
        this.handleNodayColorChange = this.handleNodayColorChange.bind(this);
        this.handleBirthdayColorChange = this.handleBirthdayColorChange.bind(this);
        this.handleOffdayColorChange = this.handleOffdayColorChange.bind(this);
    }

    handleWorkdayColorChange(color) {
        this.props.onWorkdayColorChange(color.rgb);
    }

    handleWeekdayColorChange(color) {
        this.props.onWeekdayColorChange(color.rgb);
    }

    handleNodayColorChange(color) {
        this.props.onNodayColorChange(color.rgb);
    }

    handleBirthdayColorChange(color) {
        this.props.onBirthdayColorChange(color.rgb);
    }

    handleOffdayColorChange(color) {
        this.props.onOffdayColorChange(color.rgb);
    }

    render() {
        return (
            <div>
                <InputColorForm 
                    label="Jour normal" 
                    r={this.props.workdayColor.r}
                    g={this.props.workdayColor.g}
                    b={this.props.workdayColor.b}
                    a={this.props.workdayColor.a}
                    onChange={this.handleWorkdayColorChange}
                />
                <InputColorForm 
                    label="Weekend" 
                    r={this.props.weekdayColor.r}
                    g={this.props.weekdayColor.g}
                    b={this.props.weekdayColor.b}
                    a={this.props.weekdayColor.a}
                    onChange={this.handleWeekdayColorChange}
                />
                <InputColorForm 
                    label="Couleur pas de jour" 
                    r={this.props.nodayColor.r}
                    g={this.props.nodayColor.g}
                    b={this.props.nodayColor.b}
                    a={this.props.nodayColor.a}
                    onChange={this.handleNodayColorChange}
                />
                <InputColorForm 
                    label="Jour férié" 
                    r={this.props.offdayColor.r}
                    g={this.props.offdayColor.g}
                    b={this.props.offdayColor.b}
                    a={this.props.offdayColor.a}
                    onChange={this.handleOffdayColorChange}
                />
                <InputColorForm 
                    label="Anniversaire" 
                    r={this.props.birthdayColor.r}
                    g={this.props.birthdayColor.g}
                    b={this.props.birthdayColor.b}
                    a={this.props.birthdayColor.a}
                    onChange={this.handleBirthdayColorChange}
                />
            </div>
        );
    }
}

class ParameterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: moment().year(),
            collapseColor: false,
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.toggleColor = this.toggleColor.bind(this);
    }

    onDateChange(e) {
        this.setState({
            year: e.target.value
        }, this.notifyChange);
    }

    notifyChange() {
        this.props.onChange(this.state);
    }

    toggleColor() {
        this.setState({
            collapseColor: !this.state.collapseColor
        });
    }

    render() {
        return (
            <div className="parameter">
                <h3>Paramètres</h3>
                <Form>
                    <ParameterDateForm onChange={this.onDateChange} />

                    <Button color="primary" onClick={this.toggleColor} style={{ marginBottom: '1rem' }}>Couleurs</Button>
                    <Collapse isOpen={this.state.collapseColor}>
                        <Card>
                            <CardBlock>
                                <ColorsForm 
                                    workdayColor={this.props.workdayColor}
                                    weekdayColor={this.props.weekdayColor}
                                    nodayColor={this.props.nodayColor}
                                    offdayColor={this.props.offdayColor}
                                    birthdayColor={this.props.birthdayColor}
                                    onWorkdayColorChange={this.props.onWorkdayColorChange}
                                    onWeekdayColorChange={this.props.onWeekdayColorChange}
                                    onNodayColorChange={this.props.onNodayColorChange}
                                    onBirthdayColorChange={this.props.onBirthdayColorChange}
                                    onOffdayColorChange={this.props.onOffdayColorChange}
                                />
                            </CardBlock>
                        </Card>
                    </Collapse>
                </Form>
            </div>
        );
    }
}

ParameterForm.defaultProps = {
    onChange: function() {},
    onWorkdayColorChange: function() {},
    onWeekdayColorChange: function() {},
    onNodayColorChange: function() {},
    onBirthdayColorChange: function() {},
    onOffdayColorChange: function() {},
};

export default ParameterForm;