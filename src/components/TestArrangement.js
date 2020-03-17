import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import TimeAndDate from './TimeAndDate'
import Search from './Search'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MiniSearch from 'minisearch'
import { makeStyles } from '@material-ui/core/styles';
import {addTestArrangement} from './Fetch'

let randomstring = require("randomstring");






export default function TestArrangement(props) {

    const [results, setResults] = useState([])
    const [companyId, setId] = useState()
    const [randomId, setRandomId] = useState(randomstring.generate(32))

    const searchCompany = (value) => {
        if(value !== "") {
            const miniSearch = new MiniSearch({
                fields: ['name'],
                storeFields: ['id','name']
            })
            miniSearch.addAll(props.companiesData)
            let results = miniSearch.search(value)
            setResults(results)
        } else {
            setResults([])
        }


        // queryCompaniesByName(props.db, value, setCompanies);
    }
    const setCompanies = (company) => {
        setId(company)
    }

    const style = {
        position: "relative",
        width: "20vw",
        height: "100%",
        marginLeft: "10%",
        outline: "none",
        fontSize: ".8vw",
        fontFamily: "Cuprum",
        color: "#585958",
    }
    const inputProps={
        number: {
            min: 0,
            max: 1000, 
        }
      }
    
      const useStyles = makeStyles(theme => ({
        paper: {
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
          width: "20%",
          marginLeft: "9.3%"
        },
      }));
    
      const classes = useStyles()
    
      const save = () => {
        let data = {
            companyId: companyId,
            numberOfEmployees: document.getElementById("number").value,
            date: document.getElementById("date").value,
            start: document.getElementById("time-start").value,
            end: document.getElementById("time-end").value,
        }
        addTestArrangement(props.db, randomId, data)
    }

    return (
        
        <div>
            <Dialog open={props.render} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
                <DialogTitle id="form-dialog-title">Закажи систематски преглед</DialogTitle> 
                <DialogContent>
                    <Search searchCompany={searchCompany} setCompanies={setCompanies} handleClick={setCompanies} results={results} title={"Пребарувај фирми"} style={style}/>
                        <TextField
                            className={classes.paper}
                            id="number"
                            placeholder="1"
                            required={true}
                            variant={"outlined"}
                            label="број на вработени"
                            type="number"
                            inputProps={inputProps.number}
                        />
                    <TimeAndDate /> 
                </ DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                            // props.setPrint()
                            save()
                            }} color="primary">
                                Закажи систематски
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}