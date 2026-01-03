import { CodeBlock } from '@/components/CodeBlock';

export default function ConfigurationDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">Configuration</h1>
      </div>

      <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
        Customize the look and feel of your skeletons with the config object.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Interface</h2>
        <CodeBlock language="typescript" code={`interface SkeletonConfig {
  // The animation preset to use
  animation?: AnimationType;
            
  // Base background color (e.g. #d1d5db)
  color?: string;          
  
  // Shimmer/Highlight color for wave animations
  highlightColor?: string; 
  
  // Force a global border radius for all blocks
  borderRadius?: number;   
}`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Animation Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "wave", desc: "Standard left-to-right gradient shimmer (Default)" },
            { name: "pulse", desc: "Opacity fades in and out (0.6 - 1.0)" },
            { name: "glimmer", desc: "Thin white reflection shoots across" },
            { name: "scan", desc: "Cyberpunk-style vertical laser scanner" },
            { name: "neon", desc: "Glowing box-shadow pulse" },
            { name: "breathing", desc: "Subtle scale up/down" },
            { name: "fade-in", desc: "Simple fade in on mount" },
            { name: "slide-in", desc: "Slide up + fade in on mount" },
            { name: "bounce", desc: "Gentle vertical bounce" },
            { name: "classic", desc: "Static gray box (no animation)" }
          ].map(anim => (
            <div key={anim.name} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <code className="text-rose-400 font-bold block mb-2">{anim.name}</code>
              <p className="text-zinc-500 text-sm">{anim.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
