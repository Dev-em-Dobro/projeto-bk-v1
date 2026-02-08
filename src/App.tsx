import Header from './components/Header'
import HeroPromo from './components/HeroPromo'
import Hero from './components/Hero'
// import VideoShowcase from './components/VideoShowcase'
import PromoSection from './components/PromoSection'
import IngredientsShowcase from './components/IngredientsShowcase'
import HmmmSection from './components/HmmmSection'
import NinjaCarousel from './components/NinjaCarousel'
import InteractiveMenu from './components/InteractiveMenu'
import AppSection from './components/AppSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <HeroPromo />
      <Hero />
      {/* <VideoShowcase /> */}
      <PromoSection />
      <IngredientsShowcase />
      <HmmmSection />
      <NinjaCarousel />
      <InteractiveMenu />
      <AppSection />
      <Footer />
    </>
  )
}

export default App

