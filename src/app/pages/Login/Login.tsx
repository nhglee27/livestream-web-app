import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Card, BackgroundShapes } from '../../components/login';
import { authApi } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../dto/login';
import { UserModel } from '../../model/user';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra session storage khi component được load
  useEffect(() => {
    // Lấy dữ liệu trực tiếp từ API của trình duyệt
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = () => {
    setLoading(true);

    const credentials: LoginCredentials = { email, password };
    authApi.login(credentials)
      .then((response) => {
        if (response.data.success) {
          const userData: UserModel = {
            token: response.data.data.token,
            email: response.data.data.email,
            name: response.data.data.name,
          };

          toast.success(response.data.message || '🎉 Login successful!');

          sessionStorage.setItem('userData', JSON.stringify(userData));

          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);

          navigate('/');
        }
      })
      .catch((error) => {
        toast.error(error.response?.data.message || 'Login failed!');
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