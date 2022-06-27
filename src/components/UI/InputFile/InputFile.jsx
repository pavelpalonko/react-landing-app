import React, { useState } from "react";
import classes from "./InputFile.module.scss"
import PropTypes from 'prop-types'

const InputFile = ({ value, validateFunction, onStateValue, onStateValid }) => {

  const rootStyle = [classes.labelFile]
  const [valid, setValid] = useState(false)

  const uploadImage = (validFunction) => async (event) => {
    const isValid = await validFunction(event)

    setValid(!isValid)
    onStateValid(isValid)
    onStateValue(event.target?.files[0])
  }

  if (valid) {
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
        onChange={uploadImage(validateFunction)}
      />
      <label
        className={rootStyle.join(' ')}
        htmlFor='file'
        data-photo={value?.name ? value?.name : 'Upload your photo'}>Upload</label>
    </div>
  )
}

InputFile.propTypes = {
  value: PropTypes.any,
  validateFunction: PropTypes.func,
  onStateValue: PropTypes.func,
  onStateValid: PropTypes.func,
}

export default InputFile