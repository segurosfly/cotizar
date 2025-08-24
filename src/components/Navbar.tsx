'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  // Check if we're on a payment page
  const isPaymentPage = pathname?.includes('/payment/');
  
  // Extract the quoter ID from the payment URL for the back link
  const getQuoterIdFromPath = () => {
    if (isPaymentPage) {
      const segments = pathname.split('/');
      const paymentIndex = segments.findIndex(segment => segment === 'payment');
      if (paymentIndex !== -1 && segments[paymentIndex + 1]) {
        return segments[paymentIndex + 1];
      }
    }
    return null;
  };
  
  const quoterId = getQuoterIdFromPath();
  const locale = pathname?.split('/')[1] || 'es';

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-10 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={120} height={40} />
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center space-x-8">
        {isPaymentPage && quoterId && (
          <Link
            href="/details"
            className="font-medium hover:opacity-80 transition-colors flex items-center"
            style={{ color: '#0A9CD9' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Volver a Details
          </Link>
        )}
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      <button className="md:hidden p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
