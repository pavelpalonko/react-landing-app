import React, { useEffect, useState } from "react";
import { useFetching } from "../../../common/hooks/useFetching";
import { useValidation } from "../../../common/hooks/useValidation";
import { useUsersServiсe } from "../../../common/fetchAPI/useUsersServiсe";
import MyButton from "../MyButton/MyButton";
import InputRadio from "../InputRadio/InputRadio";
import InputFile from "../InputFile/InputFile";
import classes from './SectionForm.module.scss'
import successImage from '../../../assets/svg/success-image.svg'
import InputText from "../InputText/InputText";
import PropTypes from 'prop-types'

const SectionForm = ({ positions, isLoadingPositions, downloadNextUsers }) => {

  const UsersService = useUsersServiсe()
  const { validateName, validateEmail, validatePhone, validatePhoto } = useValidation()
  const [errMsg, setErrMsg ] = useState('')
  const [successfullRegister, setSuccessfullRegister] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [data, setData] = useState('')

  const [formState, setFormState] = useState({
    name: {
      value: '',
      valid: false,
    },
    email: {
      value: '',
      valid: false,
    },
    phone: {
      value: '',
      valid: false,
    },
    photo: {
      value: '',
      valid: false,
    },
    position: {
      value: 1,
      valid: true,
    },
  })

  const sumbitForm = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append('position_id', formState.position.value);
    userData.append('name', formState.name.value);
    userData.append('email', formState.email.value);
    userData.append('phone', formState.phone.value);
    userData.append('photo', formState.photo.value);
    setData(userData)
  }

  const [postDataUser] = useFetching(async () => {
    const resultingPost = await UsersService.postUser(data)
    console.log(resultingPost)
    if (resultingPost.success) {
      setSuccessfullRegister(true)
      downloadNextUsers(true)
      setErrMsg('')
    } else {
      setErrMsg(resultingPost.message)
    }
  })

  useEffect(() => {
    if (data) postDataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  //Checking all validation fields. If everything fields is "true", then activates the "send" button.
  useEffect(() => {
    setFormIsValid(Object.values(formState).every((err) => err.valid))
  }, [formState])


  const onFormControlValue = (name, value) => {
    setFormState((previosState) => {
      return { ...previosState, [name]: { ...previosState[name], value: value } }
    })
  }

  const onFormControlValid = (name, valid) => {
    setFormState((previosState) => {
      return { ...previosState, [name]: { ...previosState[name], valid: valid } }
    })
  }

  return (
    <section>
      {
        successfullRegister
          ?
          <div className={classes.sectionFormSuccessWrapp}>
            <h2>User successfully registered</h2>
            <img src={successImage} alt="success" />
          </div>
          :
          <form className={classes.sectionFormWrapp}>
            <h2>Working with POST request</h2>
            <div className={classes.inputWrapp}>
              <InputText
                value={formState.name.value}
                name={'name'}
                label={'You name'}
                helperTxt={'Helper Text'}
                validateFunction={validateName}
                onStateValue={(value) => onFormControlValue('name', value)}
                onStateValid={(valid) => onFormControlValid('name', valid)}
              />
              <InputText
                value={formState.email.value}
                name={'email'}
                label={'Email'}
                helperTxt={'Helper Text'}
                validateFunction={validateEmail}
                onStateValue={(value) => onFormControlValue('email', value)}
                onStateValid={(valid) => onFormControlValid('email', valid)}
              />
              <InputText
                value={formState.phone.value}
                name={'phone'}
                label={'Phone'}
                helperTxt={'+38 (XXX) XXX - XX - XX'}
                validateFunction={validatePhone}
                onStateValue={(value) => onFormControlValue('phone', value)}
                onStateValid={(valid) => onFormControlValid('phone', valid)}
                ShowTooltipAlways={true}
              />
            </div>
            <InputRadio
              value={formState.position.value}
              onStateValue={(value) => onFormControlValue('position', value)}
              positions={positions}
              isLoading={isLoadingPositions}
            />
            <InputFile
              value={formState.photo.value}
              validateFunction={validatePhoto}
              onStateValue={(value) => onFormControlValue('photo', value)}
              onStateValid={(valid) => onFormControlValid('photo', valid)}
            />
            <MyButton
              name='send'
              disabled={!formIsValid}
              onClick={sumbitForm}>Send</MyButton>
              {
                errMsg
                ? <div className={classes.errorMessage}>{errMsg}</div>
                : null
              }      
          </form>
      }
    </section>
  )
}

SectionForm.propTypes = {
  positions: PropTypes.array, 
  isLoadingRadio: PropTypes.bool, 
  downloadNextUsers: PropTypes.func, 
}

export default SectionForm