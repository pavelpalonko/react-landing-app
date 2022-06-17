import React from "react";
import Logo from "../logo/Logo";
import MyButton from "../MyButton/MyButton";
import classes from "./Header.module.scss"

const Header = () => {

  return (
    <header>
      <div className={classes.headerWrapp}>
        <Logo />
        <div className={classes.headerBtnWrapp}>
          <MyButton>User</MyButton>
          <MyButton>Sing Up</MyButton>
        </div>
      </div>
    </header>
  )
}

export default Header