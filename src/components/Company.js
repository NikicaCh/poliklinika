import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Generals from './Generals'
import Employees from './Employees'
import AddEmployeeModal from './AddEmployeeModal'
import CompanySettings from './CompanySettings'
import SlideUp from './SlideUp'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple'
import { findCompanyEmployees, getEmployee } from './Fetch';
import StateNav from './StateNav';
import AlertSnack from './AlertSnack';
import TestModal from './TestModal';
import TextField from '@material-ui/core/TextField';
import MiniSearch from 'minisearch'



const newColor = green[400];
const newColor2 = deepPurple[300]

const style = {
    company: {
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
    topText: {
        fontSize: "1.4vw",
        position: "relative",
        top: "5%",
        margin: "auto"
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
    name: {
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
    chip2: {
        fontFamily: "Comfortaa",
        fontSize: ".8vw",
        cursor: "pointer",
        marginRight: "5%",
        background: newColor2,
        color: "white",
        padding: "2.7% 1%"
    },
    stateNav: {
        position: "fixed",
        top: "0"
    },
    empSearch: {
        position: "absolute",
        top: "15%",
        left: "80%"
    }
}

const item = {
    name: "Никица Максимовски",
    address: "ул.Никшичка бр.26, Куманово",
    position: "професор"
}

class Company extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            empModal: false,
            testModal: false,
            ids: [],
            employees: [],
            filteredEmployees: [],
            selected: 0,
            selectedEmployees: [],
            fadeIn: false,
            switchState: "employees",
            print: false,
            navs: [
                "Вработени", "Времеплов", "Подесувања"
            ]
        }
        this.emps = this.emps.bind(this)
        this.callback = this.callback.bind(this)
        this.newTest = this.newTest.bind(this)
        this.setModal = this.setModal.bind(this)
        this.countSelected = this.countSelected.bind(this)
        this.selectEmployee = this.selectEmployee.bind(this)
        this.setSwitch = this.setSwitch.bind(this)
        this.setPrint = this.setPrint.bind(this)
        this.returnTestModal = this.returnTestModal.bind(this)
        this.setFadeIn = this.setFadeIn.bind(this)
        this.removeSelected = this.removeSelected.bind(this)
    }
    setModal = () => {
       this.setState({empModal: false})     
    }
    setTestModal = () => {
        this.setState({testModal: false})     
    }
    setFadeIn = () => {
        this.setState({fadeIn: true}, () => {
            this.setState({empModal: false})     
        })
    }
    removeSelected = () => {
        this.setState({selected: 0, selectEmployees: [], fadeIn: false})
    }
    newTest = () => {
        if(this.state.selected == 0) { //set alert  
            this.props.setAlert("error")
            this.props.setAlertMessage("Нема селектирани вработени")
            setTimeout(() => {
                this.props.setAlert("")
            }, 3000)
        } else {
            this.setState({testModal: true}, () => {
                this.props.setAlert()
                this.props.setAlertMessage("")
                this.setState({fadeIn: false})
            })
        }
    }
    emps = () => { //needed function to pass it to new employee modal, to rerender emps after adding  
        if(this.props.item.employees && this.props.item.employees.length) { //if employees in company
            this.props.item.employees.map((id) => {
                getEmployee(this.props.db, id, this.callback)
            })
        }
    }
    componentWillReceiveProps() {
        this.setState({employees: []}, () => {
            this.emps()
        })
        //     // if(this.props.item.id) { // SNAPSHOT that listens for changes in THIS company
        //     //     this.props.db.collection("companies").doc(this.props.item.id).onSnapshot((snap) => {
        //     //         if(snap.exists) {
        //     //             this.setState({employees: []}, () => {
        //     //                 snap.data().employees.map((emp, key) => {
        //     //                     getEmployee(this.props.db, emp, this.callback)
        //     //                 })
        //     //             })
                        
        //     //         }
        //     //     })
        //     // }
        // })
    }
   

    callback = (id, data) => {
        let obj = data;
        obj.id = id;
        this.setState({employees:[...this.state.employees, obj]})
    }

    countSelected = (condition) => { //if check or uncheck
        if(condition) {
            this.setState({ fadeIn: true ,selected: this.state.selected + 1})
        }
        else {
            this.setState({ fadeIn: true ,selected: this.state.selected - 1}, () => {
                if(this.state.selected === 0) {
                    this.setState({fadeIn: false})
                }
            })
           
        }
    }

    selectEmployee = (emp) => {
        this.setState({selectedEmployees: [...this.state.selectedEmployees, emp]})
    }
    
    componentDidMount() {
        this.emps()
        // if(this.props.item.id) { // SNAPSHOT that listens for changes in THIS company
        //     this.props.db.collection("companies").doc(this.props.item.id).onSnapshot((snap) => {
        //         if(snap.exists) {
        //             this.setState({employees: []}, () => {
        //                 snap.data().employees.map((emp, key) => {
        //                     getEmployee(this.props.db, emp, this.callback)
        //                 })
        //             })
                    
        //         }
        //     })
        // }

    }
    // const employeeCallback = (data) =>{
    //     setEmployees([...employees, data])
    // }
    // ids.map((id) => {
    //     getEmployee(props.db, id, employeeCallback)
    // })

    setSwitch = (value) => {
        this.setState({switchState: value})
    }
    setPrint = () => {
        this.setState({print: !this.state.print})
    }
    returnTestModal = () => {
        this.setState({testModal: !this.state.testModal}
    )}

    render() {
        let items;
        if(this.state.filteredEmployees.length === 0) {
            items = this.state.employees
        } else {
            items = this.state.filteredEmployees
        }
        return (
            <div style={style.company}>
                <div style={style.top}>
                    <h1 style={style.name}>{this.props.item.name.toUpperCase()}</h1>
                    <h1 style={style.topText}>{this.props.item.address.charAt(0).toUpperCase() + this.props.item.address.slice(1)}</h1>
                    <div style={style.chipRow}>
                        <Chip icon={<GroupAddIcon />} label={"Нов вработен"} style={style.chip} onClick={() => {this.setState({empModal:true})}}/>
                        <Chip icon={<AddToQueueIcon />} label={"Нов преглед"} style={style.chip2} onClick={(e) => { e.preventDefault();this.newTest()}}/>
                    </div>
                    <AddEmployeeModal
                        render={this.state.empModal}
                        db={this.props.db}
                        setModal={this.setModal}
                        setAlert={this.props.setAlert}
                        setAlertMessage={this.props.setAlertMessage} 
                        company={this.props.item}
                        companyId={this.props.companyId}
                        employees={this.props.item.employees}
                        setCompany={this.props.setCompany}/>
                    <TestModal 
                        render={this.state.testModal}
                        db={this.props.db}
                        setModal={this.setTestModal}
                        setFadeIn={this.setFadeIn}
                        setAlert={this.props.setAlert}
                        setAlertMessage={this.props.setAlertMessage}
                        numberOfEmployees={this.state.selected}
                        setNumber={() => {this.setState({selected: 0})}}
                        setPrint={this.setPrint}
                        returnTestModal={this.returnTestModal}
                        selectedEmployees={this.state.selectedEmployees}
                    />
                    <TextField
                    style={style.empSearch}
                    label={"филтрирај вработени"}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                        let value = e.target.value;
                        if(value !== "") {
                            const miniSearch = new MiniSearch({
                                fields: ['name', 'lastName'],
                                extractField: (id, name) => {
                                    // Access nested fields
                                    const value = name.split('.').reduce((doc, key) => doc && doc[key], id)
                                    // If field value is an array, join by space
                                    return Array.isArray(value) ? value.join(' ') : value
                            }})
                            miniSearch.addAll(this.state.employees)
                            let results = miniSearch.autoSuggest(value)
                            let array = []
                            results.map((result) => {
                                console.log(result.suggestion)
                                let suggestion = result.suggestion.toUpperCase();
                                this.state.employees.map((employee) => {
                                    if(employee.name == suggestion || employee.lastName == suggestion || `${employee.name} ${employee.lastName}` == suggestion || `${employee.lastName} ${employee.name}` == suggestion) {
                                        array.push(employee)
                                    }
                                })
                            })
                            this.setState({filteredEmployees: array})
                        } else {
                            this.setState({filteredEmployees: this.state.employees})
                        }
                
                    }}
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
                    <Generals item={this.props.item.D || this.props.item.director} description={"Управител"}/>
                    <Generals item={this.props.item.address} description={"Адреса"}/>
                    <Generals item={this.props.item.telephone} description={"Телефон"}/>
                    <Generals item={this.props.item.eMail || this.props.item.email} description={"Е-Маил"}/>
                </div>
                <SlideUp
                    fadeIn={this.state.fadeIn}
                    count={this.state.selected}
                    newTest={this.newTest}
                    db={this.props.db}
                    selectedEmployees={this.state.selectedEmployees}
                    companyId={this.props.companyId}
                    setCompany={this.props.setCompany}
                    setFadeIn={this.setFadeIn}
                    removeSelected={this.removeSelected}
                    />
               <div style={style.main}>
                   <StateNav style={style.stateNav} setSwitch={this.setSwitch} navs={this.state.navs}/>
                    {
                        (this.state.switchState === "employees") 
                        ? <Employees items={items || this.state.employees} count={this.countSelected} selectEmployee={this.selectEmployee} setRender={this.props.setRender} setEmployee={this.props.setEmployee}/> 
                        : undefined
                    }
                    {
                        (this.state.switchState === "settings")
                        ? <CompanySettings
                            item={this.props.item}
                            db={this.props.db}
                            companyId={this.props.companyId}
                            setAlert={this.props.setAlert}
                            setAlertMessage={this.props.setAlertMessage} 
                            setCompany={this.props.setCompany}
                            removeFromCompaniesJson={this.props.removeFromCompaniesJson}/>
                        : undefined
                    }
               </div>
            </div>
        )
    }
    
}

export default Company