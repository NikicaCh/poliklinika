import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';



const style = {
    position: "absolute",
    width: "20vw",
    height: "100%",
    top: "-15%",
    left: "15%",
    outline: "none",
    fontSize: ".8vw",
    fontFamily: "Cuprum",
    color: "#585958",
}

export default function Search(props) {

    // const [results, setResults] = useState([])

    const handleSearch = (e) => {
        const value = e.target.value;
        if(value !== "") {
            if(typeof value === "string") { //if querying by company or employee name
                props.searchCompany(value)
            } else { //if querying by employee id
        
            }
        } else {
            props.setCompanies([])
        }
        
    }
    

    let results = props.results.map((company, key) => {
        return {item: company,
                title: company.name,
                id: company.id}
        })
    const handleSelect = (e, value) => {
        console.log(results)
        results.forEach((res) => {
            if(res.title == value) {
                props.handleClick(res.id)
            }
        })
    }

    

    return (
        <div style={props.style || style}>
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            onInputChange={(e, value) => {
                handleSelect(e, value)
            }}
            options={results.map(option => option.title)}
            renderInput={params => (
                <TextField
                    {...params}
                    label={props.title || "search"}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {handleSearch(e)}}
                    />
            
            )}
        />
        </div>
    )
}

