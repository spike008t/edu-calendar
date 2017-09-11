
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Table } from 'reactstrap';

import classnames from 'classnames';
import './Calendrier.css';

import moment from 'moment';

moment.locale('fr');

const NB_LINES_MAX = 6;

const DAYS = [
    {name: 'Lundi',     char: 'L', workday: true},
    {name: 'Mardi',     char: 'M', workday: true},
    {name: 'Mercredi',  char: 'M', workday: true},
    {name: 'Jeudi',     char: 'J', workday: true},
    {name: 'Vendredi',  char: 'V', workday: true},
    {name: 'Samedi',    char: 'S', workday: false},
    {name: 'Dimanche',  char: 'D', workday: false}
];

const MONTHS = [
    {label: 'Septembre',    month: 9,   yearOffset: 0},
    {label: 'Octobre',      month: 10,  yearOffset: 0},
    {label: 'Novembre',     month: 11,  yearOffset: 0},
    {label: 'Décembre',     month: 12,  yearOffset: 0},
    {label: 'Janvier',      month: 1,   yearOffset: 1},
    {label: 'Février',      month: 2,   yearOffset: 1},
    {label: 'Mars',         month: 3,   yearOffset: 1},
    {label: 'Avril',        month: 4,   yearOffset: 1},
    {label: 'Mai',          month: 5,   yearOffset: 1},
    {label: 'Juin',         month: 6,   yearOffset: 1},
    {label: 'Juillet',      month: 7,   yearOffset: 1},
    {label: 'Août',         month: 8,   yearOffset: 1},
];

const YEAR = 2017;

export default class Calendrier extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    renderMonthGrid(month, year) {
        const thead = DAYS.map((day) => {
            return (
                <td>
                    {day.char}
                </td>
            );
        });

        const firstDay = moment([year, month.month - 1, 1]);

        let idx = 1;
        let lines = [];
        let hasDay = false;
        let currentDate = firstDay.clone();
        for (let line = 0, length = NB_LINES_MAX; line < length; ++line) {
            let cols = [];
            for (let i = 0; i < DAYS.length; ++i) {
                const day = DAYS[i];
                let label = ' ';

                if (hasDay === false) {
                    if ((firstDay.isoWeekday() - 1) === i) {
                        hasDay = true;
                        label = currentDate.format('D');
                        currentDate.add(1, 'd');
                    }
                } else {
                    if (currentDate.month() === firstDay.month()) {
                        label = currentDate.format('D');
                        currentDate.add(1, 'd');    
                    } else {
                        break;
                    }
                }

                cols.push((<td className={classnames('day', {workday: day.workday})}>{label}</td>));
            }
            lines.push((<tr>{cols}</tr>));
        }
        return (
            <Table>
                <thead>
                    <tr>
                        {thead}
                    </tr>
                </thead>
                <tbody>
                    {lines}
                </tbody>
            </Table>
        );
    }

    renderTabs() {
        let i = 1;
        const items = MONTHS.map((item) => {
            const idx = i++;
            return (
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === idx.toString()})}
                    onClick={() => { this.toggle(idx.toString()); }}
                    >
                        {item.label}
                    </NavLink>
                </NavItem>
            );
        });

        return items;
    }

    renderGrids() {
        const tabs = MONTHS.map((month, idx) => {
            return (
                <TabPane tabId={(idx + 1).toString()}>
                    <Row>
                        <Col sm="12">
                            <h3>[{idx}] {month.label} {YEAR + month.yearOffset}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.renderMonthGrid(month, YEAR + month.yearOffset)}
                    </Row>
                </TabPane>
            );
        });

        return (
            <TabContent activeTab={this.state.activeTab}>
                {tabs}
            </TabContent>
        );
    }

    render() {
        return (
            <div className="Calendrier">
                <Nav tabs>
                    {this.renderTabs()}
                </Nav>
                {this.renderGrids()}
            </div>
        );
    }
}
