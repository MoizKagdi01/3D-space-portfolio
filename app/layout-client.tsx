'use client';

import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { Suspense, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Ribbon from "@/components/sub/Ribbons";

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

// Dynamically import heavy components
const StarsCanvas = dynamic(() => import('@/components/main/star-background').then(mod => mod.StarsCanvas), {
  ssr: false,
  loading: () => null
});

const Navbar = dynamic(() => import('@/components/main/navbar').then(mod => mod.Navbar), {
  ssr: true,
  loading: () => null
});

const Footer = dynamic(() => import('@/components/main/footer').then(mod => mod.Footer), {
  ssr: true,
  loading: () => null
});

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      console.error('Error in component');
    }
  }, [hasError]);

  if (hasError) {
    return null;
  }

  return children;
}

export function LayoutContent({ children }: PropsWithChildren) {
  return (
    <body
      className={cn(
        'bg-[#030014] overflow-y-scroll overflow-x-hidden',
        inter.className
      )}
    >
      {/* <Ribbon /> */}
      <ErrorBoundary>
        <StarsCanvas />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      </ErrorBoundary>

      <main>
        <ErrorBoundary>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </body>
  );
} 