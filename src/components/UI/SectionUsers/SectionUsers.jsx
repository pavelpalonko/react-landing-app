import React from "react";
import MyButton from "../MyButton/MyButton";
import UserBlock from "../UserBlock/UserBlock";
import classes from './SectionUsers.module.scss'
import PropTypes from 'prop-types'

const SectionUsers = ({ users, loading, downloadNextUsers, showButton }) => {

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
                  key={user.id}
                  photo={user.photo}
                  name={user.name}
                  email={user.email}
                  position={user.position}
                  phone={user.phone}></UserBlock>
              )
          }
        </div>
        {
          showButton
            ? loading
              ? 'loading...'
              : <MyButton onClick={() => downloadNextUsers(false)}>Show more</MyButton>
            : null 
        }
      </div>
    </section>
  )
}

SectionUsers.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool,
  downloadNextUsers: PropTypes.func,
}

export default SectionUsers