import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Modernize<br />Your Loading States?
        </h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          Join developers who are building better user experiences with automated skeleton screens.
        </p>
        <Link href="/docs">
          <button className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
