import { CodeBlock } from '@/components/CodeBlock';

export default function VanillaDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">Vanilla JS / HTML</h1>
      </div>

      <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
        For projects without a framework, or for static HTML sites, SkullDOM uses a MutationObserver.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Initialization</h2>
        <p className="text-zinc-400 mb-4">
          Call <code className="text-yellow-400">initSkeletonObserver()</code> once in your application entry point.
        </p>
        <CodeBlock language="html" code={`<script type="module">
  import { initSkeletonObserver } from 'skull-dom/adapters/vanilla';
  
  // Start the observer
  initSkeletonObserver();
</script>`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Usage</h2>
        <p className="text-zinc-400 mb-4">
          Simply add the <code className="text-yellow-400">data-skeleton="loading"</code> attribute to any element.
        </p>

        <CodeBlock language="html" code={`<div data-skeleton="loading" class="profile-card">
  <img src="avatar.jpg">
  <h3>John Doe</h3>
</div>`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Configuration</h2>
        <p className="text-zinc-400 mb-4">
          Use the <code className="text-yellow-400">data-skeleton-config</code> attribute with a JSON string.
        </p>

        <CodeBlock language="html" code={`<div 
  data-skeleton="loading"
  data-skeleton-config='{ "animation": "wave", "color": "#27272a" }'
>
  <!-- Content -->
</div>`} />
      </section>
    </div>
  );
}
