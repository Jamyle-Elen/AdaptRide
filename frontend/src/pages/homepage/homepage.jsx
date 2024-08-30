import react from "react";
import NavBar from "../../components/NavBar/navbar.jsx";
import HeroSection from "../../components/HomeSections/HeroSection/herosection.jsx";
import AboutUsSection from "../../components/HomeSections/AboutUsSection/AboutUsSection.jsx";
import BenefitsSection from "../../components/HomeSections/BenefitsSection/BenefitsSection.jsx";
import Footer from "../../components/Footer/footer.jsx";
import "./homepage.css";


function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <AboutUsSection />
      <BenefitsSection />
      <Footer />
    </>
  );
}

export default HomePage;
