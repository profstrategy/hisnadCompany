import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const ContactPageSection = dynamic(
  () =>
    import('@/app/(public-pages)/_components/contact-page/contact-page-section').then(
      (mod) => mod.ContactPageSection
    )
);

export default function ContactPage() {
  return (
    <main>
      <ContactPageSection />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Contact Us | Hisnad Homes and Properties Limited',
  description:
    'Get in touch with Hisnad Homes and Properties. Contact our expert team for inquiries about packages, bookings, and personalized pilgrimage services.',
  keywords: [
    'contact hisnad',
    'property inspection contact',
    'property booking inquiry',
    'real estate travel agency contact',
    'agriculture services contact',
    'real estate agency nigeria',
  ].join(', '),
  openGraph: {
    title: 'Contact Us | Hisnad Homes and Property Limited',
    description:
     'Get in touch with Hisnad Homes and Property Limited for all your real estate and agriculture investment needs. Contact our expert team for inquiries about packages, bookings, and personalized services.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Hisnad Homes and Property Limited',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Hisnad Homes and Property Limited',
    description:
      'Get in touch with Hisnad Homes and Property Limited for all your real estate and agriculture investment needs. Contact our expert team for inquiries about packages, bookings, and personalized services.',
  },
  alternates: {
    canonical: 'https://hisnad.com/contact',
  },
};