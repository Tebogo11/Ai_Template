import { Outlet } from "react-router-dom";
import Header from "../Auth/components/Header";
import Footer from "../components/Footer";

const LandingLayout = () => {
  return (
    <div className="relative min-h-screen bg-base-100 text-base-content overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
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
