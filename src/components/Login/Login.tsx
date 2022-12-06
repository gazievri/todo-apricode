import './Login.sass';
import React, { useState } from 'react';
import { IUser } from '../../types/user';
import {NavLink} from 'react-router-dom'

interface ILoginProps {
  handleLogin: (data: IUser) => void,
}

const Login: React.FC<ILoginProps> = ({ handleLogin }) => {

  const [userData, setUserData] = useState({email: '', password: ''});

  // Обновляю данные пользователя при изменений значений пароля или email
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const newData = {...userData, [e.target.name]: e.target.value }
    setUserData(newData)
  }

  // Обработка события submit
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    handleLogin(userData)
  }

  return (
    <form className="login" name="login" onSubmit={handleSubmit}>
      <h2 className='login__title'>WELCOME</h2>
      <label className="login__label">
        Email
        <input type="email" name="email" className='login__input' required placeholder='my@e-mail.com' onChange={handleChange} />
      </label>
      <label className="login__label">
        Password
        <input type="password" name="password" className='login__input' required placeholder='Enter password' onChange={handleChange} />
      </label>
      <button className='login__button'>Sign In</button>
      <div className='login__text-block'>
        <p className='login__text'>Haven't registered?</p>
        <NavLink className="login__link-signup" to='/register'>Sign Up</NavLink>
      </div>
    </form>
  )
}

export default Login;