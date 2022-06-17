import React, { useState, useEffect } from "react";
import { useFetching } from "../../../common/hooks/useFetching";
import UsersServise from "../../../common/fetchAPI/usersServise";
import classes from "./InputRadioBlock.module.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const InputRadioBlock = ({ formFields, setFormFields }) => {

  const [positions, setPositions] = useState([])

  const [fetchRadioButton, isLoadingRadio] = useFetching(async () => {
    const resultPosition = await UsersServise.getRadioButton()
    setPositions(resultPosition)
  })

  useEffect(() => {
    fetchRadioButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handelRadio = (event) => {
    setFormFields({ ...formFields, [event.target.name]: +event.target.value })
  }

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

  return (
    <div className={classes.inputRadioWrapp}>
      <div>Select you position</div>
      <RadioGroup
        name="position"
        value={formFields.position}
        onChange={handelRadio}
      >
        {
          isLoadingRadio
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

export default InputRadioBlock