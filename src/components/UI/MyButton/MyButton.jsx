import classes from './MyButton.module.scss'

const MyButton = ({ children, disabled, ...props }) => {

  return (
    <button disabled={disabled} {...props} className={classes.myBtn}>
      {children}
    </button>
  )
}

export default MyButton