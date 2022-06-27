import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types'

const InputText = ({ value, validateFunction, onStateValue, onStateValid, helperTxt, name, label, ShowTooltipAlways }) => {

  const [valid, setValid] = useState(false)

  const onInputBlure = (validFunction) => async (event) => {
    const isValid = await validFunction(event)

    setValid(!isValid)
    onStateValid(isValid)
  }

  const inputValueChange = (event) => {
    onStateValue(event.target.value)
  }

  return (
    <TextField
      label={label}
      name={name}
      error={valid}
      helperText={ShowTooltipAlways ? helperTxt : valid ? helperTxt : ' '} // if prop 'ShowTooltipAlways' === true, then show tooltip always, otherwise only on error.
      value={value}
      onChange={inputValueChange}
      onBlur={onInputBlure(validateFunction)}
      sx={{
        marginTop: '30px',
        'input:valid:focus + fieldset': { border: '1px solid #D0CFCF' },
        'label.Mui-focused': { color: '#7E7E7E' },
        'p.Mui-focused': { color: '#7E7E7E' },
        'label': { color: '#7E7E7E' }
      }}
    />
  )
}

InputText.propTypes = {
  value: PropTypes.string, 
  validateFunction: PropTypes.func, 
  onStateValue: PropTypes.func, 
  onStateValid: PropTypes.func, 
  helperTxt: PropTypes.string, 
  name: PropTypes.string, 
  label: PropTypes.string, 
  ShowTooltipAlways: PropTypes.bool,
}

InputText.defaultProps = {
  ShowTooltipAlways: false,
}

export default InputText