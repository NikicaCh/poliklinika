import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            activeStep: 0,
            steps: [],
        }

        this.retrieveTests = this.retrieveTests.bind(this)
        this.setActive = this.setActive.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }



    retrieveTests = () => {
        this.setState({steps: []})
        this.props.items.map((item) => {
            let testRef = this.props.db.collection('tests').doc(item);
            let getDoc = testRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                    this.setState({steps: [...this.state.steps, doc.data()]})
                }
                let dates = []
                this.state.steps.reverse().map((step) => {
                if(dates.indexOf(step.date) !== -1 || dates.indexOf(step.B) !== -1) { // test with the same date already excists, so remove the rest
                  this.props.db.collection('tests').doc(step.id).delete().then(function() {
                    console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                } else {
                  dates.push(step.date)
                }
        })
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
            })
    }
    
    componentDidMount() {
        this.retrieveTests()
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