import react from 'react';
import NavBar from './navbar/navbar.jsx'
import HeroSection from './herosection.jsx';
import AboutUsSection from './aboutussection.jsx'
// import BenefitsSection from './benefitssection.jsx'

function HomePage() {
    return <>
        <NavBar/>
        <HeroSection/>
        <AboutUsSection/>
        {/* <BenefitsSection/> */}
    </>
}
 
export default HomePage;
