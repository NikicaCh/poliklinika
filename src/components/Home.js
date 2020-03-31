import React from 'react'
import Navbar from './Navbar'
import firebase from 'firebase'
import LeftNav from './LeftNav'
import Main from './Main'
import AlertSnack from './AlertSnack'
import addCompanies from './addCompanies'
import Axios from 'axios'


let dev = "http://localhost:5000"
let prod = "https://poliklinika.herokuapp.com"

let env = prod;


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
    }

    
    async getCompaniesRequest()  {
        // Axios.post(`${env}/getCompanies`, {pass: "hello"})
        // .then(() => {
        //     Axios.get(`${env}/getData`)
        //     .then(data => this.setState({companiesData: data.data}))
        // })

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
                console.log(event.state)
            }
          }.bind(this);
    }

    addDataToCompaniesJson = (data) => { // call when adding new company, it will call getCompaniesRequest func when promise resolves
        // Axios.post(`${env}/updateCompanies`, {body: data})
        // .then(() => {
        //     this.getCompaniesRequest()
        // })

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
        const cache = localStorage.getItem("companies");
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
        // Axios.post(`${env}/removeCompany`, {body: data})
        // .then(() => {
        //     this.getCompaniesRequest()
        // })
        // Axios.post(`${env}/remove-recent`, {body: data})
        // .then(() => {
        //     Axios.get(`${env}/recent-searches`)
        //     .then(data => this.setState({recent: data.data}))
        // })
    }

    componentDidMount () {
        window.history.replaceState(this.state, null, "");
        this.getCompaniesRequest()
        Axios.get(`${env}/recent-searches`)
        .then(data => this.setState({recent: data.data}))
    }


    pushToHistoryObject = () => {
        window.history.pushState(this.state, null, "")
    }

    setRecentSearches = (name, id) => {
        let data = {}
        data.name = name;
        data.id = id;
        let pos = this.state.recent.map((e) => { return e.id; }).indexOf(id); //check if company is already in list, so don't add it again
        if(pos === -1) {
            Axios.post(`${env}/recent-searches`, {body: data})
            .then(() => {
                Axios.get(`${env}/recent-searches`)
                .then(data => this.setState({recent: data.data}))
            })
        }
    }
    
    
    handleSearchClick = (item) => {
        this.state.companiesData.map((company) => {
            if(company.id === item) {
                this.setState({company: company, render: "company", companyId: company.id})
                this.pushToHistoryObject()
                this.setRecentSearches(company.name, company.id)
            }
            
        })
        // setCompany(item)
        // setRender("company")
        // let data = props.selectedEmployees[counter];
        
    }

    closeAlert = () => {
        this.setState({alert:"", setAlertMessage: "[]"})
    }

    home = () => {
        this.setState({render:"main", company: []})
    }

    handleClick = () => {
        addCompanies(this.props.db)

        // this.setState({render:"employee"})

        // let body = {
        //     name: "PERO",
        //     lastName: "Maksimovski",
        //     age: 25,
        //     education: "SSS",
        //     position: "S"
        // }
        // Axios.post("https://poliklinika-server.herokuapp.com/create-pdf", {body})
        //     .then(() => Axios.get("https://poliklinika-server.herokuapp.com/fetch-pdf", {responseType: "blob"})) //WE CALL THEN SINCE WE HAVE PROMISE.RESOLVE() in server.
        //     .then((res) => {
        //         const pdfBlob = new Blob([res.data], {type: "application/pdf"})
        //         // saveAs(pdfBlob, "newPdf.pdf")
        //         let url = URL.createObjectURL(pdfBlob);
        //         window.open(url,'_blank')      
        //     })


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
                    removeFromCompaniesJson={this.removeFromCompaniesJson}/>
            </div>
        )
    }
    
}


export default Home;