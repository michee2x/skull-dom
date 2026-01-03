import { CodeBlock } from '@/components/CodeBlock';

export default function SvelteDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">Svelte</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Usage</h2>
        <p className="text-zinc-400 mb-4">
          Use the <code className="text-orange-400">skeleton</code> action.
        </p>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Basic Example</h3>
        <CodeBlock language="html" code={`<script>
  import { skeleton } from 'skull-dom/svelte';
  export let loading = true;
</script>

<div use:skeleton={loading} class="card">
  <h3>Svelte Component</h3>
  <p>Loading content...</p>
</div>`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Configuration</h2>
        <p className="text-zinc-400 mb-4">
          Pass an object with <code className="text-zinc-300">loading</code> and <code className="text-zinc-300">config</code> properties.
        </p>

        <CodeBlock language="html" code={`<div use:skeleton={{ 
  loading, 
  config: { animation: 'scan', color: '#18181b' } 
}}>
  <!-- Content -->
</div>`} />
      </section>
    </div>
  );
}
