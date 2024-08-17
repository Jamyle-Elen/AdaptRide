import react from "react";
import NavBar from "../../components/NavBar/navbar.jsx";
import HeroSection from "./herosection.jsx";
import AboutUsSection from "./aboutussection.jsx";
import BenefitsSection from "./BenefitsSection.jsx";
import Footer from "../../components/Footer/footer.jsx";

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
