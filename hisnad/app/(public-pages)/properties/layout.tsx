import Banner from "@/components/reusables/banner";
import Footer from "@/components/reusables/footer";
import Navbar from "@/components/reusables/navbar";

export default function PropertiesPagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}