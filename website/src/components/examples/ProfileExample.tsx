import { useRef } from 'react';
import { useSkeleton } from 'skull-dom/react';
import { type SkeletonConfig } from 'skull-dom';
import { MapPin, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import { CompactControls } from '../CompactControls';

interface ProfileExampleProps {
  config?: SkeletonConfig;
  isLoading: boolean;
  onConfigChange: (config: SkeletonConfig) => void;
  onLoadingToggle: (loading: boolean) => void;
}

export function ProfileExample({ config, isLoading, onConfigChange, onLoadingToggle }: ProfileExampleProps) {
  const profileRef = useRef<HTMLDivElement>(null);

  useSkeleton(profileRef, isLoading, config);

  return (
    <div className="relative">
      <CompactControls
        onConfigChange={onConfigChange}
        onLoadingToggle={onLoadingToggle}
        isLoading={isLoading}
      />
      <div ref={profileRef} className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      <div className="px-6 pb-6">
        {/* Profile Picture */}
        <div className="flex items-end gap-6 -mt-16 mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-gradient-to-br from-emerald-400 to-cyan-600 flex items-center justify-center text-4xl font-bold text-white">
            JD
          </div>
          <div className="flex-1 pb-2">
            <h2 className="text-2xl font-bold text-white">John Doe</h2>
            <p className="text-zinc-400">Senior Product Designer</p>
          </div>
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors mb-2">
            Follow
          </button>
        </div>

        {/* Bio */}
        <p className="text-zinc-300 mb-6 leading-relaxed">
          Passionate about creating beautiful and functional user experiences. 
          10+ years of experience in product design and user research.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <p className="text-2xl font-bold text-white">1.2k</p>
            <p className="text-sm text-zinc-400">Followers</p>
          </div>
          <div className="text-center p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <p className="text-2xl font-bold text-white">342</p>
            <p className="text-sm text-zinc-400">Following</p>
          </div>
          <div className="text-center p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-sm text-zinc-400">Projects</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center gap-3 text-zinc-300">
            <Mail className="w-4 h-4 text-zinc-500" />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Phone className="w-4 h-4 text-zinc-500" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Briefcase className="w-4 h-4 text-zinc-500" />
            <span>Design Studio Inc.</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span>Joined March 2020</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
