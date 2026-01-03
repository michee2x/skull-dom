import { CodeBlock } from '../../components/CodeBlock';

export default function ReactDocs() {
  return (
    <div className="max-w-3xl pb-20">
      <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
        <h1 className="text-4xl font-bold text-black">React</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Usage</h2>
        <p className="text-zinc-400 mb-4">
          SkullDOM provides a <code className="text-rose-400">useSkeleton</code> hook for React applications.
        </p>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Basic Example</h3>
        <CodeBlock language="tsx" code={`import { useRef } from 'react';
import { useSkeleton } from 'skull-dom/react';

function UserCard({ isLoading, user }) {
  const ref = useRef(null);
  
  // Attaches skeleton when isLoading is true
  useSkeleton(ref, isLoading);

  return (
    <div ref={ref} className="card p-4 border rounded">
      <img src={user.avatar} className="w-12 h-12 rounded-full" />
      <h3 className="font-bold">{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Configuration</h2>
        <p className="text-zinc-400 mb-4">
          You can pass a configuration object as the third argument to customize the animation and style.
        </p>

        <CodeBlock language="tsx" code={`useSkeleton(ref, isLoading, { 
  animation: 'neon', 
  color: '#3b82f6', // Custom blue base
  borderRadius: 8   // Force border radius
});`} />
      </section>
    </div>
  );
}
