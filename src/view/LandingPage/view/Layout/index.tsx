import { Outlet } from 'react-router';
import Header from '../Auth/components/Header';
import Footer from '../components/Footer';

const LandingLayout = () => {
  return (
    <div className="bg-base-100 text-base-content relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute top-10 -left-32 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-secondary/10 absolute top-1/2 right-0 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute bottom-10 left-1/3 h-56 w-56 rounded-full blur-3xl" />
      </div>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingLayout;
