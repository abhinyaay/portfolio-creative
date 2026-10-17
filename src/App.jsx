import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useSmoothScroll from "./hooks/useSmoothScroll";
import useGlassSheen from "./hooks/useGlassSheen";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import Timeline from "./components/Timeline";
import Work from "./components/Work";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();
  useGlassSheen();

  const onLoaderDone = useCallback(() => setReady(true), []);

  // fonts and the devicon sprites change layout height — recalc once settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Preloader onDone={onLoaderDone} />
      <Cursor />

      <div className="orb orb--a" aria-hidden="true" />
      <div className="orb orb--b" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main>
        <Hero ready={ready} />
        <WhatIDo />
        <Timeline />
        <Work />
        <TechStack />
        <Footer />
      </main>
    </>
  );
}
