'use client'
import React, { useEffect, useState } from 'react'
import { logo } from '@/public';
import Link from 'next/link';
import Image from 'next/image';
import { DesktopNavLinksProps, MobileNavMenuProps } from '@/constants/types';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import AppButton from '@/components/reusables/app-button';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBarsStaggered } from 'react-icons/fa6';
import { navItems } from '@/constants/contents';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage-keys';
import { STATUS } from '@/constants/generic';
import { useSession } from 'next-auth/react';

const userStatus = localStorage.getItem(LOCAL_STORAGE_KEYS.STATUS)

export const Logo = () => {
  return (
    <Link href="/" className="group" aria-label="Hisnad Home">
      <div className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
        <div className="relative">
          <Image
            src={logo}
            alt="Hisnad Logo"
            width={64}
            height={64}
            className="w-10 h-10 sm:w-14 sm:h-14 transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 drop-shadow-lg"
            priority
          />
          <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 -z-10" />
        </div>
        <div className="flex flex-col leading-none transition-all duration-500 group-hover:translate-x-1">
          <h1 className="font-black text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">
            Hisnad
          </h1>
          <span className="font-medium text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
            Home
          </span>
        </div>
      </div>
    </Link>
  );
};

const DesktopNavMenu = ({ navItems, activeItem, setActiveItem }: DesktopNavLinksProps) => {
  const session = useSession()
  const router = useRouter();
  return (
    <ul className="md:flex items-center justify-center lg:gap-8 md:gap-6 hidden">
      {navItems?.map((item) => (
        <li key={item.id} className="relative">
          <Link 
            href={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`px-3 py-2 rounded-md transition-all md:text-[0.95rem] lg:text-[1rem] font-medium relative
              ${
                item.id === activeItem 
                  ? 'text-accent-primary font-semibold' 
                  : 'text-gray-700 hover:text-accent-primary'
              }`}
          >
            {item.item}
            {item.id === activeItem && (
              <motion.span 
                className="absolute bottom-0 left-1/2 h-0.5 bg-accent-primary w-4/5 -translate-x-1/2"
                layoutId="activeNavItem"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        </li>
      ))}

<div className="hidden md:flex items-center">
          <AppButton
            variant="primary"
            className="px-6 text-white"
            icon={<IoMdArrowRoundForward className="w-5 h-5" />}
            onClick={() => userStatus === STATUS.ONBOARDED ? router.push(CLIENT_ROUTES.PublicPages.properties.index) : session.data?.user.email ? router.push(CLIENT_ROUTES.PublicPages.auth.login) : router.push(CLIENT_ROUTES.PublicPages.onboarding.initialStep)}
          >
            { userStatus === STATUS.ONBOARDED ? 'Select a property' : session.data?.user.email ? 'Login' : 'Get Started' }
          </AppButton>
        </div>
    </ul>
  )
}

const MobileNavMenu = ({
  isOpen,
  navItems,
  activeItem,
  setActiveItem,
  setIsOpen,
}: MobileNavMenuProps) => {
  const router = useRouter();
const session = useSession()
  const handleGetStarted = () => {
    setIsOpen(false);
    if(session.data?.user.email) return router.push(CLIENT_ROUTES.PublicPages.auth.login)
    if(userStatus === STATUS.ONBOARDED) return router.push(CLIENT_ROUTES.PublicPages.onboarding.initialStep);
    if(userStatus === STATUS.PENDING) return router.push(CLIENT_ROUTES.PublicPages.properties.index)
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm shadow-xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <LiaTimesSolid className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            <motion.ul
              className="flex flex-col p-6 space-y-4"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navItems?.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: 50, opacity: 0 },
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors
                    ${
                      item.id === activeItem
                        ? 'bg-accent-white/10 text-accent-primary'
                        : 'text-gray-700 hover:bg-white'
                    }`}
                >
                  <Link
                    
                   href={`${item.id}`}
                  >
                    {item.item}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                variants={{
                  open: { x: 0, opacity: 1 },
                  closed: { x: 50, opacity: 0 },
                }}
                transition={{ type: 'spring', stiffness: 500 }}
                className="mt-8"
              >
                <AppButton
                  variant="primary"
                  className="w-full py-3 text-lg text-white"
                  icon={<IoMdArrowRoundForward className="w-5 h-5" />}
                  onClick={handleGetStarted}
                >
                  { userStatus === STATUS.ONBOARDED ? 'Select a property' : session.data?.user.email ? 'Login' : 'Get Started' }
                </AppButton>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getTopLevelRoute = (path:string) => {
  if (path === '/') return '/';
  return `/${path.split('/')[1]}`;
};
 const [activeItem, setActiveItem] = useState(() => getTopLevelRoute(pathname));

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveItem(getTopLevelRoute(pathname));
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
      hasScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <Logo />

        <DesktopNavMenu
          navItems={navItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <LiaTimesSolid className="w-6 h-6 text-gray-700" />
          ) : (
            <FaBarsStaggered className="w-6 h-6 text-gray-700" />
          )}
        </button>

        <MobileNavMenu
          isOpen={isOpen}
          navItems={navItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setIsOpen={setIsOpen}
        />
      </nav>
    </header>
  )
}

export default Navbar;