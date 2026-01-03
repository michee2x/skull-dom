import { CodeBlock } from '@/components/CodeBlock';

export default function SolidDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">SolidJS</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Usage</h2>
        <p className="text-zinc-400 mb-4">
          Use the <code className="text-blue-400">use:skeleton</code> directive.
        </p>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Basic Example</h3>
        <CodeBlock language="tsx" code={`import { skeleton } from 'skull-dom/solid';

function MyComponent() {
  const [isLoading, setIsLoading] = createSignal(true);

  return (
    <div use:skeleton={isLoading()} class="card">
      <h3>SolidJS Power</h3>
    </div>
  );
}`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Configuration</h2>
        <p className="text-zinc-400 mb-4">
          Pass an object accessor for configuration.
        </p>

        <CodeBlock language="tsx" code={`<div use:skeleton={{ 
  loading: isLoading(), 
  config: { animation: 'pulse', highlightColor: '#f472b6' } 
}}>
  <!-- Content -->
</div>`} />
      </section>
    </div>
  );
}
