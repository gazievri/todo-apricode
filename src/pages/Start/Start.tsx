import React from 'react';
import Login from '../../components/Login/Login.tsx';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api.ts';
import { IUser } from '../../types/user';

const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (userData: IUser) => {
    login(userData)
    .then((res) => {
      navigate('/todos')
    })
    .catch(err => console.log(err))
  }

  return (
    <section>
      <Login handleLogin={handleLogin} />
    </section>
  )
}

export default Start;