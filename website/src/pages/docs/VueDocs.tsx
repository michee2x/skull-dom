import { CodeBlock } from '../../components/CodeBlock';

export default function VueDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">Vue</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Usage</h2>
        <p className="text-zinc-400 mb-4">
          Use the <code className="text-emerald-400">v-skeleton</code> directive in your templates.
        </p>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Basic Example</h3>
        <CodeBlock language="html" code={`<script setup>
import { vSkeleton } from 'skull-dom/vue';
defineProps(['loading']);
</script>

<template>
  <div v-skeleton="loading" class="card">
    <div class="header">
      <img src="/avatar.jpg" />
      <h3>User Name</h3>
    </div>
    <p>Some descripion text here...</p>
  </div>
</template>`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Configuration</h2>
        <p className="text-zinc-400 mb-4">
          To pass configuration, bind an object instead of a boolean:
        </p>

        <CodeBlock language="html" code={`<template>
  <div 
    v-skeleton="{ 
      loading: isLoading, 
      config: { animation: 'glimmer', highlightColor: '#fff' } 
    }"
  >
    <!-- Content -->
  </div>
</template>`} />
      </section>
    </div>
  );
}
