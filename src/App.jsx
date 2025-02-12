import './App.css'
import AboutUsSection from './components/AboutUsSection'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ServicesSection from './components/ServicesSection'
import TopGroomersSection from './components/TopGroomersSection'
import TopNewsSection from './components/TopNewsSection'
import TopSection from './components/TopSection'

function App() {

  return (
    <div className='app-container w-full min-h-svh bg-white'>
      <Navbar />
      <TopSection />
      <AboutUsSection />
      <TopGroomersSection />
      <ServicesSection />
      <TopNewsSection />
      <Footer />
    </div>
  )
}

export default App
