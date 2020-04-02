import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import TestRadios from './TestRadios'
import Checkbox from '@material-ui/core/Checkbox';
import PrintIcon from '@material-ui/icons/Print';
import { createTest } from './Fetch'
import Axios from 'axios'
import {saveAs} from 'file-saver'
let randomstring = require("randomstring");

const style = {
    root: {
        flexGrow: 1,
      },
    paper: {
    padding: "1%",
    textAlign: 'center',
    }
}


class TestModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            counter: 0,
            values: [],
            unfinishedTests: [],
            radio1: 0,
            radio2: 0,
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.sendData = this.sendData.bind(this)
        this.nextTest = this.nextTest.bind(this)
        this.setRadios = this.setRadios.bind(this)
    }

    componentWillReceiveProps() {
        this.setState({open: this.props.render})
    }
    

    handleClose = () => {
        this.props.setModal()
        if(!this.props.format) this.props.setFadeIn() // if called from company and not from employee

    };
     
    setRadios = (value1, value2) => {
        this.setState({radio1: value1, radio2: value2})
    }

    nextTest = (condition) => {
        this.setState({radio1: 0, radio2: 0})
        let data = {//expand
            id: document.getElementById("number").value, 
            doctor: document.getElementById("doctor").value,
            history: document.getElementById("history").value,
            now: document.getElementById("now").value,
            familyHistory: document.getElementById("familyHistory").value,
            workHistory: document.getElementById("workHistory").value,
            professionalHistory: document.getElementById("professionalHistory").value,
            workInjury: document.getElementById("workInjury").value,
            headNeck: document.getElementById("headNeck").value,
            bloodPressure: document.getElementById("bloodPressure").value,
            heart: document.getElementById("heart").value,
            lungs: document.getElementById("lungs").value,
            abdomen: document.getElementById("abdomen").value,
            extremities: document.getElementById("extremities").value,
            kidney: document.getElementById("kidney").value,
            patologicalState: document.getElementById("patologicalState").value,
            employeeAdvice: document.getElementById("employeeAdvice").value,
            employeerAdvice: document.getElementById("employerAdvice").value,
            labResults: document.getElementById("labResults").value,
            ekg: document.getElementById("ekg").value,
            additionalResults: document.getElementById("additionalResults").value,
            grade: document.getElementById("grade").value,
        }
        if(condition) {
            this.setState({counter: this.state.counter + 1})
            this.setState({unfinishedTests:[...this.state.unfinishedTests, data]})  
        } else {
            this.setState({counter: this.state.counter - 1})
            this.setState({unfinishedTests:[...this.state.unfinishedTests, data]})
        }
    }

    handleSubmit = () => {
        let id = randomstring.generate(48)
        let date = new Date()
        date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}` // today's date formated
        let data = {//expand
            id: id,
            id2: document.getElementById("number").value, // broj vo karton
            date: date,
            doctor: document.getElementById("doctor").value,
            history: document.getElementById("history").value,
            now: document.getElementById("now").value,
            familyHistory: document.getElementById("familyHistory").value,
            workHistory: document.getElementById("workHistory").value,
            professionalHistory: document.getElementById("professionalHistory").value,
            workInjury: document.getElementById("workInjury").value,
            headNeck: document.getElementById("headNeck").value,
            bloodPressure: document.getElementById("bloodPressure").value,
            heart: document.getElementById("heart").value,
            lungs: document.getElementById("lungs").value,
            abdomen: document.getElementById("abdomen").value,
            extremities: document.getElementById("extremities").value,
            kidney: document.getElementById("kidney").value,
            patologicalState: document.getElementById("patologicalState").value,
            employeeAdvice: document.getElementById("employeeAdvice").value,
            employeerAdvice: document.getElementById("employerAdvice").value,
            labResults: document.getElementById("labResults").value,
            ekg: document.getElementById("ekg").value,
            additionalResults: document.getElementById("additionalResults").value,
            grade: document.getElementById("grade").value,
            radio1: this.state.radio1,
            radio2: this.state.radio2
        }
        Object.keys(data).forEach((key) => (data[key] == "") && delete data[key]); //removing empty strings
        let empId
        if(!this.props.format) {
            empId = this.props.selectedEmployees[this.state.counter].id
        } else {
            empId = this.props.employee.id
        }
        createTest(this.props.db,
            data,
            empId,
            this.props.setAlert,
            this.props.setAlertMessage,
            )
    }

    sendData = (value) => {
        let data = this.props.selectedEmployees[this.state.counter] || this.props.employee
        this.setState({body: {}})
        let date = new Date()
        date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}` // today's date formated
        let obj = {
            name: data.name,
            lastName: data.lastName,
            age: data.age,
            education: data.education,
            position: data.position,
            radio1: this.state.radio1,
            radio2: this.state.radio2,
            id: document.getElementById("number").value,
            date: date
        }
        this.setState({body: obj}, () => {
            let body = this.state.body
            if(value === "employee") {
                Axios.post(`https://poliklinika.herokuapp.com/create-employee-pdf`, {body})
                .then(() => Axios.get("https://poliklinika.herokuapp.com/fetch-pdf", {responseType: "blob"})) //WE CALL ".THEN" SINCE WE HAVE PROMISE.RESOLVE() in server.
                .then((res) => {
                    const pdfBlob = new Blob([res.data], {type: "application/pdf"})
                    // saveAs(pdfBlob, "newPdf.pdf")
                    let url = URL.createObjectURL(pdfBlob);
                    window.open(url,'_blank')
                })
            } else {
                Axios.post(`https://poliklinika.herokuapp.com/company-pdf`, {body})
                .then(() => Axios.get("https://poliklinika.herokuapp.com/fetch-pdf", {responseType: "blob"})) //WE CALL ".THEN" SINCE WE HAVE PROMISE.RESOLVE() in server.
                .then((res) => {
                    const pdfBlob = new Blob([res.data], {type: "application/pdf"})
                    // saveAs(pdfBlob, "newPdf.pdf")
                    let url = URL.createObjectURL(pdfBlob);
                    window.open(url,'_blank')
                })
            }
        })
        
    }


    
      
      render() {
        return (
            <div style={style.test}>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
                    <DialogTitle id="form-dialog-title">Систематски Преглед</DialogTitle>
                        <DialogContent >
                            <Typography variant={"subtitle1"} align={"right"}>{`Број на вработени: ${this.props.numberOfEmployees}`}</Typography>
                            {
                                (this.props.numberOfEmployees > 1) 
                                ? <Typography variant={"subtitle1"} align={"right"}>{`Вработен бр.: ${this.state.counter +1}`}</Typography> // +1 because of 0-index of selected employees
                                : undefined
                            }
                            
                            <TextField
                                style={style.paper}
                                autoFocus
                                id="doctor"
                                placeholder="др."
                                required={true}
                                variant={"outlined"}
                                label="Одговорен лекар"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="number"
                                placeholder=""
                                required={true}
                                variant={"outlined"}
                                label="број во Дневник"
                                type="number"
                            />
                            <p />
                            <Typography variant={"h6"} align={"left"}>{"Лична Анамнеза:"}</Typography>
                            <p />
                            <TextField
                                style={style.paper}
                                id="history"
                                placeholder=""
                                variant={"outlined"}
                                fullWidth={true}
                                label="Минати заболувања"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="now"
                                placeholder=""
                                variant={"outlined"}
                                fullWidth={true}
                                label="Сегашно заболувања"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="familyHistory"
                                placeholder="НЕГИРА"
                                required={true}
                                variant={"outlined"}
                                label="Фамилијарна Анамнеза"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="workHistory"
                                placeholder=""
                                required={true}
                                variant={"outlined"}
                                label="Работна Анамнеза"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="professionalHistory"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Професионални заболувања"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="workInjury"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Повреда на работа"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="headNeck"
                                placeholder=""
                                variant={"outlined"}
                                label="Глава и врат"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="bloodPressure"
                                placeholder=""
                                variant={"outlined"}
                                label="Крвен притисок"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="heart"
                                placeholder=""
                                variant={"outlined"}
                                label="КВ систем-Срце"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="lungs"
                                placeholder=""
                                variant={"outlined"}
                                label="Бели дробови"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="abdomen"
                                placeholder=""
                                variant={"outlined"}
                                label="Абдомен"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="extremities"
                                placeholder=""
                                variant={"outlined"}
                                label="Екстремитети"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="kidney"
                                placeholder=""
                                variant={"outlined"}
                                label="Урогенитален систем"
                                type="text"
                            />
                            <p />
                            <Typography variant={"h6"} align={"left"}>{"Вид:"}</Typography>
                            <p />
                            <TextField
                                style={style.paper}
                                id="leftEye1"
                                placeholder=""
                                variant={"outlined"}
                                label="Лево око без корокција"
                                type="text"
                                />
                            <TextField
                                style={style.paper}
                                id="leftEye2"
                                placeholder=""
                                variant={"outlined"}
                                label="Лево око со корекција"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="rightEye1"
                                placeholder=""
                                variant={"outlined"}
                                label="Десно око без корокција"
                                type="text"
                                />
                            <TextField
                                style={style.paper}
                                id="rightEye2"
                                placeholder=""
                                variant={"outlined"}
                                label="Десно око со корекција"
                                type="text"
                            />
                            <p>Распознава бои:</p>
                            <Checkbox
                                id="colors"
                                edge="end"
                                label="Распознава бои"
                            />
                            <p />
                            <Typography variant={"h6"} align={"left"}>{"Патолошка состојба:"}</Typography>
                            <p />
                            <TextField
                                style={style.paper}
                                id="patologicalState"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Патолошка состојба"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="employeeAdvice"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Препорака за вработениот"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="employerAdvice"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Препорака за работодавачот"
                                type="text"
                            />
                            <p />
                            <Typography variant={"h6"} align={"left"}>{"Лабораториски наоди:"}</Typography>
                            <p />
                            <TextField
                                style={style.paper}
                                id="labResults"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="Лабораториски наоди"
                                type="text"
                            />
                            <p />
                            <p />
                            <TextField
                                style={style.paper}
                                id="ekg"
                                placeholder=""
                                fullWidth={true}
                                variant={"outlined"}
                                label="ЕКГ Наоди"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="additionalResults"
                                placeholder=""
                                variant={"outlined"}
                                label="Дополнителен наод"
                                type="text"
                            />
                            <TextField
                                style={style.paper}
                                id="grade"
                                placeholder=""
                                variant={"outlined"}
                                label="Оценка"
                                type="text"
                            />
                            <p />
                            <p />
                            <TestRadios setRadios={this.setRadios}/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => {
                                // props.setPrint()
                                this.sendData("employee")
                        }} color="primary" startIcon={<PrintIcon />}>
                                    Печати експертиза
                        </Button>
                        <Button onClick={() => {
                                this.sendData("company")
                        }} color="primary" startIcon={<PrintIcon />}>
                                    Печати извештај за работодавачот
                        </Button>
                        </DialogActions>
                        <DialogActions>
                        {
                            (this.props.numberOfEmployees > 1) 
                            ?<Button onClick={() => this.nextTest(false)} color="primary" disabled={(!this.state.counter > 0) }>
                                Претходен вработен
                            </Button>
                            : undefined
                        }
                        
                        <Button onClick={this.handleClose} color="primary">
                            Затвори
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Зачувај
                        </Button>
                        {
                            (this.props.numberOfEmployees > 1) 
                            ?   <Button onClick={() => this.nextTest(true)} color="primary" disabled={(!(this.state.counter < this.props.numberOfEmployees-1)) }>
                                    Следен вработен
                                </Button>
                            : undefined
                        }                   
                        </DialogActions>
                </Dialog>
            </div>
        )
      }
}

export default TestModal