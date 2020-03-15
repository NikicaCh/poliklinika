import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertSnack(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState("")


  useEffect(() => {
    if(props.alert == "success" || props.alert == "error" || props.alert == "info") {
      openAlert()
    } else {
        setOpen(false)
    }
  })

  const openAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    props.setAlert("")
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.alert}>
          {props.alertMessage}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}