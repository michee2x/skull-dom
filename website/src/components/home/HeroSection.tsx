import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-neutral-900 border border-neutral-700 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-neutral-300">
              v1.0.0 Now Available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-white">Automagic <br /> Skeleton Screens</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] mt-10 md:text-xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Zero config. Zero manual styles. SkullDOM infers your layout and generates 
           <br /> <span className="font-semibold text-white"> pixel-perfect skeletons</span> instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <Link href="/docs" className="w-full sm:w-auto">
              <button className="btn-primary flex items-center justify-center gap-2 text-[14px] md:text-base w-full">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button 
              onClick={() => {
                document.querySelector('.code-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-[14px] md:text-base w-full sm:w-auto"
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-neutral-400">Zero Dependencies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-400">Framework Agnostic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-gray-400">TypeScript First</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
