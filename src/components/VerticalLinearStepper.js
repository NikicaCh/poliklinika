import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios'

const style = {
  root: {
    width: '80%',
    marginTop: "5%"
  },
  actionsContainer: {
    marginBottom: "1%",
  },
  resetContainer: {
    padding: "1%",
  },
  button: {
    marginTop: "1%",
    marginRight: "1%",
  },
  info: {
    marginLeft: "10%",
    marginBottom: "5%"
  }
}

function getSteps() {

  return ['Step1', 'Step2', 'Step3'];
}

function getStepContent(step) {
  switch (step) {
    case "0":
      return `Способен за за занимањето кое го обавува`;
    case "1":
      return `Способен за за занимањето кое го обавува`;
    case "2":
      return 'Способен со ограничувања за занимањето кое го обавува';
    case "3": 
      return `НЕ е способен за занимањето кое го обавува`;
    default:
      return 'Способен за за занимањето кое го обавува';
  }
}

class VerticalLinearStepper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeStep: this.props.items.length-1,
            steps: this.props.items,
        }

        this.setActive = this.setActive.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.print = this.print.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }



    
//   handleNext = () => {
//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//   };

//   handleBack = () => {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   };

  handleReset = (value) => {
    this.setState({activeStep: value})
  };

  setActive = (value) => {
      console.log("CALLING", value)
      this.setState({setActiveStep: value})
  }
  print = () => {
    let body = {
      name: this.props.employee.name,
      lastName: this.props.employee.lastName,
      age: this.props.employee.age,
      education: this.props.employee.education,
      position: this.props.employee.position,
      radio1: this.props.items[this.state.activeStep].radio1,
      radio2: this.props.items[this.state.activeStep].radio2,
      id: this.props.items[this.state.activeStep].id2 || this.props.items[this.state.activeStep].Z,
      date: this.props.items[this.state.activeStep].date || this.props.items[this.state.activeStep].B
    }
      Axios.post(`https://poliklinika.herokuapp.com/create-employee-pdf`, {body})
      .then(() => Axios.get("https://poliklinika.herokuapp.com/fetch-pdf", {responseType: "blob"})) //WE CALL ".THEN" SINCE WE HAVE PROMISE.RESOLVE() in server.
      .then((res) => {
          const pdfBlob = new Blob([res.data], {type: "application/pdf"})
          // saveAs(pdfBlob, "newPdf.pdf")
          let url = URL.createObjectURL(pdfBlob);
          window.open(url,'_blank')
      })
  };

  handleDelete = () => {
    let id = this.props.items[this.state.activeStep].id
    this.props.db.collection("tests").doc(id).delete()
    .then(() => {
      let array = []
      this.props.items.map((step) => {
        if(step.id !== id) {
          array.push(step)
        }
      })
      this.setState({steps: array})
      this.props.setAlert("info")
      this.props.setAlertMessage("Успешно избришавте систематски.")
    })
    .catch((err) => {
      this.props.setAlert("error")
      this.props.setAlertMessage(err)
    })
  }


  render() {
    return (
        <div style={style.root}>
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {this.state.steps.map((label, index) => (
              <Step key={label.B || label.date} onClick={() => this.handleReset(index)}>
                <StepLabel>{label.B || label.date}</StepLabel>
                <StepContent>
                  <Typography>{
                    getStepContent(label.AB || label.radio1)
                  }</Typography>
                  <div style={style.actionsContainer}>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.print}
                        style={style.button}
                      > ПРИНТАЈ
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleDelete}
                        style={style.button}
                      > <DeleteIcon /> 
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      );
  }
  
}

export default VerticalLinearStepper