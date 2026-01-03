import { useState } from 'react';
import { DashboardExample } from '../components/examples/DashboardExample';
import { ProfileExample } from '../components/examples/ProfileExample';
import { ProductListingExample } from '../components/examples/ProductListingExample';
import { type SkeletonConfig } from 'skull-dom';

export default function Examples() {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  
  const [dashboardConfig, setDashboardConfig] = useState<SkeletonConfig>({ animation: 'wave' });
  const [profileConfig, setProfileConfig] = useState<SkeletonConfig>({ animation: 'wave' });
  const [productConfig, setProductConfig] = useState<SkeletonConfig>({ animation: 'wave' });

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-4">
          <h1 className="text-4xl font-bold text-black">Live Examples</h1>
        </div>
        
        <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
          See SkullDOM in action with real UI components. Toggle loading states and experiment with different animation presets using the controls in the top-right of each example.
        </p>

        {/* Dashboard Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Dashboard Analytics</h2>
          <p className="text-zinc-400 mb-6">
            A modern analytics dashboard with stats cards and activity feed.
          </p>
          <DashboardExample 
            config={dashboardConfig} 
            isLoading={dashboardLoading}
            onConfigChange={setDashboardConfig}
            onLoadingToggle={setDashboardLoading}
          />
        </section>

        {/* Profile Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">User Profile</h2>
          <p className="text-zinc-400 mb-6">
            A detailed user profile with cover image, stats, and contact information.
          </p>
          <ProfileExample 
            config={profileConfig} 
            isLoading={profileLoading}
            onConfigChange={setProfileConfig}
            onLoadingToggle={setProfileLoading}
          />
        </section>

        {/* Product Listing Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Product Listing</h2>
          <p className="text-zinc-400 mb-6">
            An e-commerce product grid with images, ratings, and add-to-cart buttons.
          </p>
          <ProductListingExample 
            config={productConfig} 
            isLoading={productLoading}
            onConfigChange={setProductConfig}
            onLoadingToggle={setProductLoading}
          />
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Install SkullDOM and add beautiful skeleton screens to your application in minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/docs"
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              View Documentation
            </a>
            <a
              href="https://github.com/michee2x/skull-dom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black/30 backdrop-blur text-white font-semibold rounded-lg border border-white/20 hover:bg-black/50 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
