import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import deepPurple from '@material-ui/core/colors/deepPurple'

import TestModal from './TestModal'
import Generals from './Generals'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StateNav from './StateNav';
import EmployeeSettings from './EmployeeSettings'
import VerticalLinearStepper from './VerticalLinearStepper'




const newColor = deepPurple[300]



const style={
    employee: {
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#E3E9EE",
    },
    top: {
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#F2F8F8",
        color: "#424242",
        textAlign: "center",
        zIndex: "2"
    },
    generals: {
        position: "absolute",
        top: "25%",
        left: "2%",
        height: "auto",
        minHeight: "20vh",
        minWidth: "22vw",
        maxWidth: "27vw",
        background: "white",
        borderRadius: "10px",
        paddingTop: "0 1% 1% 1%",
        zIndex: "2",
    },
    main: {
        position: "absolute",
        top: "25%",
        left: "30%",
        height: "66vh",
        minWidth: "58vw",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        zIndex: "2",
        // overflowY: "scroll",
        overflowX: "hidden",
    },
    topText: {
        fontSize: "1.4vw",
        position: "relative",
        top: "5%",
        margin: "auto"
    },name: {
        fontSize: "2.2vw",
        position: "relative",
        top: "5%",
        margin: "auto"
    },
    chipRow: {
        position: "relative",
        width: "40%",
        height: "auto",
        top: "8%",
        margin: "auto"
    },
    chip: {
        fontFamily: "Comfortaa",
        fontSize: ".8vw",
        cursor: "pointer",
        marginRight: "5%",
        background: newColor,
        color: "white",
        padding: "2.7% 1%"
    },
    noTests: {
        position: "absolute",
        top: "40%",
        left: "25%"        
    }
}


class Employee extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            testModal: false,
            print: false,
            switchState: "employees",
            navs: ["Времеплов", "Подесувања"],
            emploee: {},
            tests: [],
        }

        this.setTest = this.setTest.bind(this)
        this.printSet = this.printSet.bind(this)
        this.newTest = this.newTest.bind(this)
        this.setSwitch = this.setSwitch.bind(this)
        this.retrieveTests = this.retrieveTests.bind(this)
    }
    

    componentDidMount() {
        this.props.db.collection("employees").doc(this.props.item).get()
        .then((doc) => {
            if(doc.exists) {
                this.setState({emploee: doc.data()}, () => {
                    this.retrieveTests()
                })
            }
        })


    }
    retrieveTests = () => {
        let arrayOfTests = this.state.emploee.tests
        arrayOfTests.map((test) => {
            let testRef = this.props.db.collection('tests').doc(test);
            let getDoc = testRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                    let date = doc.data().date || doc.data().B
                    let array = []
                    this.state.tests.forEach((oldTest) => {
                        let oldDate = oldTest.date || oldTest.B
                        if(oldDate !== date) {
                            array.push(oldTest)
                        }
                    })
                    array.push(doc.data())
                    this.setState({tests: array})
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
            })
    }
    setTest = () => {
        this.setState({testModal: !this.state.testModal})
    }

    printSet = () => {
        this.setState({print: !this.state.print})
    }
    newTest = () => {
        this.setState({testModal: true})
    }

    setSwitch = (value) => {
        this.setState({switchState: value})
    }
    render() {
        return( 
            <div style={style.employee}>
                <div style={style.top}>
                    <h1 style={style.name}>{`${this.state.emploee.name} ${this.state.emploee.lastName}`}</h1>
                    <h1 style={style.topText}>{`${this.props.companyName} (${this.state.emploee.position})`}</h1>
                    {/* <h1 style={style.topText}>{this.state.emploee.address.charAt(0).toUpperCase() + this.state.emploee.address.slice(1)}</h1> */}
                </div>
                <div style={style.generals}>
                        <Paper>
                        <Tabs
                            value={0}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            >>
                            <Tab label="Генералии" />
                        </Tabs>
                        </Paper>
                        <Generals item={this.state.emploee.name} description={"Име"}/>
                        <Generals item={this.state.emploee.lastName} description={"Презиме"}/>
                        <Generals item={this.state.emploee.address} description={"Адреса"}/>
                        <Generals item={this.state.emploee.age} description={"Година на раѓање"}/>
                        <Generals item={this.props.companyName} description={"Фирма"}/>
                        <Generals item={this.state.emploee.position} description={"Позиција"}/>
                    </div>
                    <div style={style.main}>
                       <StateNav setSwitch={this.setSwitch} navs={this.state.navs}/>
                        {
                            (this.state.switchState === "timeline")
                            ? <EmployeeSettings
                                item={this.state.emploee}
                                db={this.props.db}
                                setEmployee={this.props.setEmployee}
                                setAlert={this.props.setAlert}
                                setAlertMessage={this.props.setAlertMessage} />
                            : undefined
                        }
                        {
                            (this.state.switchState === "employees")
                            ? 
                            <div>
                                {
                                    (this.state.emploee.tests && this.state.tests.length)
                                    ?  <VerticalLinearStepper items={this.state.tests} employee={this.state.emploee} db={this.props.db} setAlert={this.props.setAlert} setAlertMessage={this.props.setAlertMessage}/>
                                    : <h1 style={style.noTests}>Нема систематски прегледи за овој вработен.</h1>
                                }
                            </div>
                            : undefined
                        }
                   </div>
            </div>
        )
    }
    
}

export default Employee