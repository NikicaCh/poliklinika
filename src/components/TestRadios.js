import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function TestRadios(props) {
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const handleChange1 = event => {
    setValue1(event.target.value);
    props.setRadios(event.target.value, value2)
  };
  const handleChange2 = event => {
    setValue2(event.target.value);
    props.setRadios(value1, event.target.value)
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={value1} onChange={handleChange1} row size={"medium"} variant={"filled"}>
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="Способен"
          labelPlacement="top"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="Способен со ограничувања"
          labelPlacement="top"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="НЕ е способен"
          labelPlacement="top"
        />
        </RadioGroup>
        <p />
        <p />
        <RadioGroup aria-label="position" name="position2" value={value2} onChange={handleChange2} row size={"medium"} variant={"filled"}>
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="Патолошка состојба НЕМА"
          labelPlacement="top"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="Патолошка состојба ИМА"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}