import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./view/Auth/SignInForm";
import LandingLayout from "./view/Layout";
import HomePage from "./view/Home";
import PricingPage from "./view/Pricing";
import AboutPage from "./view/About";
import Contact from "./view/Contact";
import { ScrollToTop } from "./ScrollToTop";

const LandingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
