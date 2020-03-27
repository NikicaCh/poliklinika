import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {queryCompaniesByName} from './Fetch'
import CompanySearch from './CompanySearch.js'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Search from './Search'
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MiniSearch from 'minisearch'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const style = {
    navbar: {
        position: "fixed",
        background: "white",
        width: "100vw",
        height: "6.5vh",
        zIndex: 5,
        paddingBottom: ".3%",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
    },
    searchIcon: {
        position: "absolute",
        left: "37%",
        top: "25%",
        opacity: .7
    },
    bell: {
        position: "absolute",
        left: "13%",
        top: "35%",
        opacity: .7,
        cursor: "pointer",
        color: "#999999",
    },
    backward: {
        position: "absolute",
        left: "3%",
        top: "25%",
        cursor: "pointer",
        color: "#999999",
    },
    forward: {
        position: "absolute",
        left: "6.5%",
        top: "25%",
        cursor: "pointer",
        color: "#999999",
    },
    signout: {
        position: "absolute",
        left: "95%",
        top: "35%",
        opacity: .7,
        cursor: "pointer"
    },
    results: {
        position: "absolute",
        width: "24vw",
        maxHeight: "25vh",
        left: "15%",
        top: "7vh",
        overflowY: "scroll",
        background: "#CBE3F5",
        overFlowX: "hidden",
        borderRadius: "0 0 0 10px"
    },
    button: {
        color: "#999999",
        position: "absolute",
        left: "35.5%",
        top: "25%"
    }
}



export default function Navbar(props) {

    const [companies, setCompanies] = useState([])
    const [results, setResults] = useState([])

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

    const logOut = () => {
        firebase.auth().signOut().then(function() {
            window.location.replace('/')
        }, function(error) {
            // An error happened.
          });
    }

    
    return (
        <div style={style.navbar}>
            {/* <div>
                <SearchIcon style={style.searchIcon}/>
                <div style={style.results}>
                    {
                        companies.map((company, key) => {
                            return <CompanySearch item={company} handleClick={props.setCompany}/>
                        })
                    }
                </div>
            </div> */}
            <Search searchCompany={searchCompany} setCompanies={setCompanies} companies={companies} handleClick={props.setCompany} results={results}/>
            <Button style={style.button} onClick={() => {props.home()}}><HomeIcon /></Button>
            <Button style={style.backward} onClick={() => {
                window.history.back()
            }}><ArrowBackIosIcon /></Button>
            <Button style={style.forward} onClick={() => {
                window.history.go(1)
            }}><ArrowForwardIosIcon /></Button>
            <NotificationsIcon style={style.bell} />
            <ExitToAppIcon style={style.signout} onClick={() => { logOut() }}/>
        </div>
    )
}