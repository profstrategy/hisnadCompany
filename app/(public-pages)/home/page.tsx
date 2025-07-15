import CallUs from "@/components/reusables/call-us";
import Faqs from "../_components/landing-page/landing-page/faqs";
import GlobalSearch from "../_components/landing-page/landing-page/global-search";
import HeroSection from "../_components/landing-page/landing-page/herosection";
import OurGoals from "../_components/landing-page/landing-page/our-goals";
import WhyHisnad from "../_components/landing-page/landing-page/why-us";
import ActiveProperties from "../_components/properties-page/active-properties";


export default function PublicPages() {
    return (
        <div className="min-h-screen grid grid-cols-1 gap-20">
            <HeroSection />
            <ActiveProperties />
            <OurGoals />
            <WhyHisnad />
            <GlobalSearch />
            <CallUs />
            <Faqs />
        </div>
    )
}