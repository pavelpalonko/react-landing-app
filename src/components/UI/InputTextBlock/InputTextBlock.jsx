import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useValidation } from "../../../common/hooks/useValidation";
import classes from './InputTextBlock.module.scss'

const InputTextBlock = ({ value, onStateChanged, name }) => {

  // const { validateName, validateEmail, validatePhone } = useValidation()
  // const [errStyle, setErrStyle] = useState({ name: false, email: false, phone: false })

  // const validation = (validFunction) => async (event) => {
  //   const isValid = await validFunction(event)

  //   setValidationState({ ...validationState, [event.target.name]: isValid })
  //   setErrStyle({ ...errStyle, [event.target.name]: !isValid })
  // }

  // const handleText = (event) => {
  //   setFormFields({ ...formFields, [event.target.name]: event.target.value })
  // }

  const [valid, setValid] = useState(false)
  const [active, setActive] = useState(false)

  const onInputBlur = (validFunction) => async (event) => {
    const isValid = await validFunction(event)

    setValid(isValid)
    setActive(true)
  }

  const onInputValueChange = (event) => {
    onStateChanged({
      value: event.target.value,
      valid
    })
  }

  return (
    <>
      <div className={classes.InputTextWrapp} >
        <TextField
          label='Your name'
          name={name}
          error={!active && !valid}
          helperText={!active && !valid ? 'Helper text' : ' '}
          value={value}
          onFocus={() => setActive(true)}
          onChange={onInputValueChange}
          onBlur={onInputBlur(validateName)}
          sx={{
            marginTop: '30px',
            'input:valid:focus + fieldset': { border: '1px solid #D0CFCF' },
            'label.Mui-focused': { color: '#7E7E7E' },
            'p.Mui-focused': { color: '#7E7E7E' },
            'label': { color: '#7E7E7E' }
          }}
        />
        <TextField
          label='Email'
          name="email"
          error={errStyle.email}
          helperText={errStyle.email ? 'Helper text' : ' '}
          value={formFields.email}
          onChange={handleText}
          onBlur={validation(validateEmail)}
          sx={{
            marginTop: '30px',
            'input:valid:focus + fieldset': { border: '1px solid #D0CFCF' },
            'label.Mui-focused': { color: '#7E7E7E' },
            'p.Mui-focused': { color: '#7E7E7E' },
            'label': { color: '#7E7E7E' }
          }}
        />
        <TextField
          label='Phone'
          name="phone"
          error={errStyle.phone}
          helperText='+38 (XXX) XXX - XX - XX'
          value={formFields.phone}
          onChange={handleText}
          onBlur={validation(validatePhone)}
          sx={{
            marginTop: '30px',
            'input:valid:focus + fieldset': { border: '1px solid #D0CFCF' },
            'label.Mui-focused': { color: '#7E7E7E' },
            'p.Mui-focused': { color: '#7E7E7E' },
            'label': { color: '#7E7E7E' }
          }}
        />
      </div>
    </>
  )
}

export default InputTextBlock