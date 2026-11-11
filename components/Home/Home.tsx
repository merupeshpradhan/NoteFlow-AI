"use client";

import { useEffect, useState } from "react";
import HomeHeader from "../Layout/Navbar/HomeHeader";
import HeroSection from "../HomePageView/HeroSection";
import Feature from "../HomePageView/Feature";
import SocialProof from "../HomePageView/SocialProof";
import Footer from "../Layout/Footer/HomeFooter";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { useRouter } from "next/navigation";

function Home() {
  const [signinView, setSigninView] = useState(false);
  const [signupView, setSignupView] = useState(false);
  const [authView, setAuthView] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // console.log(storedUser);

    if (storedUser) {
      router.replace("/notes");
    }
  });

  useEffect(() => {
    if (signinView || signupView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [signinView, signupView]);

  function handleSignIn() {
    setSigninView((prev) => !prev);
  }

  function handleSignUp() {
    setSignupView((prev) => !prev);
  }

  // console.log(localStorage.getItem("user"));

  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-x-hidden scroll-smooth">
      {/* Sticky Header */}
      <HomeHeader
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setAuthView={setAuthView}
      />

      {/* Main Page Flow Sections with Matching IDs */}
      <main className="flex-1 flex flex-col">
        <HeroSection handleSignIn={handleSignIn} handleSignUp={handleSignUp} />

        {/* Features link will scroll here */}
        <div id="features">
          <Feature />
        </div>

        {/* Testimonials link will scroll here */}
        <div id="testimonials">
          <SocialProof />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {signinView && (
        <Login
          onClose={() => setSigninView(false)}
          onSwitchToSignUp={() => {
            setSigninView(false);
            setSignupView(true);
          }}
        />
      )}

      {signupView && (
        <Register
          onClose={() => setSignupView(false)}
          onSwitchToSignIn={() => {
            setSignupView(false);
            setSigninView(true);
          }}
        />
      )}
    </div>
  );
}

export default Home;
