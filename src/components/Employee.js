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


export default function Employee(props) {

    const [testModal, setTestModal] = useState(false)
    const [print, setPrint] = useState(false)
    const [switchState, setSwitchState] = useState("employees")
    const navs = ["Времеплов", "Подесувања"]

    const setTest = () => {
        setTestModal(false)
    }

    const printSet = () => {
        setPrint(!print)
    }

    const returnTestModal = () => {
        setTestModal(!testModal)
    }

    const newTest = () => {
        setTestModal(true)
    }

    const setSwitch = (value) => {
        console.log(value)
        setSwitchState(value)
    }
    return( 
        <div style={style.employee}>
            <div style={style.top}>
                <h1 style={style.name}>{`${props.item.name} ${props.item.lastName}`}</h1>
                <h1 style={style.topText}>{`${props.companyName} (${props.item.position})`}</h1>
                {/* <h1 style={style.topText}>{this.props.item.address.charAt(0).toUpperCase() + this.props.item.address.slice(1)}</h1> */}
                <div style={style.chipRow}>
                    <Chip icon={<AddToQueueIcon />} label={"Нов преглед"} style={style.chip} onClick={(e) => { e.preventDefault(); newTest()}}/>
                </div>
                <TestModal 
                        render={testModal}
                        db={props.db}
                        setModal={setTest}
                        setAlert={props.setAlert}
                        setAlertMessage={props.setAlertMessage}
                        numberOfEmployees={1} //in this case it's 1
                        setNumber={() => {}} //empty due to only 1 employee in this case
                        setPrint={printSet}
                        returnTestModal={returnTestModal}
                        selectedEmployees={[]}
                    />
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
                    <Generals item={props.item.name} description={"Име"}/>
                    <Generals item={props.item.lastName} description={"Презиме"}/>
                    <Generals item={props.item.address} description={"Адреса"}/>
                    <Generals item={props.item.age} description={"Година на раѓање"}/>
                    <Generals item={props.companyName} description={"Фирма"}/>
                    <Generals item={props.item.position} description={"Позиција"}/>
                </div>
                <div style={style.main}>
                   <StateNav setSwitch={setSwitch} navs={navs}/>
                    {
                        (switchState === "timeline")
                        ? <EmployeeSettings
                            item={props.item}
                            db={props.db}
                            setEmployee={props.setEmployee}
                            setAlert={props.setAlert}
                            setAlertMessage={props.setAlertMessage} />
                        : undefined
                    }
                    {
                        (switchState === "employees")
                        ? 
                        <div>
                            {
                                (props.item.tests && props.item.tests.length)
                                ?  <VerticalLinearStepper items={props.item.tests} db={props.db}/>
                                : <h1 style={style.noTests}>Нема систематски прегледи за овој вработен.</h1>
                            }

                                

                        </div>
                        : undefined
                    }
               </div>
        </div>
    )
}