import { motion } from 'framer-motion';
import LogoHeader from './Header';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import RememberMe from './RememberMe';
import SubmitButton from './SubmmitButton';
import Divider from './Divider';
import SocialButtons from './SocialButton';
import FooterLink from './FooterLink';
import React from 'react';

interface LoginCardProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  remember: boolean;
  setRemember: (v: boolean) => void;
  loading: boolean;
  onSubmit: () => void;
}

 const LoginCard: React.FC<LoginCardProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  remember,
  setRemember,
  loading,
  onSubmit,
}: LoginCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-800"
  >
    <LogoHeader />

    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
      <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />

      <div className="flex items-center justify-between text-sm">
        <RememberMe checked={remember} onChange={setRemember} />
        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
          Reset access
        </a>
      </div>

      <SubmitButton loading={loading} />
    </form>

    <Divider />
    <SocialButtons />
    <FooterLink />
  </motion.div>
);

export default LoginCard;