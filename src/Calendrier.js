
import React, { Component } from 'react';
import reactCSS from 'reactcss';

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
        const thead = DAYS.map((day, idx) => {
            return (
                <th key={idx}>
                    {day.char}
                </th>
            );
        });

        return (<tr>{thead}</tr>);
    }
}

class MonthGrid extends Component {

    render() {
        const styles = reactCSS({
            'default': {
                weekday: {
                    background: `rgba(${ this.props.weekdayColor.r }, ${ this.props.weekdayColor.g }, ${ this.props.weekdayColor.b }, ${ this.props.weekdayColor.a })`,
                },
                workday: {
                    background: `rgba(${ this.props.workdayColor.r }, ${ this.props.workdayColor.g }, ${ this.props.workdayColor.b }, ${ this.props.workdayColor.a })`,
                },
                noday: {
                    background: `rgba(${ this.props.nodayColor.r }, ${ this.props.nodayColor.g }, ${ this.props.nodayColor.b }, ${ this.props.nodayColor.a })`,
                },
                birthday: {
                    background: `rgba(${ this.props.birthdayColor.r }, ${ this.props.birthdayColor.g }, ${ this.props.birthdayColor.b }, ${ this.props.birthdayColor.a })`,
                },
                offday: {
                    background: `rgba(${ this.props.offdayColor.r }, ${ this.props.offdayColor.g }, ${ this.props.offdayColor.b }, ${ this.props.offdayColor.a })`,
                },
            }
        });
    
        const startDate = moment(this.props.date);

        let lines = [];
        let currentDate = startDate.clone();

        let cols = [];

        // Adding offset 
        for (let i = 0, len = (currentDate.isoWeekday() - 1); i < len; ++i) {
            cols.push(<td key={"nodayBefore-" + i} style={styles.noday}>&nbsp;</td>);
        }

        // create days
        const currentMonth = currentDate.month();
        while (currentDate.month() === currentMonth) {

            let styleToUse = null;

            const idx = currentDate.format("MM-DD");
            let names = [];
            let offdayNames = null;
            if (this.props.eleves.date.hasOwnProperty(idx)) {
                console.log(`Eleves found at ${currentDate.format()} => ${this.props.eleves.date[idx].count}`);

                for (const key in this.props.eleves.date[idx].data) {
                    const eleve = this.props.eleves.date[idx].data[key];
                    names.push(<div key={eleve.hash}><Badge color="primary">{eleve.name}</Badge><br /></div>);
                }

                styleToUse = styles.birthday;
            } 

            // check if offday
            const dayId = currentDate.format("DD");
            if (this.props.offdays.hasOwnProperty(dayId)) {
                if (styleToUse === null) {
                    styleToUse = styles.offday;
                }
                offdayNames = this.props.offdays[dayId].map((label) => {
                    return (<div><Badge color="warning">{label}</Badge><br /></div>);
                });
            }

            // adding day
            if (styleToUse === null) {
                styleToUse = (business.isWeekDay(currentDate) ? styles.workday : styles.weekday);
            }
            cols.push(
                <td key={currentDate.format("YYYY-MM-DD")} className={classnames('day', {weekday: (!business.isWeekDay(currentDate))})}
                    style={styleToUse}
                >
                    {currentDate.format('D')}
                    {offdayNames}
                    {names}
                </td>
            );

            if (cols.length === 7) {
                lines.push(<tr key={lines.length}>{cols}</tr>);
                cols = [];
            }

            currentDate.add('1', 'day');
        }

        if (cols.length) {
            let i = 0;
            while (cols.length < 7) {
                cols.push(<td key={"nodayBefore-" + i} style={styles.noday}>&nbsp;</td>);
                i++;
            }
            lines.push(<tr key={lines.length}>{cols}</tr>);
        }

        return (
            <Table className="monthGrid">
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
                    offdays={this.props.offdays}
                    workdayColor={this.props.workdayColor}
                    weekdayColor={this.props.weekdayColor}
                    nodayColor={this.props.nodayColor}
                    birthdayColor={this.props.birthdayColor}
                    offdayColor={this.props.offdayColor}
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
                    {this.props.date.format('MMM')}
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

    componentWillReceiveProps(nextProps) {
        // if (nextProps.dateStart.diff(this.state.startDate)) {
            this.setState({
                activeDate: nextProps.dateStart,
                activeTab: nextProps.dateStart.format(IDX_FORMAT),
            });
        // }        
    }

    render() {
        // const data = this.build();
        const dates = buildMonthsArray(this.props.dateStart, this.props.dateEnd);

        console.log(`Calendrier::props`, this.props);
        console.log(`Calendrier::state`, this.state);

        let offdays = {};
        const offdayId = this.state.activeDate.format('MM');
        if (this.props.offdays.hasOwnProperty(offdayId)) {
            offdays = this.props.offdays[offdayId];
        }

        return (
            <div className="Calendrier">
                <Nav tabs>
                    {dates.map((item) => {
                        const idx = item.format(IDX_FORMAT);
                        return (
                            <NavItemMonth 
                                key={idx}
                                date={item} 
                                onClick={this.toggle}
                                idx={idx}
                                active={this.state.activeTab === idx}
                            />
                        );
                    })}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <MonthTabPane 
                        date={this.state.activeDate}
                        idx={this.state.activeDate.format(IDX_FORMAT)}
                        eleves={this.props.eleves}
                        offdays={offdays}
                        workdayColor={this.props.workdayColor}
                        weekdayColor={this.props.weekdayColor}
                        nodayColor={this.props.nodayColor}
                        birthdayColor={this.props.birthdayColor}
                        offdayColor={this.props.offdayColor}
                    />
                </TabContent>
            </div>
        );
    }
}

Calendrier.defaultProps = {
    dateStart: moment().month(8).date(1),
    dateEnd: moment().add(1, 'year').month(7).date(1),
    workdayColor: {r: 255, g: 255, b: 255, a: 1},
    weekdayColor: {r: 150, g: 150, b: 150, a: 1},
    nodayColor: {r: 50, g: 50, b: 50, a: 1},
    offdays: {}
};

export default Calendrier;