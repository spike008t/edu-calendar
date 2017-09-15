
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Table, Badge } from 'reactstrap';

import classnames from 'classnames';
import './Calendrier.css';

import moment from 'moment';
import 'moment/locale/fr';
import business from 'moment-business';

moment.locale('fr');

const IDX_FORMAT = "MMYYYY";

const DAYS = [
    {name: 'Lundi',     char: 'L', workday: true},
    {name: 'Mardi',     char: 'M', workday: true},
    {name: 'Mercredi',  char: 'M', workday: true},
    {name: 'Jeudi',     char: 'J', workday: true},
    {name: 'Vendredi',  char: 'V', workday: true},
    {name: 'Samedi',    char: 'S', workday: false},
    {name: 'Dimanche',  char: 'D', workday: false}
];

function buildMonthsArray(dateStart, dateEnd) {
    let ret = [];
    let curDate = dateStart.clone();

    let curMonth = null;
    let idx = 0;
    while (dateEnd.diff(curDate) >= 0 && idx < 24) {
        ret.push(curDate.clone());
        curDate.add(1, 'month');
        idx++;
    }

    return ret;
}

class MonthGridHeader extends Component {
    render() {
        const thead = DAYS.map((day) => {
            return (
                <td>
                    {day.char}
                </td>
            );
        });

        return (<tr>{thead}</tr>);
    }
}

class MonthGrid extends Component {
    render() {
        const startDate = moment(this.props.date);

        let lines = [];
        let hasDay = false;
        let currentDate = startDate.clone();

        let cols = [];

        // Adding offset 
        for (let i = 0, len = (currentDate.isoWeekday() - 1); i < len; ++i) {
            cols.push(<td></td>);
        }

        // create days
        const currentMonth = currentDate.month();
        while (currentDate.month() === currentMonth) {
            const idx = currentDate.format("YYYY-MM-DD");
            let names = [];
            if (this.props.eleves.date.hasOwnProperty(idx)) {
                console.log(`Eleves found at ${currentDate.format()} => ${this.props.eleves.date[idx].count}`);
                // const keys = Object.keys(this.props.eleves.date[idx].data);

                for (const key in this.props.eleves.date[idx].data) {
                    const eleve = this.props.eleves.date[idx].data[key];
                    names.push(<div><Badge color="primary">{eleve.name}</Badge><br /></div>);
                }
            }
            cols.push(<td className={classnames('day', {weekday: (!business.isWeekDay(currentDate))})}>{currentDate.format('D')}{names}</td>);

            if (cols.length === 7) {
                lines.push(<tr>{cols}</tr>);
                cols = [];
            }

            currentDate.add('1', 'day');
        }

        if (cols.length) {
            lines.push(<tr>{cols}</tr>);
        }

        return (
            <Table>
                <thead>
                    <MonthGridHeader />
                </thead>
                <tbody>
                    {lines}
                </tbody>
            </Table>
        );
    }
}

class MonthTabPane extends Component {
    render() {
        console.log(`Render MonthTabPane for ${this.props.date.format()}`);
        const date = moment(this.props.date);
        return (
            <TabPane tabId={this.props.idx}>
            <Row>
                <Col sm="12">
                    <h3>{date.format('MMMM YYYY')}</h3>
                </Col>
            </Row>
            <Row>
                <MonthGrid 
                    date={this.props.date}
                    eleves={this.props.eleves}
                />
            </Row>
        </TabPane>
        );
    }
}

class NavItemMonth extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick({
            idx: this.props.idx,
            date: this.props.date,
        });
    }

    render() {
        return (
            <NavItem>
                <NavLink
                    className={classnames({ active: this.props.active })}
                    onClick={this.handleClick}
                >
                    {this.props.date.format('MMMM')}
            </NavLink>
            </NavItem>
        );
    }
}

NavItemMonth.defaultProps = {
    active: false,
    onClick: function() {}
};

class Calendrier extends Component {

    constructor(props) {
        super(props);
        
        const startDate = moment(this.props.dateStart);
        this.state = {
            startDate: startDate,
            activeDate: startDate,
            activeTab: startDate.format(IDX_FORMAT),
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(tabInfo) {
        console.log(`Calendrier::toggle`, tabInfo);
        if (this.state.activeTab !== tabInfo.idx) {
            this.setState({
                activeTab: tabInfo.idx,
                activeDate: tabInfo.date,
            });
        }
    }

    render() {
        // const data = this.build();
        const dates = buildMonthsArray(this.props.dateStart, this.props.dateEnd);

        console.log(this.props);

        return (
            <div className="Calendrier">
                <Nav tabs>
                    {dates.map((item) => {
                        const idx = item.format(IDX_FORMAT);
                        return (
                            <NavItemMonth 
                                date={item} 
                                onClick={this.toggle}
                                idx={idx}
                                active={this.state.activeTab == idx}
                            />
                        );
                    })}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <MonthTabPane 
                        date={this.state.activeDate}
                        idx={this.state.activeDate.format(IDX_FORMAT)}
                        eleves={this.props.eleves}
                    />
                </TabContent>
            </div>
        );
    }
}

Calendrier.defaultProps = {
    dateStart: moment().month(8).date(1),
    dateEnd: moment().add(1, 'year').month(7).date(1)
};

export default Calendrier;