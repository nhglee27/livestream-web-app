import { Header,Footer } from './layout';
import { AppRoutes } from './routes';
import './styles';

export default function App() {
  return (
    <>
      <main className="min-h-screen">
        <AppRoutes />
      </main>
    </>
  );
}