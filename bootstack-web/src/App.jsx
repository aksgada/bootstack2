import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ScrollTrigger } from "./lib/motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import useReveal from "./hooks/useReveal";
import { useScrollFlex } from "./hooks/useScrollFlex";

import Loader from "./components/Loader.jsx";
import Cursor from "./components/Cursor.jsx";
import BackgroundStage from "./components/BackgroundStage.jsx";
import Grain from "./components/Grain.jsx";
import Nav from "./components/Nav.jsx";
import ScrollBadge from "./components/ScrollBadge.jsx";
import ServiceDetails from "./sections/ServiceDetails.jsx";

import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import BigIdea from "./sections/BigIdea.jsx";
import SelectedWork from "./sections/SelectedWork.jsx";
import Approach from "./sections/Approach.jsx";
import WhyBootstack from "./sections/WhyBootstack.jsx";
import TechStack from "./sections/TechStack.jsx";
import FAQSection from "./sections/FAQSection.jsx";
import FinalCta from "./sections/FinalCta.jsx";
import Footer from "./sections/Footer.jsx";
import Services from "./sections/Services.jsx";
import WhyChooseUs from "./sections/WhyChooseUs.jsx";
import HowWeWork from "./sections/HowWeWork.jsx";


/* =========================================================
   HOME PAGE
   ========================================================= */

function Home() {
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready);
  useReveal([ready]);
  useScrollFlex(ready);

  /* ---------------------------------------------------------
     Refresh ScrollTrigger after loader / fonts
     --------------------------------------------------------- */

  useEffect(() => {
    if (!ready) return undefined;

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const id = window.setTimeout(refresh, 220);

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }

    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, [ready]);


  /* ---------------------------------------------------------
     Lock body while loader is active
     --------------------------------------------------------- */

  useEffect(() => {
    document.body.classList.toggle("is-locked", !ready);

    return () => {
      document.body.classList.remove("is-locked");
    };
  }, [ready]);


  return (
    <>
      <Loader onDone={() => setReady(true)} />

      <Cursor />

      <BackgroundStage />

      <Grain />

      <Nav ready={ready} />

      <ScrollBadge />


      {/* =====================================================
          HOME CONTENT
          ===================================================== */}

      <main id="top">

        <Hero ready={ready} />

        <About />

        <BigIdea />

        {/* <Capabilities />
        <GrowthEngine /> */}

        <Services />

        <SelectedWork />

        <Approach />

        <WhyChooseUs />

        <HowWeWork />

        <TechStack />

        <FAQSection />

        <FinalCta />

      </main>

      <Footer />
    </>
  );
}


/* =========================================================
   APP
   ========================================================= */

export default function App() {

  return (
    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* SERVICE DETAILS */}

      <Route
        path="/services/:serviceId"
        element={<ServiceDetails />}
      />


      {/* OPTIONAL FALLBACK */}

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}