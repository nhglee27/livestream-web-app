import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import RegisterBackground from "./RegisterBackground";
import RegisterLogo from "./RegisterLogo";
import RegisterForm from "./RegisterForm";
import RegisterSocial from "./RegisterSocial";

import { authApi } from '../../api/authAPI';
import {RegisterCredentials, RegisterResponse} from "../../dto/register";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const userDataString = sessionStorage.getItem('userData');
    
   useEffect(() => {
    if (userDataString) {
      navigate('/');
    }
  }, [ userDataString]);

  const handleSubmit = async (data: RegisterCredentials) => {
    try {
      setLoading(true);
      console.log("2")
      const res = await authApi.register(data);
      const response: RegisterResponse = res.data;

      if (response.success) {
        toast.success(response.message || "🎉 Register successful!");
        setShowConfetti(true);

        // hiệu ứng 5s rồi chuyển qua login
        setTimeout(() => {
          setShowConfetti(false);
          navigate("/login");
        }, 3000);
      } else {
        toast.error(response.message || "Register failed!");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <RegisterBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-800"
        >
          <RegisterLogo />
          <RegisterForm loading={loading} onSubmit={handleSubmit} />
          <RegisterSocial />
        </motion.div>
      </div>
    </>
  );
};

export default Register;
