import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./view/Auth/SignInForm";
import { SignUpPage } from "./view/Auth/SignUpForm";

import LandingLayout from "./view/Layout";
import HomePage from "./view/Home";
import PricingPage from "./view/Pricing";
import AboutPage from "./view/About";
import Contact from "./view/Contact";
import BlogIndex from "./view/Blog";
import BlogPostPage from "./view/Blog/PostView";
import NotFound from "./view/NotFound";

const LandingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
         <Route path="/signup" element={<SignUpPage />} />
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
