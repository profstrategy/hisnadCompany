import Footer from "@/components/reusables/footer";
import WhatsaapChat from "@/components/reusables/whatsaap-chat";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/reusables/navbar"));

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