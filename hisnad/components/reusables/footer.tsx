import { AppHeading } from '@/components/reusables/app-heading';
import { abouthisnad, abouthisnad_1, address, navItems } from '@/constants/contents';
import { license_1, license_2, license_3, logo } from '@/public';
import Image from 'next/image';
import React from 'react';
import { FaSquareInstagram, FaSquareWhatsapp, FaTiktok } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-16'>
      <div className='max-w-[75rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12'>
        {/* Logo & Address */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <Image src={logo} width={60} height={60} alt='logo' />
            <AppHeading className='text-black font-bold' variant='h4'>Hisnad</AppHeading>
          </div>
          <div>
            {address.map((itm) => (
              <p key={itm.id} className='text-sm max-w-[20rem]'>{itm.content}</p>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className='flex flex-col gap-4'>
          <AppHeading className='text-black' variant='h4'>Navigation</AppHeading>
          <ul className='space-y-2'>
            {navItems.map((itm) => (
              <li key={itm.id} className='text-gray-700 text-sm cursor-pointer hover:text-black'>{itm.item}</li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className='flex flex-col gap-4'>
          <AppHeading className='text-black' variant='h4'>Legal</AppHeading>
          <ul className='space-y-2'>
            <li className='text-gray-700 text-sm cursor-pointer hover:text-black'>Resale Policy</li>
            <li className='text-gray-700 text-sm cursor-pointer hover:text-black'>Payment Protection</li>
          </ul>
        </div>

        {/* License */}
        <div className='flex flex-col gap-4'>
          <AppHeading variant='h4'>Licensed by:</AppHeading>
          <div className='flex gap-4 items-center'>
            <Image src={license_3} width={80} height={80} alt='redan' />
            <Image src={license_1} width={40} height={40} alt='efcc' />
            <Image src={license_2} width={50} height={50} alt='estate' />
          </div>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className='border-t border-gray-300 mt-12 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-48 text-center md:text-left'>
        <div>
          <AppHeading variant='h4'>Office Line</AppHeading>
          
          <p className='text-gray-700 text-sm'>+234 704 363 7031</p>
          <p className='text-gray-700 text-sm'>+234 810 444 1104</p>
        </div>
        <div>
          <AppHeading variant='h4'>Email</AppHeading>
          <p className='text-gray-700 text-sm'>hisnadproperty23@gmail.com</p>
        </div>
        <div>
          <AppHeading variant='h4'>Follow Us</AppHeading>
          <div className='flex justify-center md:justify-start gap-4 mt-2'>
            <FiFacebook className='w-6 h-6 cursor-pointer hover:text-blue-600' />
            <FaSquareInstagram className='w-6 h-6 cursor-pointer hover:text-pink-500' />
            <FaTiktok className='w-6 h-6 cursor-pointer hover:text-black' />
            <FaSquareWhatsapp className='w-6 h-6 cursor-pointer hover:text-green-500' />
          </div>
        </div>
      </div>

      {/* About & Copyright */}
      <div className='mt-12 text-center text-sm text-gray-600'>
        {abouthisnad.map((itm) => (
          <p key={itm.id}>{itm.content}</p>
        ))}
        {abouthisnad_1.map((itm) => (
          <p key={itm.id}>{itm.content}</p>
        ))}
        <div className='border-t border-gray-300 mt-4 pt-4'>
          <p>&copy; {new Date().getFullYear()} Hisnad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
