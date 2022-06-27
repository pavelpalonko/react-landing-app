import React from "react";
import classes from "./InputRadio.module.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types'

const InputRadio = ({ value, onStateValue, positions, isLoading }) => {

  const Ellipse = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.5" stroke="#D0CFCF" />
      </svg>
    )
  }

  const EllipseCheked = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.5" stroke="#00BDD3" />
        <circle cx="10" cy="10" r="5" fill="#00BDD3" />
      </svg>
    )
  }

  const handelRadio = (event) => {
    onStateValue(+event.target.value)
  }

  return (
    <div className={classes.inputRadioWrapp}>
      <div>Select you position</div>
      <RadioGroup
        name="position"
        value={value}
        onChange={handelRadio}
      >
        {
          isLoading
            ? 'Loading...'
            : positions.map((position) =>
              <FormControlLabel
                key={position.id}
                value={position.id}
                label={position.name}
                control={<Radio
                  icon={<Ellipse />}
                  checkedIcon={<EllipseCheked />}
                  sx={{ color: '#D0CFCF', borderTop: 'none', '&.Mui-checked': { color: '#00BDD3' } }} />}
              />
            )
        }
      </RadioGroup>
    </div>
  )
}

InputRadio.propTypes = {
  value: PropTypes.number, 
  onStateValue: PropTypes.func, 
  positions: PropTypes.array, 
  isLoading: PropTypes.bool,
}

export default InputRadio