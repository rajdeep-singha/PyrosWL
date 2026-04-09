import { useState, useEffect } from "react";
import {
  Navbar,
  Hero,
  WhyPyros,
  Features,
  HowItWorks,
  EarlyAccess,
  Footer,
  theme,
  globalStyles,
} from "./components";

export default function PyrosWaitlist() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        background: theme.colors.bgDark,
        color: "#c8f0cb",
        minHeight: "100vh",
        fontFamily: theme.fonts.sans,
      }}
    >
      <style>{globalStyles}</style>

      <Navbar scrolled={scrolled} />
      <Hero />
      <WhyPyros />
      <Features />
      <HowItWorks />
      <EarlyAccess />
      <Footer />
    </div>
  );
}
