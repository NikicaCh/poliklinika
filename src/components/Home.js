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
            companiesData: []
        }
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.home = this.home.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.setAlert = this.setAlert.bind(this)
        this.setAlertMessage = this.setAlertMessage.bind(this)
    }

    componentDidMount () {
        Axios.post("https://poliklinika-server.herokuapp.com/getCompanies", {pass: "hello"})
        .then(() => {
            Axios.get("https://poliklinika-server.herokuapp.com/getData")
            .then(data => this.setState({companiesData: data.data}))
        })
    }


    
    
    handleSearchClick = (item) => {
        const docRef = this.props.db.collection("companies").doc(item)
        docRef.get()
        .then((doc) => {
            if(doc.exists) {
                this.setState({company: doc.data(), render: "company"})
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

    render() {
        return (
            <div style={style.home}>
                <button onClick={this.handleClick}>CLICK HERE</button>
                <AlertSnack alert={this.state.alert} alertMessage={this.state.alertMessage} closeAlert={this.closeAlert} setAlert={this.setAlert}/>
                <Navbar db={this.props.db} setCompany={this.handleSearchClick} home={this.home} companiesData={this.state.companiesData}/>
                <LeftNav/>
                <Main
                    db={this.props.db}
                    render={this.state.render}
                    item={this.state.company}
                    setAlert={this.setAlert}
                    setAlertMessage={this.setAlertMessage} />
            </div>
        )
    }
    
}


export default Home;