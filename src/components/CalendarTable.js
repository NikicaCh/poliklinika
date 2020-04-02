import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import WeekEvent from './WeekEvent'

import deepPurple from '@material-ui/core/colors/deepPurple'
import blue from '@material-ui/core/colors/blue'
import teal from '@material-ui/core/colors/teal'
import lime from '@material-ui/core/colors/lime'
import blueGrey from '@material-ui/core/colors/blueGrey'
import deepOrange from '@material-ui/core/colors/deepOrange'



const months = [
    "Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"
]

const colors = {
    0: deepPurple[300],
    1: blue[300],
    2: teal[400],
    3: lime[600],
    4: blueGrey[200],
    5: deepOrange[400]
}

const style = {
    calendar: {
        position: "relative",
        width: "100%",
        height: "100%",
        marginTop: "2%",
        borderRadius: "10px",
    },
    nav: {
        height: "3%",
        background: "#16335A",
        textAlign: "center",
        color: "white"
    }, 
    leftArrow: {
        position: "absolute",
        left: "5%",
        cursor: "pointer"
    },
    rightArrow: {
        position: "absolute",
        right: "5%",
        cursor: "pointer"
    },
    table: {
        minWidth: "90%",
    },
    cell: {
        height: "50vh"
    },
    dailyTable: {
        
    },
    weeklyTable: {

    },
    monthTable:  {  
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gridColumnGap: "0px",
        gridRowGap: "0px",
        marginLeft: "-1%"
    },
    monthDay: {
        boxShadow: "2px 1px 1px 0 rgba(60,64,67,.3), 1px 1px 1px 1px rgba(60,64,67,.15)",
        width: "8vw",
        height: "5.5vw",
        textAlign: "right",
        cursor: "pointer",
        color: "#686868",
        fontSize: ".9vw",
        padding: "1% 2% 0 0",
        margin: ".5%"
    }

}


class CalendarTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            week: [],
            seven: new Date(),
            todaysTests: [],
            month: []
        }

        this.sortArrangements = this.sortArrangements.bind(this)
        this.addDays = this.addDays.bind(this)
        this.addMonths = this.addMonths.bind(this)
        this.setWeek = this.setWeek.bind(this)
        this.weekArrangements = this.weekArrangements.bind(this)
        this.Month = this.Month.bind(this)
    }

    


    sortArrangements = () => {
        let array = []
        this.props.tests.map((test) => {
            if(new Date(test.date).getDate() == new Date(this.state.date).getDate()) {
                array.push(test)
            }
        })
        this.setState({todaysTests: array})
    }

    weekArrangements = () => {
        this.state.week.map((day) => {
            let tests = []
            this.props.tests.map((test) => {
                if( new Date(test.date).getDate() == new Date(day.date).getDate()) {
                    tests.push(test)
                    day.tests = tests
                    this.setState({week: this.state.week})
                }
            })
        })
    }


    addDays = (days) => {
        let result = new Date(this.state.date);
        result.setDate(result.getDate() + days);
        this.setState({date: new Date(result)}, () => {
            this.sortArrangements()
        })
    }
    Month = (today) => { // it will be the first day of the month in next months, not in render
        let month = [
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            },
            {
                date: new Date()
            }
        ]
        const cache = localStorage.getItem("testArrangements");
        this.setState({month: []}, () => {
            let first = new Date()
            let todaysDate = new Date(today).getDate()
            // console.log("FIRST", first)
            let thisMonth = new Date(today).getMonth()
            if(today.getDate() === 1) {
                first = new Date(today)
            } else {
                first.setDate(first.getDate() - todaysDate + 1)
            }
            let firstDay = new Date(first).getDay() || 7
            first.setDate(first.getDate() - 1)
            month.map((day, index) => {
                if(index +1 < firstDay) {
                    month[index].date = new Date()
                    month[index].class = "passive"
                } else {
                    first.setDate(first.getDate() + 1)
                    month[index].date = new Date(first)
                    if(cache) {
                    this.props.tests.map((test) => {
                            if(new Date(test.date).getDate() == new Date(month[index].date).getDate() && new Date(test.date).getMonth() == new Date(month[index].date).getMonth()) {
                                let tests = month[index].tests || []
                                tests.push(test)
                                month[index].tests = tests
                            }
                        })
                    }
                    if(thisMonth !== new Date(first).getMonth()) {
                        first.setDate(first.getDate())
                        month[index].class = "passive"
                    }
                } 
            })
            this.setState({month})
        })
        
    }

    addMonths = (months) => {
        let today = new Date(this.state.date)
        today.setMonth(today.getMonth() + months)
        let first = new Date()
        if(this.state.date.getMonth() +months !== today.getMonth() && this.state.date.getFullYear() == today.getFullYear()) {
            today.setMonth(today.getMonth() - months)
        }
        first.setDate(first.getDate() - today + 1)      
        this.setState({date: new Date(today)}, () => {
            let today = new Date(this.state.date) //todays day number //ex:26
            this.Month(today)
            this.sortArrangements()
        })
    }

    setWeek = (value) => {
        let seven = new Date(this.state.seven).setDate(this.state.seven.getDate() + value)
        this.setState({seven: new Date(seven)}, () => {
            let week = [{
                day: "понеделник",
                date: ""
            },
            {
                day: "вторник",
                date: ""
            },
            {
                day: "среда",
                date: ""
            },
            {
                day: "четврток",
                date: ""
            },
            {
                day: "петок",
                date: ""
            },
            {
                day: "сабота",
                date: ""
            },
            {
                day: "недела",
                date: ""
            },]
        let today = new Date(this.state.seven).getDay()
        week.map((day, index) => {
            let toAddDays = index +1 - today;
            let newDate = new Date() 
            newDate = new Date(new Date(this.state.seven).setDate(new Date(this.state.seven).getDate() + toAddDays))
            week[index].date = newDate
        })
        this.setState({week: week}, () => {
            this.weekArrangements()   

        })
        })
     
    }

   

    componentDidMount() {
        this.setWeek(0)
        let d = new Date()
        let today = new Date(d) 
        this.Month(today)
    }

    componentWillReceiveProps() {
        this.sortArrangements()
        this.weekArrangements()
        let d = new Date()
        let today = new Date(d) 
        this.Month(today)
    }

    render() {
        return (
            <div style={style.calendar}>
                {
                    (this.props.format == "week")
                    ? <div>
                        <DialogTitle id="form-dialog-title" style={style.nav}>
                            <ArrowLeftIcon fontSize={"large"} style={style.leftArrow}  onClick={() => { this.setWeek(-7)}}/>
                            {`${months[this.state.week[0].date.getMonth()]} ${this.state.week[0].date.getDate()} ${this.state.week[0].date.getFullYear()}  - 
                            ${months[this.state.week[6].date.getMonth()]} ${this.state.week[6].date.getDate()} ${this.state.week[6].date.getFullYear()}`}
                            <ArrowRightIcon fontSize={"large"} style={style.rightArrow} onClick={() => { this.setWeek(7)}}/>
                        </DialogTitle>
                            <div style={style.weeklyTable}>
                                <TableContainer component={Paper}>
                                <Table className={style.table} aria-label="caption table">
                                    <TableHead>
                                    <TableRow>
                                        {
                                            this.state.week.map((day) => {
                                                return <TableCell align={"center"}>{day.day}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={"tableRow"} >
                                        {
                                            this.state.week.map((day) => {
                                                if(day.tests && day.tests.length) {
                                                    let array = []
                                                    return <TableCell colSpan={1} align={"center"}>{
                                                        day.tests.map((test) => {
                                                            if(array.indexOf(test) === -1) {
                                                                array.push(test)
                                                                return <WeekEvent title={test.companyName} number={test.numberOfEmployees} color={Math.floor(Math.random() * 6)} />
                                                            }
                                                        })
                                                        
                                                    }</TableCell>
                                                } else {
                                                    return <TableCell colSpan={1} align={"center"}>{
                                                        <div>
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                           <WeekEvent title={"TEST"} number={5} color={Math.floor(Math.random() * 6)} />
                                                        </div>
                                                    }</TableCell>
                                                }
                                            })
                                        }
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </div>
                     </div>
                    : undefined
                }
                {
                    (this.props.format === "month")
                    ?<div>
                        <DialogTitle id="form-dialog-title" style={style.nav}>
                        <ArrowLeftIcon fontSize={"large"} style={style.leftArrow}  onClick={() => { this.addMonths(-1)}}/>
                        {`${months[this.state.date.getMonth()]} ${this.state.date.getFullYear()}`}
                        <ArrowRightIcon fontSize={"large"} style={style.rightArrow} onClick={() => { this.addMonths(1)}}/>
                     </DialogTitle>
                        <div >
                                    <TableContainer component={Paper}>
                                    <Table className={style.table} aria-label="caption table">
                                        <TableCell colSpan={1} style={style.monthTable} align={"center"}>   
                                            {
                                                this.state.month.map((day) => {
                                                    let color = colors[Math.floor(Math.random() * 6)]
                                                    let styles = {
                                                        fontSize: ".7vw",
                                                        marginTop: "5%",
                                                        textAlign: "center",
                                                        fontSize: "2vw",
                                                        fontFamily: 'Pacifico , cursive',
                                                        color: color
                                                    }
                                                    if(day.class === "passive") {
                                                        return  <div style={style.passive}>
                                                                </div>
                                                    } else {
                                                        return  <div style={style.monthDay} onClick={() => {this.props.setDate(new Date(day.date))}}>
                                                                    {day.date.getDate()}
                                                                    {
                                                                    (day.tests && day.tests.length )
                                                                    ? <h1 style={styles} >{day.tests.length}</h1>
                                                                    :undefined}
                                                                    
                                                                </div>
                                                    }
                                                })
                                            }
                                            
                                        </TableCell>
                                    </Table>
                                    </TableContainer>
                        </div>
                        
                     </div>
                    : undefined
                }
                
    
            </div>
        )
    }
}

export default CalendarTable;