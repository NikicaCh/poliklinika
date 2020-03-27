import React, { useState } from 'react'
import firebase from 'firebase'
import TestArrangement from './TestArrangement'
import TodaysArrangements from './TodaysArrangements'
import CalendarTable from './CalendarTable'

import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const newColor = blue[400];
const newColor2 = deepPurple[300]
const newColor3 = deepPurple[200]




const style={
    calendar: {
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#F2F8F8",
    },
    main: {
        position: "absolute",
        top: "10%",
        left: "30%",
        height: "80vh",
        minWidth: "58vw",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        zIndex: "2",
        padding: "1%",
        // overflowY: "scroll",
        overflowX: "hidden",
        boder: "solid 1px red"
    },
    left: {
        position: "absolute",
        top: "10%",
        left: "2%",
        maxHeight: "50vh",
        minHeight: "50vh",
        minWidth: "22vw",
        maxWidth: "27vw",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        zIndex: "2",
        padding:"1% 0 5% 0",
    },
    buttonB: {
        position: "absolute",
        background: newColor,
        color: "white",
        borderRadius: "20px",
        left: "10%"
    },
    calendarButton: {
        position: "relative",
        background: newColor2,
        color: "white",
        borderRadius: "20px",
        marginRight: "3%"
    },
    calendarButton2: {
        position: "relative",
        background: newColor3,
        color: "white",
        borderRadius: "20px",
        marginRight: "1%"
    },
    component: {
        width: "90%"
    },
    arrangements: {
        marginTop: "25%"
    }
}

class Calendar extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            modal: false,
            tests: [],
            format: "day"
        }

        this.getArrangemetns = this.getArrangemetns.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.openModal = this.openModal.bind(this)
        this.setFormat = this.setFormat.bind(this)
    }


    async getArrangemetns() {
        let empty = []
        const snapshot = await firebase.firestore().collection('testArrangements').get()
        
        snapshot.docs.map(doc => {
            console.log("SNAP")
            let data = doc.data()
            data.id = doc.ref.id
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() -1)
            if(new Date(data.date) < new Date(yesterday)) {
                this.props.db.collection("testArrangements").doc(data.id).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
            empty.push(data)
        });
        this.setState({tests: empty})
    }

    componentDidMount() {
        this.getArrangemetns()
    }

    componentWillReceiveProps() {
        this.getArrangemetns()
    }
    

    // const tests = ["test1", "test2", "test3"]
    
    handleClose = () => {
        this.setState({modal: false})
    }

    openModal = () => {
        this.setState({modal: true})
    }

    setFormat = (value) => {
        this.setState({format: value})
    }

    render() {
        return (
            <div style={style.calendar}>
                <div style={style.main}>
                    <Button style={style.calendarButton} onClick={() => {this.setFormat("day")}}>Ден</Button>
                    <Button style={style.calendarButton2} onClick={() => {this.setFormat("week")}}>Недела</Button>
                    <Button style={style.calendarButton2} onClick={() => {this.setFormat("month")}}>Месец</Button>
                    <TestArrangement  
                        db={this.props.db}
                        render={this.state.modal}
                        handleClose={this.handleClose}
                        companiesData={this.props.companiesData}
                        setAlert={this.props.setAlert}
                        setAlertMessage={this.props.setAlertMessage} 
                        getArrangemetns={this.getArrangemetns}/>  
                    <CalendarTable format={this.state.format} tests={this.state.tests}/>
                </div>
                <div style={style.left}>
                    <div style={style.button}>
                        <Button style={style.buttonB} onClick={this.openModal}>Закажи преглед</Button>
                    </div>
                    <div style={style.arrangements}>
                        {
                            this.state.tests.slice(0, 5).map((test) => {
                                return <TodaysArrangements
                                    db={this.props.db}
                                    item={test}
                                    setAlert={this.props.setAlert}
                                    setAlertMessage={this.props.setAlertMessage}
                                    setCompany={this.props.setCompany} />
                            })
                        }
                    </div>
                    
                </div>
            </div>
        )
    }   
}

export default Calendar