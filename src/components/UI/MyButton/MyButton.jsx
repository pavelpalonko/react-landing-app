import classes from './MyButton.module.scss'
import PropTypes from 'prop-types'

const MyButton = ({ children, disabled, ...props }) => {

  return (
    <button disabled={disabled} {...props} className={classes.myBtn}>
      {children}
    </button>
  )
}

MyButton.propsType = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  props: PropTypes.object,
}

export default MyButton