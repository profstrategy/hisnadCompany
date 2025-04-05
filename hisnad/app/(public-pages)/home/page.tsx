import Features from "../_components/landing-page/features";
import Herosection from "../_components/landing-page/herosection";

export default function PublicPages() {
    return (
        <div className="min-h-screen">
            <Herosection />
            <Features />
        </div>
    )
}