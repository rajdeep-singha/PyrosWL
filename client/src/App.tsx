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
import EvilEye from './components/EvilEye';

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
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.4 }}>
          <EvilEye
            eyeColor="#86f28f"
            intensity={0.2}
            pupilSize={0.6}
            irisWidth={0.25}
            glowIntensity={0.35}
            scale={1.2}
            noiseScale={1}
            pupilFollow={1}
            flameSpeed={0.2}
            backgroundColor="#0a1a0c"
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Hero />
           <WhyPyros />
      <Features />
      <HowItWorks />
      <EarlyAccess />
      <Footer />
        </div>
      </div>
     
    </div>
  );
}
