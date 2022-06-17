import React from "react";
import classes from './SectionPreview.module.scss'
import image from '../../../assets/image/pexels-alexandr-podvalny-1227513.jpg'
import MyButton from "../MyButton/MyButton";

const SectionPreview = () => {

  return (
    <section>
      <div className={classes.previewWrapp}>
        <img className={classes.previewImage} src={image} alt="pexels-alexandr-podvalny-1227513.jpeg" />
        <div className={classes.previewTextWrapp}>
          <h1> Test assignment for front-end developer</h1>
          <div>
            <p>
              What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </p>
          </div>
          <MyButton>Sing Up</MyButton>
        </div>
      </div>
    </section>
  )
}

export default SectionPreview