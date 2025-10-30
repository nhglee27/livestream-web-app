import { useState } from 'react';
import Confetti from 'react-confetti';
import {Card , BackgroundShapes} from '../../components/login';
import { authApi } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials , LoginResponse } from '../../dto/login';
import cookies from 'js-cookies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = () => {
    setLoading(true);

    const credentials: LoginCredentials = { email, password };
    authApi.login(credentials)
      .then((response) => {
        // store data in cookies
        const userData : LoginResponse = response.data;

        cookies.setItem('token', userData.token);
        cookies.setItem('name', userData.name);
        // console.log('Login successful:', response.data);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  };

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center p-4">
        <BackgroundShapes />

        <Card
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Login;