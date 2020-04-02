import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'

import {createEmployee} from './Fetch'


export default function AddEmployeeModal(props) {
  const [open, setOpen] = React.useState(props.render);

  React.useEffect(() => {
    setOpen(props.render)
  })

  const handleClose = () => {
    props.setModal(false)
  };
  
  const handleSubmit = () => {
    const removeFalsy = (obj) => {
      let newObj = {};
      Object.keys(obj).forEach((prop) => {
        if (obj[prop]) { newObj[prop] = obj[prop]; }
      });
      return newObj;
    };
    //validation first
    let data = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value.toUpperCase(),
        lastName: document.getElementById("lastName").value.toUpperCase(),
        age: document.getElementById("age").value,
        address: document.getElementById("address").value.toUpperCase(),
        education: document.getElementById("education").value.toUpperCase(),
        position: document.getElementById("position").value.toUpperCase(),
        work: document.getElementById("work").value,
        family: document.getElementById("family").value.toUpperCase(),
        company: props.companyId //not storing it as a ref for now, change if neccesery
    }
    if(data.id === undefined || data.id === "" || data.name === undefined || data.name === "" || data.lastName === undefined || data.lastName === "" || data.position === undefined || data.position === "") {
          props.setAlertMessage("Недостасуваат податоци")
          props.setAlert("error")
          setOpen(false)
    } else {
      let newData = removeFalsy(data) //remove empty strings 
    
      let docRef = props.db.collection("employees").doc(newData.id);
          docRef.get().then(function(doc) {
          if (doc.exists) {
              props.setAlertMessage("Вработен со тој ЕМБГ веќе постои во системот")
              props.setAlert("error")
              setOpen(false)
          } else {
              props.db.collection('employees').doc(newData.id).set(newData);
              let company = props.db.collection("companies").doc(props.companyId)
              company.update({
                  employees: firebase.firestore.FieldValue.arrayUnion(newData.id)
              })
              .then((res) => {
                let cache = localStorage.getItem("companies")
                props.db.collection('companies').doc(props.companyId).get() // get the company and add it to cache
                .then((doc) => {
                  let array = []
                  JSON.parse(cache).map((company) => {
                    if(company.id !== newData.companyId) {
                      array.push(company)
                    }
                  })
                  array.push(doc.data())
                  localStorage.setItem("companies", JSON.stringify(array))
                })
                props.setAlertMessage("Успешно додадовте вработен.")
                props.setAlert("success")
                props.setCompany(props.companyId)
                props.setModal(false)
                
              })
              .catch((err) => console.log(err))
             
          }
      })
      .catch(function(error) {
        console.log(error);
      });    
    }    
    
  }


  const max = new Date().getFullYear()


  const inputProps={
    year: {
        min: 1900,
        max: max, 
    },
    work: {
      min: 0,
      max: 50
    },
    embg: {
        min: 0,
        max: 3112999999999
    }
    
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
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
        <DialogTitle id="form-dialog-title">Нов Вработен</DialogTitle>
        <DialogContent >
          <TextField
            className={classes.paper}
            autoFocus
            id="name"
            placeholder="Петко"
            required={true}
            variant={"outlined"}
            label="Име"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="lastName"
            placeholder="Петковски"
            required={true}
            variant={"outlined"}
            label="Презиме"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="age"
            placeholder="1980"
            required={true}
            variant={"outlined"}
            label="Година"
            type="number"
            inputProps={inputProps.year}
          />
          <TextField
            className={classes.paper}
            id="id"
            placeholder="0101990420000"
            required={true}
            variant={"outlined"}
            label="Матичен број"
            type="number"
          />
          <TextField
            className={classes.paper}
            id="address"
            required={true}
            variant={"outlined"}
            label="Адреса"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="education"
            required={true}
            variant={"outlined"}
            label="Образование"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="position"
            required={true}
            variant={"outlined"}
            label="Позиција"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="family"
            required={true}
            variant={"outlined"}
            label="Фам.Анамнеза"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="work"
            required={true}
            variant={"outlined"}
            label="Раб.анам.(г)"
            type="number"
            inputProps={inputProps.work}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Затвори
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Креирај нов вработен
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}