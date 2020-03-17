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
import PrintIcon from '@material-ui/icons/Print';
import { createTest } from './Fetch'
import Axios from 'axios'
import {saveAs} from 'file-saver'
const style = {
    test: {

    }
}



export default function TestModal(props) {
    const [open, setOpen] = React.useState(props.render);
    const [counter, setCounter] = React.useState(0) //counter for current employee, if more than 1 employee
    const [values, setValues] = React.useState([]) // use for moving from 1 employee to another, so store data before change employee
    React.useEffect(() => {
        setOpen(props.render)
    })

    const handleClose = () => {
        props.setModal(false)
    };

    const handleSubmit = () => {
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
            employeerAdvice: document.getElementById("employeerAdvice").value,
            labResults: document.getElementById("labResults").value,
            ekg: document.getElementById("ekg").value,
            additionalResults: document.getElementById("additionalResults").value,
            grade: document.getElementById("grade").value,
        }
        Object.keys(data).forEach((key) => (data[key] == "") && delete data[key]);
        createTest(props.db,
            data,
            props.setAlert,
            props.setAlertMessage,
            setOpen)
    }

    const sendData = (value) => {
        let data = props.selectedEmployees[counter];
        let body = {
            name: data.name,
            lastName: data.lastName,
            age: data.age,
            education: data.education,
            position: data.position
        }
        Axios.post(`https://poliklinika-server.herokuapp.com/create-${value}-pdf`, {body})
            .then(() => Axios.get("https://poliklinika-server.herokuapp.com/fetch-pdf", {responseType: "blob"})) //WE CALL THEN SINCE WE HAVE PROMISE.RESOLVE() in server.
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: "application/pdf"})
                // saveAs(pdfBlob, "newPdf.pdf")
                let url = URL.createObjectURL(pdfBlob);
                window.open(url,'_blank')
            
            })
    }


    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        modal: {
          width: "100%",
          height: "100%"
        }
      }));
    
      const classes = useStyles()
    return (
        <div style={style.test}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
                <DialogTitle id="form-dialog-title">Систематски Преглед</DialogTitle>
                    <DialogContent >
                        <Typography variant={"subtitle1"} align={"right"}>{`Број на вработени: ${props.numberOfEmployees}`}</Typography>
                        {
                            (props.numberOfEmployees > 1) 
                            ? <Typography variant={"subtitle1"} align={"right"}>{`Вработен бр.: ${counter +1}`}</Typography> // +1 because of 0-index of selected employees
                            : undefined
                        }
                        
                        <TextField
                            className={classes.paper}
                            autoFocus
                            id="doctor"
                            placeholder="др."
                            required={true}
                            variant={"outlined"}
                            label="Одговорен лекар"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
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
                            className={classes.paper}
                            id="history"
                            placeholder=""
                            variant={"outlined"}
                            fullWidth={true}
                            label="Минати заболувања"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="now"
                            placeholder=""
                            variant={"outlined"}
                            fullWidth={true}
                            label="Сегашно заболувања"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="familyHistory"
                            placeholder="НЕГИРА"
                            required={true}
                            variant={"outlined"}
                            label="Фамилијарна Анамнеза"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="workHistory"
                            placeholder=""
                            required={true}
                            variant={"outlined"}
                            label="Работна Анамнеза"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="professionalHistory"
                            placeholder=""
                            fullWidth={true}
                            variant={"outlined"}
                            label="Професионални заболувања"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="workInjury"
                            placeholder=""
                            fullWidth={true}
                            variant={"outlined"}
                            label="Повреда на работа"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="headNeck"
                            placeholder=""
                            variant={"outlined"}
                            label="Глава и врат"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="bloodPressure"
                            placeholder=""
                            variant={"outlined"}
                            label="Крвен притисок"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="heart"
                            placeholder=""
                            variant={"outlined"}
                            label="КВ систем-Срце"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="lungs"
                            placeholder=""
                            variant={"outlined"}
                            label="Бели дробови"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="abdomen"
                            placeholder=""
                            variant={"outlined"}
                            label="Абдомен"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="extremities"
                            placeholder=""
                            variant={"outlined"}
                            label="Екстремитети"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="kidney"
                            placeholder=""
                            variant={"outlined"}
                            label="Урогенитален систем"
                            type="text"
                        />
                        <p />
                        <Typography variant={"h6"} align={"left"}>{"Вид:"}</Typography>
                        <p />
                        <Typography variant={"subtitle1"} align={"left"}>{"Лево око:"}</Typography>
                        <Typography variant={"subtitle1"} align={"center"}>{"Десно око:"}</Typography>
                        <p />
                        <Typography variant={"h6"} align={"left"}>{"Патолошка состојба:"}</Typography>
                        <p />
                        <TextField
                            className={classes.paper}
                            id="patologicalState"
                            placeholder=""
                            fullWidth={true}
                            variant={"outlined"}
                            label="Патолошка состојба"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="employeeAdvice"
                            placeholder=""
                            fullWidth={true}
                            variant={"outlined"}
                            label="Препорака за вработениот"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="employeerAdvice"
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
                            className={classes.paper}
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
                            className={classes.paper}
                            id="ekg"
                            placeholder=""
                            fullWidth={true}
                            variant={"outlined"}
                            label="ЕКГ Наоди"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="additionalResults"
                            placeholder=""
                            variant={"outlined"}
                            label="Дополнителен наод"
                            type="text"
                        />
                        <TextField
                            className={classes.paper}
                            id="grade"
                            placeholder=""
                            variant={"outlined"}
                            label="Оценка"
                            type="text"
                        />
                        <p />
                        <p />
                        <TestRadios />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => {
                            // props.setPrint()
                            sendData("employee")
                    }} color="primary" startIcon={<PrintIcon />}>
                                Печати експертиза
                    </Button>
                    <Button onClick={() => {
                            sendData("company")
                    }} color="primary" startIcon={<PrintIcon />}>
                                Печати извештај за работодавачот
                    </Button>
                    </DialogActions>
                    <DialogActions>
                    {
                        (props.numberOfEmployees > 1) 
                        ?<Button onClick={() => setCounter(counter - 1)} color="primary" disabled={(!counter > 0) }>
                            Претходен вработен
                        </Button>
                        : undefined
                    }
                    
                    <Button onClick={handleClose} color="primary">
                        Затвори
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Зачувај
                    </Button>
                    {
                        (props.numberOfEmployees > 1) 
                        ?   <Button onClick={() => setCounter(counter + 1)} color="primary" disabled={(!(counter < props.numberOfEmployees-1)) }>
                                Следен вработен
                            </Button>
                        : undefined
                    }                   
                    </DialogActions>
            </Dialog>
        </div>
    )
}