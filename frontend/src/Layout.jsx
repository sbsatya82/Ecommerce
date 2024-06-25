import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {useSelector} from 'react-redux';


const Layout = () => {

  const {user} = useSelector((state)=> state.user);


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
