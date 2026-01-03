'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/home/HeroSection';
import CodeDemoSection from '@/components/home/CodeDemoSection';
import ComparisonSection from '@/components/home/ComparisonSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import CTASection from '@/components/home/CTASection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Code snippet reveal
      gsap.from('.code-demo', {
        scale: 0.98,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.code-section',
          start: 'top 65%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (    
    <div ref={containerRef} className="overflow-hidden bg-black">
      <HeroSection />                                                                                                   
      <CodeDemoSection />
      <ComparisonSection />
      <FeaturesGrid />
      <CTASection />
    </div>
  );
}
