import { useState } from 'react';
import Confetti from 'react-confetti';
import {Card , BackgroundShapes} from '../../components/login';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

console.log('Login submitted:', { email, password, remember });
    // // Simulated async login
    // setTimeout(() => {
    //   setLoading(false);
    //   setShowConfetti(true);
    //   setTimeout(() => setShowConfetti(false), 5000);
    // }, 2000);
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