import { CodeBlock } from '../../components/CodeBlock';

export default function Introduction() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">Introduction</h1>
      </div>
      
      <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
        Automagic skeleton screens for any framework. Zero config. Zero manual styles. 
        Just robust, layout-aware loading states.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Why SkullDOM?</h2>
        <p className="text-zinc-400 mb-4 leading-relaxed">
          Most skeleton libraries require you to manually build "skeleton versions" of your components.
          <strong> SkullDOM is different.</strong> It looks at your existing DOM, infers its layout (text, images, grids, flex), 
          and overlays a pixel-perfect skeleton on top of it.
        </p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 ml-4">
          <li><strong>Framework Agnostic:</strong> First-class adapters for React, Vue, Svelte, Solid, and Vanilla.</li>
          <li><strong>0 Layout Shift:</strong> Uses Range API to capture exact text wrapping and dimensions.</li>
          <li><strong>12+ Animations:</strong> Built-in premium animations (Wave, Neon, Glimmer, etc.).</li>
        </ul>
      </section>

      <section id="installation" className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Installation</h2>
        <CodeBlock language="bash" code="npm install skull-dom" />
      </section>
    </div>
  );
}
