import './Login.sass';
import React, { useState } from 'react';

const Login: React.FC = ({ handleLogin }) => {

  const [userData, setUserData] = useState({});

  // Обновляю данные пользователя при изменений значений пароля или email
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const newData = {...userData, [e.target.name]: e.target.value }
    setUserData(newData)
  }

  // Обработка события submit
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    handleLogin(email, password)
  }

  return (
    <form className="login" name="login" onSubmit={handleSubmit}>
      <h2 className='login__title'>Please, sign in</h2>
      <label className="login__label">
        Email
        <input type="email" name="email" className='login__input' required placeholder='my@e-mail.com' onChange={handleChange} />
      </label>
      <label className="login__label">
        Password
        <input type="password" name="password" className='login__input' required placeholder='Enter password' onChange={handleChange} />
      </label>
      <button className='login__button'>Login</button>
    </form>
  )
}

export default Login;