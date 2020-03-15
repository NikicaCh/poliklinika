import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




export default function StateNav(props) {
  const [value, setValue] = React.useState(0);

  const values = {
    0: "employees",
    1: "timeline",
    2: "settings"
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setSwitch(values[newValue])
  };
  const style = {
    marginBottom: "3%"
  }


  return (
    <Paper>
      <Tabs
        style={style}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
        >>
        {
          props.navs.map((nav) => {
            return <Tab key={nav} label={nav} />
          })
        }
      </Tabs>
    </Paper>
  );
}