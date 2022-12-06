import './Register.sass';
import React, { useState } from 'react';
import {register} from '../../utils/api.ts';
import {NavLink, useNavigate} from 'react-router-dom'

interface IRegisterProps {}

const Register: React.FC<IRegisterProps> = () => {

  const [userData, setUserData] = useState({email: '', password: ''});
  const navigate = useNavigate();

  // Обновляю данные пользователя при изменений значений пароля или email
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const newData = {...userData, [e.target.name]: e.target.value }
    setUserData(newData)
  }

  // Обработка события submit
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    register(userData)
    .then((res) => {

      navigate('/');
    })
    .catch(err => console.log(err))
  }

  return (
    <form className="register" name="register" onSubmit={handleSubmit}>
      <h2 className='register__title'>WELCOME</h2>
      <label className="register__label">
        Email
        <input type="email" name="email" className='register__input' required placeholder='my@e-mail.com' onChange={handleChange} />
      </label>
      <label className="register__label">
        Password
        <input type="password" name="password" className='register__input' required placeholder='Enter password' onChange={handleChange} />
      </label>
      <button className='register__button'>Sign Up</button>
      <div className='register__text-block'>
        <p className='register__text'>Already registered?</p>
        <NavLink className="register__link-signin" to='/'>Sign In</NavLink>
      </div>
    </form>
  )
}

export default Register;