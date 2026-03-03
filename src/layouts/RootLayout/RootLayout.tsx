import { Outlet } from '@tanstack/react-router';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';

export const RootLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);
