import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import {Card , BackgroundShapes} from '../../components/login';
import { authApi } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials , LoginResponse } from '../../dto/login';

// @ts-ignore
import cookies from 'js-cookies';
import { UserModel } from '../../model/user';
import toast from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const userDataString = cookies.getItem('userData');
  
  useEffect(() => {
    if (userDataString) {
      navigate('/');
    }
  }, [ userDataString]);

  const handleSubmit = () => {
    setLoading(true);

    const credentials: LoginCredentials = { email, password };
    authApi.login(credentials)
      .then((response) => {
        if (response.data.success) {
          // store data in cookies
        const userData : UserModel = {
          token: response.data.data.token,
          email: response.data.data.email,
          name: response.data.data.name,
        };
        toast.success(response.data.message || '🎉 Login successful!');
        cookies.setItem('userData', JSON.stringify(userData));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        
        navigate('/');
        }
      })
      .catch((error) => {
        toast.error(error.response?.data.message || '🎉 Login failed!');
      })
      .finally(() => {
        setLoading(false);
        // toast.error('Something went wrong. Please try again.');
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