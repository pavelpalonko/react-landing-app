import React from "react";
import MyButton from "../MyButton/MyButton";
import UserBlock from "../UserBlock/UserBlock";
import classes from './SectionUsers.module.scss'
import PropTypes from 'prop-types'

const SectionUsers = ({ users, setUrl, nextUrl, loading }) => {

  const TurnPage = () => {
    setUrl(nextUrl)
  }

  return (
    <section>
      <div className={classes.SectionUsersWrapp}>
        <h2 >Working with GET request</h2>
        <div className={classes.usersWrapp}>
          {
            !users.length
              ? 'Loading...'
              : users.map((user) =>
                <UserBlock
                  key={user.id + Math.random()}
                  photo={user.photo}
                  name={user.name}
                  email={user.email}
                  position={user.position}
                  phone={user.phone}></UserBlock>
              )
          }
        </div>
        {
          nextUrl
            ? loading
              ? 'loading...'
              : <MyButton onClick={TurnPage}>Show more</MyButton>
            : null // if users length === 0, button will hide
        }
      </div>
    </section>
  )
}

SectionUsers.propTypes = {
  users: PropTypes.array, 
  setUrl: PropTypes.func, 
  nextUrl: PropTypes.string, 
  loading: PropTypes.bool, 
}

export default SectionUsers