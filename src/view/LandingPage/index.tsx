import { BrowserRouter, Route, Routes } from "react-router";
import { AuthPage } from "./view/Auth/SignInForm";
import LandingLayout from "./view/Layout";
import HomePage from "./view/Home";
import PricingPage from "./view/Pricing";
import AboutPage from "./view/About";

const LandingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
