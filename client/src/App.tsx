import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Background, Navbar, Footer, theme, globalStyles } from "@/components";
import { LandingPage, DocsPage } from "@/pages";

export default function PyrosWaitlist() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on route change (unless navigating to an in-page anchor).
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div
      style={{
        background: theme.colors.bg,
        color: theme.colors.textPrimary,
        minHeight: "100vh",
        fontFamily: theme.fonts.sans,
      }}
    >
      <style>{globalStyles}</style>
      <Background />
      <Navbar scrolled={scrolled} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </div>
  );
}
