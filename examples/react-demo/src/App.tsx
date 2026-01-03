import { useState } from 'react';
import { type SkeletonConfig } from 'skull-dom';
import { DashboardExample } from './DashboardExample';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<SkeletonConfig>({ animation: 'wave' });

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">SkullDOM Dashboard Demo</h1>
        <DashboardExample
          config={config}
          isLoading={isLoading}
          onConfigChange={setConfig}
          onLoadingToggle={setIsLoading}
        />
      </div>
    </div>
  );
}

export default App;
