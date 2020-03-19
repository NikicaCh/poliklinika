import React from 'react'
import Navbar from './Navbar'
import firebase from 'firebase'
import LeftNav from './LeftNav'
import Main from './Main'
import AlertSnack from './AlertSnack'
import addCompanies from './addCompanies'
import Axios from 'axios'


let dev = "http://localhost:5000"
let prod = "https://poliklinika-server.herokuapp.com"

let env = dev;


const style= {
    home: {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        overflowY: "hidden",
        background: "#F3F3F3"
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: [],
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
    }

    
    getCompaniesRequest = () => {
        Axios.post(`${env}/getCompanies`, {pass: "hello"})
        .then(() => {
            Axios.get(`${env}/getData`)
            .then(data => this.setState({companiesData: data.data}))
        })

        window.onpopstate = function (event) {
            if (event.state) { 
              let state = event.state; 
            }
            // render(state); // See example render function in summary below
            if(event.state !== undefined) {
                this.setState({render: event.state.render})
                console.log(event.state)
            }
          }.bind(this);
    }

    addDataToCompaniesJson = (data) => { // call when adding new company, it will call getCompaniesRequest func when promise resolves
        Axios.post(`${env}/updateCompanies", {body: data}`)
        .then(() => {
            this.getCompaniesRequest()
        })
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
        Axios.post(`${env}/recent-searches`, {body: data})
        .then(() => {
            Axios.get(`${env}/recent-searches`)
            .then(data => this.setState({recent: data.data}))
        })
    }
    
    
    handleSearchClick = (item) => {
        const docRef = this.props.db.collection("companies").doc(item)
        docRef.get()
        .then((doc) => {
            if(doc.exists) {
                this.setState({company: doc.data(), render: "company"})
                this.pushToHistoryObject()
                this.setRecentSearches(doc.data().name, item)
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
        // addCompanies(this.props.db)

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
                    setAlert={this.setAlert}
                    setAlertMessage={this.setAlertMessage} 
                    setRender={this.setRender}
                    setEmployee={this.setEmployee}
                    employee={this.state.employee}
                    companiesData={this.state.companiesData}
                    setCompany={this.handleSearchClick}/>
            </div>
        )
    }
    
}


export default Home;