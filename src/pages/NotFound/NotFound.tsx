import React from 'react';
import './NotFound.sass'
import { NavLink } from 'react-router-dom';

const NotFound: React.FC = () => {
  return(
    <section className='not-found'>
      <div className='not-found__img'/>
      <p className='not-found__text'>Oops... <NavLink to="/" className="not-found__link">Go back!</NavLink></p>
    </section>
  )
}

export default NotFound;