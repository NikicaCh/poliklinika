import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import {createEmployee} from './Fetch'


export default function AddCompanyModal(props) {
  const [open, setOpen] = React.useState(props.render);

  React.useEffect(() => {
    setOpen(props.render)
  })

  const handleClose = () => {
    props.setModal(false)
  };
  
  const handleSubmit = () => {
    //validation first   
  }



  

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles()

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
        <DialogTitle id="form-dialog-title">Нова Фирма</DialogTitle>
        <DialogContent >
          <TextField
            className={classes.paper}
            autoFocus
            id="name"
            required={true}
            variant={"outlined"}
            label="Име"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="director"
            required={true}
            variant={"outlined"}
            label="Управител"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="address"
            required={true}
            variant={"outlined"}
            label="Адреса"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="email"
            placeholder="name@example.com"
            required={true}
            variant={"outlined"}
            label="email"
            type="email"
          />
          <TextField
            className={classes.paper}
            id="telephone"
            required={true}
            variant={"outlined"}
            label="Телефон"
            type="tel"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Затвори
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Креирај нова фирма
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}