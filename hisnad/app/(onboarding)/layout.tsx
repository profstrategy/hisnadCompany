export default function OnboardingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="min-h-screen">
        {children}
      </section>
    );
  }
  