import React from 'react'
import Navbar from './Navbar'
import firebase from 'firebase'
import LeftNav from './LeftNav'
import Main from './Main'
import AlertSnack from './AlertSnack'
import addCompanies from './addCompanies'
import Axios from 'axios'


const style= {
    home: {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        overflowY: "hidden",
        background: "#F3F3F3",
        overflow: "hidden"
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: [],
            companyId: "",
            render: "main",
            alert: "",
            alertMessage: "",
            companiesData: [],
            employee: {},
            recent: []
        }
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.home = this.home.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.setAlert = this.setAlert.bind(this)
        this.setAlertMessage = this.setAlertMessage.bind(this)
        this.setRender = this.setRender.bind(this)
        this.setEmployee = this.setEmployee.bind(this)
        this.pushToHistoryObject = this.pushToHistoryObject.bind(this)
        this.getCompaniesRequest = this.getCompaniesRequest.bind(this)
        this.addDataToCompaniesJson = this.addDataToCompaniesJson.bind(this)
        this.setRecentSearches = this.setRecentSearches.bind(this)
        this.removeFromCompaniesJson = this.removeFromCompaniesJson.bind(this)
        this.getRecentSearches = this.getRecentSearches.bind(this)
    }

    
    async getCompaniesRequest()  {
        const cache = localStorage.getItem("companies");
        if(cache) {
            this.setState({companiesData: JSON.parse(cache)})
        } else {
            const snapshot = await firebase.firestore().collection('companies').get()
            let arrayOfCompanies = []
            return snapshot.docs.map(doc => {
                let obj = doc.data()
                obj.id = doc.id
                arrayOfCompanies.push(obj)
                this.setState({companiesData: arrayOfCompanies}, () => {
                    localStorage.setItem("companies", JSON.stringify(this.state.companiesData));
                })
            });
        }
        

        window.onpopstate = function (event) {
            if (event.state) { 
              let state = event.state; 
            }
            // render(state);
            if(event.state !== undefined) {
                this.setState({render: event.state.render})
            }
          }.bind(this);
    }

    addDataToCompaniesJson = (data) => { // call when adding new company, it will call getCompaniesRequest func when promise resolves
        const cache = localStorage.getItem("companies");
        if(cache) {
            let array = this.state.companiesData;
            array.push(data)
            this.setState({companiesData: array}, () => {
                localStorage.setItem("companies", JSON.stringify(this.state.companiesData));
            })
        }

    }

    removeFromCompaniesJson = (id) => {
        const cache = localStorage.getItem("companies"); //remove from companies 
        if(cache) {
            let array = []
            this.state.companiesData.map((company) => {
                if(company.id !== id) {
                    array.push(company)
                }
                this.setState({companiesData: array}, () => {
                    localStorage.setItem("companies", JSON.stringify(this.state.companiesData));
                })
            })
        }
        const cacheRecent = localStorage.getItem("recent"); //remove from recent
        if(cacheRecent) {
            let array = []
            this.state.recent.map((company) => {
                if(company.id !== id) {
                    array.push(company)
                }
                this.setState({recent: array}, () => {
                    localStorage.setItem("recent", JSON.stringify(this.state.recent));
                })
            })
        }
    }
    setRecentSearches = (item) => {
       const cache = localStorage.getItem("recent")
       let array = []
       if(cache && cache.length) {
           JSON.parse(cache).map((company) => {
               if(company.id != item.id) {
                    array.push(company)
               }
           })
       } 
       array.push(item)
           this.setState({recent: array}, () => {
            localStorage.setItem("recent", JSON.stringify(this.state.recent))
           })
    }
    getRecentSearches = () => {
        const cache = localStorage.getItem("recent")
        if(cache) {
            this.setState({recent: JSON.parse(cache)})
        } else {
            this.setState({recent: []})
        }
    }
    

    componentDidMount () {
        window.history.replaceState(this.state, null, "");
        this.getCompaniesRequest()
        this.getRecentSearches()
        setTimeout(() => {
            Axios.post("https://poliklinika.herokuapp.com/getCompanies")
        },1000)
        setInterval(() => {
            Axios.post("https://poliklinika.herokuapp.com/getCompanies")
        }, 300000)
    }


    pushToHistoryObject = () => {
        window.history.pushState(this.state, null, "")
    }

    
    handleSearchClick = (item) => {
        this.state.companiesData.map((company) => {
            if(company.id === item) {
                this.setState({company: company, render: "company", companyId: company.id}, () => {
                    this.pushToHistoryObject()
                    this.setRecentSearches(this.state.company)
                })
                
            }
            
        })
        if(item === "home") {
            this.setState({render: "main"})
        }
    }

    closeAlert = () => {
        this.setState({alert:"", setAlertMessage: "[]"})
    }

    home = () => {
        this.setState({render:"main", company: []})
    }

    handleClick = () => { // delete when done ...................................................................................................................
        addCompanies(this.props.db)
    }
    setAlert = (value) => {
        this.setState({alert: value})
    }
    setAlertMessage = (value) => {
        this.setState({alertMessage: value})
    }

    setRender = (value, employee) => {
        this.setState({render: value}, () => {
            this.pushToHistoryObject()
        })
    }
    setEmployee = (employee) => {
        this.setState({employee})
    }
    render() {
        return (
            <div style={style.home}>
                {/* <button onClick={this.handleClick}>CLICK HERE</button> */}
                <AlertSnack alert={this.state.alert} alertMessage={this.state.alertMessage} closeAlert={this.closeAlert} setAlert={this.setAlert}/>
                <Navbar db={this.props.db} setCompany={this.handleSearchClick} home={this.home} companiesData={this.state.companiesData} setRender={this.setRender}/>
                <LeftNav 
                    db={this.props.db}
                    addDataToCompaniesJson={this.addDataToCompaniesJson}
                    setAlert={this.setAlert}
                    setAlertMessage={this.setAlertMessage}
                    recent={this.state.recent}
                    setCompany={this.handleSearchClick}/>
                <Main
                    db={this.props.db}
                    render={this.state.render}
                    item={this.state.company}
                    companyId={this.state.companyId}
                    setAlert={this.setAlert}
                    setAlertMessage={this.setAlertMessage} 
                    setRender={this.setRender}
                    setEmployee={this.setEmployee}
                    employee={this.state.employee}
                    companiesData={this.state.companiesData}
                    setCompany={this.handleSearchClick}
                    removeFromCompaniesJson={this.removeFromCompaniesJson}
                    getCompaniesRequest={this.getCompaniesRequest}/>
            </div>
        )
    }
    
}


export default Home;