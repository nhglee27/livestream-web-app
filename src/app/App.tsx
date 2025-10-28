import { Header,Footer } from './layout';
import { AppRoutes } from './routes';
import './styles';

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}