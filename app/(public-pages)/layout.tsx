export default function PublicPagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}