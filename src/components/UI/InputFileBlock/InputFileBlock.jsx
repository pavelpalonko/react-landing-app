import React, { useState } from "react";
import { useValidation } from "../../../common/hooks/useValidation";
import classes from "./InputFileBlock.module.scss"

const InputFileBlock = ({ formFields, setFormFields, validationState, setValidationState }) => {

  const { validatePhoto } = useValidation()
  const rootStyle = [classes.labelFile]
  const [errStyle, setErrStyle] = useState(false)

  const validation = (validFunction) => async (event) => {
    const isValid = await validFunction(event)

    setErrStyle(!isValid)
    setValidationState({ ...validationState, [event.target.name]: isValid })
    setFormFields({ ...formFields, [event.target.name]: event.target?.files[0] })
  }

  if (errStyle) {
    rootStyle.push(classes.labelFileErr)
  }

  return (
    <div className={classes.labelFileWrapp}>
      <input
        className={classes.inputFile}
        type='file'
        id='file'
        name="photo"
        accept="image/jpeg,image/jpg"
        onChange={validation(validatePhoto)}
      />
      <label
        className={rootStyle.join(' ')}
        htmlFor='file'
        data-photo={formFields.photo.name ? formFields.photo.name : 'Upload your photo'}>Upload</label>
    </div>
  )
}

export default InputFileBlock