import React from 'react';
import { SHOP_PRODUCTS } from '../data/content';
import { LiquidButton } from '../components/shared/LiquidButton';
import { useMagnetic } from '../hooks/useMagnetic';

export const ShopView = () => {
  return (
    <div className="grid grid-cols-1 gap-8 pb-40 md:grid-cols-3">
      {SHOP_PRODUCTS.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
};

const ProductCard = ({ p }) => {
  const ref = useMagnetic(0.5);
  return (
    <div
      ref={ref}
      className="glass-card fresnel-border space-y-6 rounded-3xl p-8"
    >
      <div className="h-32 rounded-2xl bg-white/5" />
      <h3 className="text-xl font-bold">{p.name}</h3>
      <p className="text-xs leading-relaxed text-white/40">{p.desc}</p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-accent">${p.price}</span>
        <LiquidButton>Acquire</LiquidButton>
      </div>
    </div>
  );
};
