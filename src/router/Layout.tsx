import { Outlet } from 'react-router-dom';
import '../styles/mixins.scss';
import { Header } from '../components/UI/Header/Header';
import { Footer } from '../components/UI/Footer/Footer';

export const Layout = () => {
  return (
    <div className='main-container'>
      <Header />
      <main className='container main'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
