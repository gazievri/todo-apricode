import React from 'react';
import Login from '../../components/Login/Login.tsx';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api.ts';

const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // login(email, password)
    // .then(() => navigate('/main'))
    // .catch(err => console.log(err))
    navigate('/main')
  }

  return (
    <section>
      <Login handleLogin={handleLogin} />
    </section>
  )
}

export default Start;