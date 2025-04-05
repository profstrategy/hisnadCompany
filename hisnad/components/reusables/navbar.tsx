'use client'
import React, { useEffect, useState } from 'react'
import { logo } from '@/public';
import Link from 'next/link';
import Image from 'next/image';
import { DesktopNavLinksProps, MobileNavMenuProps, NavItems } from '@/constants/types';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import AppButton from '@/components/reusables/app-button';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBarsStaggered } from 'react-icons/fa6';
import { navItems } from '@/constants/contents';


// Logo Component
const Logo = () => {
  return (
    <Link href="/">
      <div className="flex gap-2 mobile:gap-3 items-center group relative cursor-pointer xmd:w-full rounded-lg whitespace-nowrap">
        <Image
          src={logo}
          className="xmd:w-12 xmd:h-12 lg:w-10 lg:h-10 tab:w-8 tab:h-7"
          alt="Brand Logo"
          width={50}
          height={50}
        />
        {/* <div className="tab:hidden xmd:relative tab:group-hover:block transition-all">
          Hisnad
        </div> */}
      </div>
    </Link>
  );
}

const DesktopNavMenu = ({ navItems, activeItem, setActiveItem }: DesktopNavLinksProps) => {
  return (
    <ul className="flex items-center justify-center lg:gap-12 md:gap-10">
      {navItems?.map((item) => (
        <li
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          className={`mobile:hidden xmd:hidden hidden md:flex hover:text-hover-color transition-all cursor-pointer md:text-[1rem] xmd:text-sm ${item.id === activeItem
              ? ' text-accent-secondary opacity-40 font-bold'
              : `text-black`
            }`}
        >
          <Link href={`/${item.id}`}>{item.item}</Link>
        </li>
      ))}
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-subtle-accent absolute top-28 left-5 right-5 shadow-sm bottom-0 lg:hidden tab:hidden grid items-center justify-center md:hidden px-4 z-50"
        >
        <motion.div
          
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed z-10 w-full xmd:mx-auto md:w-[80%] min-h-9/12 max-h-[1000px] overflow-y-scroll drop-shadow-xs lg:hidden tab:hidden bg-white"
        >
          <motion.ul
            className="text-sm font-normal gap-6 flex flex-col justify-start items-center relative mt-8 p-6"
            initial="closed"
            animate="open"
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
              closed: {
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {navItems?.map((item) => (
              <motion.li
                key={item.id}
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsOpen(false);
                }}
                className={`mobile:block w-full text-center tab:hidden hover:text-hover-color transition-all p-3 cursor-pointer border-b border-border-primary shadow-2xs grid items-center ${item.id === activeItem
                    ? ' text-accent-secondary opacity-40 font-bold'
                    : `text-black text-[1rem]`
                  }`}
              >
                <Link href={`/${item.id}`}>{item.item}</Link>
              </motion.li>
            ))}

            <motion.div
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: 20, opacity: 0 },
              }}
              className="w-full flex justify-center pt-4"
            >
              <Link
                href={``}
                className="w-full flex justify-center"
              >
                <AppButton
                  className="text-fz-xs w-full text-white"
                  icon={<IoMdArrowRoundForward />}
                  onClick={() => {
                    router.push(
                      ``
                    );
                  }}
                  
                >
                  Get Started
                </AppButton>
              </Link>
            </motion.div>
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
  const [activeItem, setActiveItem] = useState(
    pathname === '/' ? '/' : pathname.slice(1)
  );
  const router = useRouter();
  

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active item when pathname changes
  useEffect(() => {
    setActiveItem(pathname === '/home' ? '/' : pathname.slice(1));
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
        document.body.style.backgroundColor = "";
        // document.body.style.opacity = "0.9"
        document.body.style.transition = "opacity 0.3s ease, background-color 0.3s ease";
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.opacity = "";
      }

    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
        document.body.style.backgroundColor = "";
        // document.body.style.opacity = "";
    };

}, [isOpen]);

  return (
    <section
      className=' border-b border-border-primary shadow-xs'
    >
      <nav
        className='bg-white max-w-[700px] px-2 xmd:px-4 md:px-6 lg:px-8 h-16 mx-auto grid items-center sm:max-w-[125rem] lg:max-w-[75rem]'
      >
        <ul className="flex justify-between items-center">
          <Logo />

          <DesktopNavMenu
            navItems={navItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
         
         
            <Link
              href={``}
              aria-label="Get started with Hisnad"
            >
              <AppButton
                className=" font-bold xmd:hidden hidden md:flex items-center justify-center " variant='secondary'
                icon={<IoMdArrowRoundForward className="w-6 h-4" />}
                onClick={() =>
                  router.push(``)
                }
              >
                Get Started
              </AppButton>
            </Link>
            


            <button
              className={` rounded-sm p-1 cursor-pointer md:hidden z-50`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <LiaTimesSolid
                  className={`w-6 h-6 text-black`}
                />
              ) : (
                <FaBarsStaggered
                  className={`w-6 h-6 text-black`}
                />
              )}
            </button>
          
        </ul>
      </nav>

      <MobileNavMenu
        isOpen={isOpen}
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setIsOpen={setIsOpen}
      />
    </section>
  )
}

export default Navbar