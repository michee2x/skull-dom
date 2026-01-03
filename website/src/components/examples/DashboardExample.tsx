import { useRef, useState, useEffect } from 'react';
import { useSkeleton } from 'skull-dom/react';
import { type SkeletonConfig } from 'skull-dom';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';
import { CompactControls } from '../CompactControls';

interface DashboardExampleProps {
  config?: SkeletonConfig;
  isLoading: boolean;
  onConfigChange: (config: SkeletonConfig) => void;
  onLoadingToggle: (loading: boolean) => void;
}

export function DashboardExample({ config, isLoading, onConfigChange, onLoadingToggle }: DashboardExampleProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState({
    revenue: '$45,231',
    users: '2,350',
    orders: '1,234',
    growth: '+12.5%'
  });

  useSkeleton(dashboardRef, isLoading, config);

  useEffect(() => {
    if (!isLoading) {
      // Simulate data loading
      setTimeout(() => {
        setData({
          revenue: '$45,231',
          users: '2,350',
          orders: '1,234',
          growth: '+12.5%'
        });
      }, 100);
    }
  }, [isLoading]);

  return (
    <div className="relative">
      <CompactControls
        onConfigChange={onConfigChange}
        onLoadingToggle={onLoadingToggle}
        isLoading={isLoading}
      />
      <div ref={dashboardRef} className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
      <h3 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.revenue}</p>
          <p className="text-xs text-emerald-400 mt-1">+20.1% from last month</p>
        </div>

        <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Active Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.users}</p>
          <p className="text-xs text-blue-400 mt-1">+180 this week</p>
        </div>

        <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Orders</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.orders}</p>
          <p className="text-xs text-purple-400 mt-1">+19% from last week</p>
        </div>

        <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Growth</span>
            <span className="w-4 h-4 text-rose-400 rounded-lg"><TrendingUp /></span>
          </div>
          <p className="text-2xl font-bold text-white">{data.growth}</p>
          <p className="text-xs text-rose-400 mt-1">Trending upward</p>
        </div>
      </div>

      <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-6 border border-zinc-700">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-zinc-900/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="flex-1">
                <p className="text-white font-medium">New order received</p>
                <p className="text-zinc-400 mt-1 text-sm">Order #{1000 + i} • 2 minutes ago</p>
              </div>
              <span className="text-emerald-400 font-semibold">$299</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
