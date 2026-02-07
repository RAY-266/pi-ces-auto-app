
import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
// Fix: Use getShops instead of the non-existent getAllShops
import { getShops } from '../services/dataManager';
import { Shop } from '../types';

interface ShopsPageProps {
  isAdmin?: boolean;
}

const ShopsPage: React.FC<ShopsPageProps> = ({ isAdmin = false }) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShops = async () => {
      try {
        // Fix: Call the correct exported function getShops()
        const data = await getShops();
        setShops(data);
      } finally {
        setLoading(false);
      }
    };
    loadShops();
  }, []);

  return (
    <div className="flex flex-col pb-24 min-h-screen bg-slate-50 dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark px-4 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Boutiques Partenaires</h1>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
           <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4">
          {shops.map(shop => (
            <div 
              key={shop.id} 
              onClick={() => setSelectedShop(shop)}
              className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-slate-900 dark:text-white font-black truncate text-sm">{shop.name}</p>
                  {shop.verified && <span className="material-symbols-outlined text-primary text-base filled">verified</span>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">{shop.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedShop && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedShop(null)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-surface-dark rounded-t-[40px] shadow-2xl p-8 animate-in slide-in-from-bottom duration-300">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{selectedShop.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed mb-6">
              {selectedShop.description}
            </p>
            {selectedShop.phone && (
              <p className="mb-4 text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">chat</span>
                WhatsApp: {selectedShop.phone}
              </p>
            )}
            <button 
              onClick={() => setSelectedShop(null)}
              className="w-full bg-primary text-white h-14 rounded-2xl font-black shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <BottomNav isAdmin={isAdmin} />
    </div>
  );
};

export default ShopsPage;
