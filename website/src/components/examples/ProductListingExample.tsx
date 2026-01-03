'use client';

import { useRef } from 'react';
import { useSkeleton } from 'skull-dom/react';
import { type SkeletonConfig } from 'skull-dom';
import { ShoppingCart, Zap, Clock } from 'lucide-react';
import { CompactControls } from '../CompactControls';

interface ProductListingExampleProps {
  config?: SkeletonConfig;
  isLoading: boolean;
  onConfigChange: (config: SkeletonConfig) => void;
  onLoadingToggle: (loading: boolean) => void;
}

const products = [
  {
    id: 1,
    name: 'Pro Noise Cancelling Wireless',
    price: '$28.99',
    originalPrice: '$89.99',
    discount: '-68%',
    sold: '5k+ sold',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker Water',
    price: '$12.49',
    originalPrice: '$35.00',
    discount: '-64%',
    sold: '10k+ sold',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 3,
    name: 'RGB Mechanical Gaming Keyboard',
    price: '$45.99',
    originalPrice: '$129.99',
    discount: '-65%',
    sold: '2.3k+ sold',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    isFlash: false
  },
  {
    id: 4,
    name: 'Ergonomic Vertical Mouse',
    price: '$18.89',
    originalPrice: '$49.99',
    discount: '-62%',
    sold: '8.1k+ sold',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 5,
    name: '4K Action Camera Waterproof',
    price: '$39.99',
    originalPrice: '$119.99',
    discount: '-67%',
    sold: '1k+ sold',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    isFlash: false
  },
  {
    id: 6,
    name: 'Mini Portable Projector 1080P',
    price: '$52.99',
    originalPrice: '$150.00',
    discount: '-65%',
    sold: '3.4k+ sold',
    image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    price: '$15.99',
    originalPrice: '$45.00',
    discount: '-64%',
    sold: '15k+ sold',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    isFlash: false
  },
  {
    id: 8,
    name: 'Wireless Earbuds Pro',
    price: '$9.99',
    originalPrice: '$29.99',
    discount: '-67%',
    sold: '50k+ sold',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 9,
    name: 'Smart Home Security Camera',
    price: '$22.99',
    originalPrice: '$69.99',
    discount: '-67%',
    sold: '4.2k+ sold',
    image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=400&h=400&fit=crop',
    isFlash: true
  },
  {
    id: 10,
    name: 'Fast Charger 65W GaN',
    price: '$19.99',
    originalPrice: '$55.00',
    discount: '-63%',
    sold: '7.8k+ sold',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
    isFlash: false
  }
];

export function ProductListingExample({ config, isLoading, onConfigChange, onLoadingToggle }: ProductListingExampleProps) {
  const listingRef = useRef<HTMLDivElement>(null);

  useSkeleton(listingRef, isLoading, config);

  return (
    <div className="relative">
      <CompactControls
        onConfigChange={onConfigChange}
        onLoadingToggle={onLoadingToggle}
        isLoading={isLoading}
      />
      <div ref={listingRef} className="bg-gradient-to-br from-zinc-950 to-black rounded-xl p-4 border border-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
              Flash Deals
            </h3>
            
            <div className="hidden sm:flex items-center gap-1.5 ml-4 bg-zinc-900 px-3 py-1 rounded text-xs font-mono text-white border border-zinc-800">
              <span className="bg-zinc-800 px-1 rounded text-orange-500">02</span>:
              <span className="bg-zinc-800 px-1 rounded text-orange-500">14</span>:
              <span className="bg-zinc-800 px-1 rounded text-orange-500">59</span>
            </div>
          </div>
          
          <button className="text-xs text-zinc-400 hover:text-orange-500 font-medium transition-colors flex items-center gap-1">
            See All <Clock className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800/50 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/5 flex flex-col"
            >
              {/* Product Image */}
              <div className="aspect-[1/1] bg-white relative overflow-hidden p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                />
                
                {product.isFlash && (
                  <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg shadow-sm">
                    Flash Sale
                  </div>
                )}
                
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                    {product.discount}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-3 flex flex-col flex-1 bg-zinc-900">
                <h4 className="text-xs text-zinc-200 line-clamp-2 h-8 leading-tight mb-2 group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h4>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-base font-bold text-orange-500">{product.price}</span>
                    <span className="text-xs text-zinc-500 line-through">{product.originalPrice}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 bg-zinc-800/50 px-1.5 py-0.5 rounded">
                      {product.sold}
                    </span>
                    <button className="w-6 h-6 rounded-full bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center transition-colors">
                      <ShoppingCart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
