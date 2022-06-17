import React, { useRef } from "react";
import classes from './UserBlock.module.scss'
import userPhoto from '../../../assets/svg/photo-cover.svg'

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

export default UserBlock