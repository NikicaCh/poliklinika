import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 1100,
    backgroundColor: theme.palette.background.paper,
    marginTop: "5%"
  },
}));

export default function Employees(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value, emp) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      props.selectEmployee(emp, true)
      props.count(true)
    } else {
      newChecked.splice(currentIndex, 1);
      props.selectEmployee(emp, false)
      props.count(false)
    }

    setChecked(newChecked);
  };

 

  return (
    <List dense className={classes.root}>
      {props.items.map((emp, key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem button onClick={() => {
            props.setRender("employee"); 
            props.setEmployee(emp.id)}}>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${value + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${emp.name} ${emp.lastName}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(emp.id, emp)}
                checked={checked.indexOf(emp.id) !== -1} //CAN BE USED FOR AUTO SELECTING EMPLOYEES
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
