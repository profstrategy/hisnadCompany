import NewUser from '@/app/(public-pages)/_components/onboarding-page/new-user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Your Profile | Confirm access',
  description:
    'Start your profile setup and preferences to get started with our platform.',
  keywords: 'profile setup, onboarding, registration, confirm access',
};

export default function StepOnePage() {
  return <NewUser />;
}