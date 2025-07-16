import CallUs from "@/components/reusables/call-us";
import HeroSection from "./_components/landing-page/landing-page/herosection";
import ActiveProperties from "./_components/properties-page/active-properties";
import OurGoals from "./_components/landing-page/landing-page/our-goals";
import WhyHisnad from "./_components/landing-page/landing-page/why-us";
import GlobalSearch from "./_components/landing-page/landing-page/global-search";
import Faqs from "./_components/landing-page/landing-page/faqs";
import dynamic from "next/dynamic";

const ActiveProperty = dynamic(() => import("@/app/(public-pages)/_components/properties-page/active-properties"), { ssr: false });

export default function PublicPages() {
    return (
        <div className="min-h-screen grid grid-cols-1 gap-20"> 
            <HeroSection />
            <ActiveProperty />
            <OurGoals />
            <WhyHisnad />
            <GlobalSearch />
            <CallUs />
            <Faqs />
        </div>
    )
}