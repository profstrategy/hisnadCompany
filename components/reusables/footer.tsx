import { AppHeading } from '@/components/reusables/app-heading';
import { abouthisnad, abouthisnad_1, navItems } from '@/constants/contents';
import { license_1, license_2, license_3, logo } from '@/public';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaSquareInstagram, FaTiktok } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='text-gray-800 pt-16 pb-8 px-6 md:px-12 lg:px-16 bg-gray-50'>
      <div className='max-w-[75rem] mx-auto'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-[500px_1fr] gap-16 mb-12'>
          {/* Logo & Address Section */}
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
              <Image src={logo} width={60} height={60} alt='logo' />
              <AppHeading className='text-black font-bold' variant='h4'>Hisnad</AppHeading>
            </div>
            <div className='space-y-3'>
              {abouthisnad.map((itm) => (
                <p key={itm.id} className='text-gray-700 leading-relaxed'>{itm.content}</p>
              ))}
              {abouthisnad_1.map((itm) => (
                <p key={itm.id} className='text-gray-700 leading-relaxed'>{itm.content}</p>
              ))}
            </div>
          </div>

          {/* Navigation and Links Section */}
          <div className="flex flex-col gap-8">
            {/* Navigation & Legal Links */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
              {/* Navigation */}
              <div className='flex flex-col gap-4'>
                <AppHeading className='text-black font-semibold' variant='h4'>Navigation</AppHeading>
                <ul className='space-y-3'>
                  {navItems.map((itm) => (
                    <Link href={`/${itm.id}`} key={itm.id}>
                      <li className='text-gray-700 text-sm cursor-pointer hover:text-black transition-colors duration-200'>
                        {itm.item}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className='flex flex-col gap-4'>
                <AppHeading className='text-black font-semibold' variant='h4'>Legal</AppHeading>
                <ul className='space-y-3'>
                  <li className='text-gray-700 text-sm cursor-pointer hover:text-black transition-colors duration-200'>
                    Resale Policy
                  </li>
                  <li className='text-gray-700 text-sm cursor-pointer hover:text-black transition-colors duration-200'>
                    Payment Protection
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media & License Section */}
            <div className='flex flex-col sm:flex-row gap-8 sm:justify-between sm:items-start'>
              {/* Social Media */}
              <div className="flex flex-col gap-4">
                <AppHeading className='text-black font-semibold' variant='h4'>Follow Us</AppHeading>
                <div className='flex gap-5'>
                  <Link href={'https://www.facebook.com/share/1HzG575Jx7/?mibextid=wwXIfr'} target='_blank'>
                    <FiFacebook className='w-7 h-7 cursor-pointer hover:text-blue-600 transition-colors duration-200' />
                  </Link>
                  <Link href={'https://www.instagram.com/hisnad_homes?igsh=MXBmaGkxZDAxcjRncw%3D%3D&utm_source=qr'} target='_blank'>
                    <FaSquareInstagram className='w-7 h-7 cursor-pointer hover:text-pink-500 transition-colors duration-200' />
                  </Link>
                  <Link href={'https://www.tiktok.com/@userhisnad63?_t=ZM-8yF1z2evcoP&_r=1'} target='_blank'>
                    <FaTiktok className='w-7 h-7 cursor-pointer hover:text-black transition-colors duration-200' />
                  </Link>
                </div>
              </div>

              {/* License */}
              <div className='flex flex-col gap-4'>
                <AppHeading className='text-black font-semibold' variant='h4'>Licensed by:</AppHeading>
                <div className='flex gap-4 items-center flex-wrap'>
                  <Image src={license_3} width={80} height={80} alt='redan' className='h-auto w-auto' />
                  <Image src={license_1} width={40} height={40} alt='efcc' />
                  <Image src={license_2} width={50} height={50} alt='estate' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-300 pt-6 mt-8'>
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              &copy; {new Date().getFullYear()} Hisnad. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;