import React, { useEffect, useState } from "react";
import { useFetching } from "../../../common/hooks/useFetching";
import MyButton from "../MyButton/MyButton";
import UsersServise from "../../../common/fetchAPI/usersServise";
import InputTextBlock from "../InputTextBlock/InputTextBlock";
import InputRadioBlock from "../InputRadioBlock/InputRadioBlock";
import InputFileBlock from "../InputFileBlock/InputFileBlock";
import classes from './SectionForm.module.scss'
import successImage from '../../../assets/svg/success-image.svg'

const SectionForm = ({ setUrl }) => {

  const [formIsValid, setFormIsValid] = useState(false)
  const [data, setData] = useState('')
  const [successfullRegister, setSuccessfullRegister] = useState(false)

  const [formState, setFormState] = useState({
    name: {
      value: '',
      valid: false
    },
    email: false,
    phone: false,
    photo: false,
  })

  const [validationState, setValidationState] = useState({
    name: false,
    email: false,
    phone: false,
    photo: false,
  })
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    position: 1,
    photo: '',
  })

  const sumbitForm = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append('position_id', formFields.position);
    userData.append('name', formFields.name);
    userData.append('email', formFields.email);
    userData.append('phone', formFields.phone);
    userData.append('photo', formFields.photo);
    setData(userData)
  }

  const [postDataUser] = useFetching(async () => {
    const resultingPost = await UsersServise.postUser(data)
    console.log(resultingPost.success)
    if (resultingPost.success) {
      setSuccessfullRegister(true)
      setUrl()
    }
  })

  useEffect(() => {
    if (data) postDataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  //Checking all validation fields. If everything fields is "true", then activates the "send" button.
  useEffect(() => {
    setFormIsValid(Object.values(validationState).every((err) => err))
  }, [validationState])

  const onFormControlChanged = ((name, { value, valid }) => {
    setFormState({
      ...formState,
      [name]: {
        value,
        valid
      }
    })
  })

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
            <InputTextBlock
              formFields={formFields}
              setFormFields={setFormFields}
              validationState={validationState}
              setValidationState={setValidationState}
              changed={({ value, valid }) => onFormControlChanged('name', { value, valid })}
            />
            <InputRadioBlock
              formFields={formFields}
              setFormFields={setFormFields}
            />
            {/* <InputFileBlock
              formFields={formFields}
              setFormFields={setFormFields}
              validationState={validationState}
              setValidationState={setValidationState}
            /> */}
            <InputFileBlock
              value={formState.photo.value}
              changed={({ value, valid }) => onFormControlChanged('photo', { value, valid })}
            />
            <MyButton
              name='send'
              disabled={!formIsValid}
              onClick={sumbitForm}>Send</MyButton>
          </form>
      }
    </section>
  )
}

export default SectionForm