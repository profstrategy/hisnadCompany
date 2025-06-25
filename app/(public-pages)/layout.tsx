import Footer from "@/components/reusables/footer";
import Navbar from "@/components/reusables/navbar";
import WhatsaapChat from "@/components/reusables/whatsaap-chat";

export default function PublicPagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <WhatsaapChat />
            {children}
            <Footer />
        </div>
    )
}