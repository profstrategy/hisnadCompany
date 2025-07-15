'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import { teamContents } from '@/constants/contents';
import { TeamEmptyState } from '@/components/reusables/empty-states';
import { AppHeading } from '@/components/reusables/app-heading';

const SingularTeam = ({ id }: { id: string }) => {
  const router = useRouter();
  const teamMember = teamContents.find((itm) => itm.id === id);

  if (!teamMember) return <TeamEmptyState />;

  const { name, description, image, role } = teamMember;

  return (
    <section className="">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header Section */}
        <div className="relative min-h-[28rem] sm:min-h-[35rem] md:min-h-[40rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-cover bg-center transform scale-105 hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between h-full py-10 sm:py-16 gap-8 sm:gap-12">
              <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <AppHeading
                    variant="h2"
                    className="text-2xl md:text-5xl  text-white font-bold drop-shadow-lg"
                  >
                    {name}
                  </AppHeading>
                  <p className="text-lg sm:text-xl text-gray-100 mt-4 sm:mt-6 max-w-2xl leading-relaxed font-light drop-shadow mx-auto md:mx-0">
                    {role}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative"
              >
                <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 relative group">
                  <Image
                    src={image}
                    fill
                    className="rounded-3xl object-cover shadow-2xl border-4 border-white/30 group-hover:border-white/50 transition-all duration-300 transform group-hover:scale-105"
                    quality={100}
                    alt={name}
                    priority
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('./')}
          className="flex items-center gap-2 bg-accent-primary text-white rounded-full px-4 py-2 mb-12 hover:bg-accent-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg mx-auto"
        >
          <FaArrowLeft className="text-base sm:text-lg" />
          <span className="font-medium text-sm sm:text-base">
            Back to Team
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default SingularTeam;
