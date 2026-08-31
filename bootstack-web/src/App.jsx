import { useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useReveal } from './hooks/useReveal';
import { useScrollFlex } from './hooks/useScrollFlex';

import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import BackgroundStage from './components/BackgroundStage.jsx';
import Grain from './components/Grain.jsx';
import Nav from './components/Nav.jsx';
import ScrollBadge from './components/ScrollBadge.jsx';

import Hero from './sections/Hero.jsx';
import BigIdea from './sections/BigIdea.jsx';
import Capabilities from './sections/Capabilities.jsx';
import GrowthEngine from './sections/GrowthEngine.jsx';
import SelectedWork from './sections/SelectedWork.jsx';
import Approach from './sections/Approach.jsx';
import WhyBootstack from './sections/WhyBootstack.jsx';
import TechStack from './sections/TechStack.jsx';
import Impact from './sections/Impact.jsx';
import Voices from './sections/Voices.jsx';
import About from './sections/About.jsx';
import FinalCta from './sections/FinalCta.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready);
  useReveal([ready]);
  useScrollFlex(ready);

  // Layout settles after the loader lifts and webfonts land — recalculate every
  // pinned trigger once, rather than fighting stale measurements later.
  useEffect(() => {
    if (!ready) return undefined;
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 220);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', refresh);
    };
  }, [ready]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', !ready);
  }, [ready]);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <BackgroundStage />
      <Grain />
      <Nav ready={ready} />
      <ScrollBadge />

      <main id="top">
        <Hero ready={ready} />
        <BigIdea />
        <Capabilities />
        <GrowthEngine />
        <SelectedWork />
        <Approach />
        <WhyBootstack />
        <TechStack />
        <Impact />
        <Voices />
        <About />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
