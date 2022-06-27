import React, { useRef } from "react";
import classes from './UserBlock.module.scss'
import userPhoto from '../../../assets/svg/photo-cover.svg'
import PropTypes from 'prop-types'

const UserBlock = ({photo, name, email, position, phone}) => {

  const image = useRef(null)
  
  return (
    <div className={classes.userWrapp}>
      <img ref={image} src={photo} alt="a" onError={() => image.current.src = userPhoto}/>
      <span>{name}</span>
      <div>
        <div>{email}</div>
        <div>{position}</div>
        <div>{phone}</div>
      </div>
    </div>
  )
}

UserBlock.propTypes = {
  photo: PropTypes.string, 
  name: PropTypes.string, 
  email: PropTypes.string, 
  position: PropTypes.string, 
  phone: PropTypes.string,
}

export default UserBlock