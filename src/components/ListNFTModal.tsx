import React, { useState } from 'react';
import { NFTItem, WalletState } from '../types/nft';
import { X, Tag, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { MARKETPLACE_CONTRACT_ADDRESS } from '../contracts/addresses';

interface ListNFTModalProps {
  nft: NFTItem | null;
  wallet: WalletState;
  isOpen: boolean;
  onClose: () => void;
  onConfirmList: (nft: NFTItem, priceSepoliaETH: string) => void;
  isLoading: boolean;
}

export const ListNFTModal: React.FC<ListNFTModalProps> = ({
  nft,
  wallet,
  isOpen,
  onClose,
  onConfirmList,
  isLoading,
}) => {
  const [priceInput, setPriceInput] = useState('0.05');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !nft) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = parseFloat(priceInput);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Please specify a valid price greater than 0 SepoliaETH.');
      return;
    }

    onConfirmList(nft, priceInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#141022] border border-purple-800/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              List NFT on Marketplace
            </h3>
            <p className="text-xs text-slate-400">
              ตั้งราคาขายในหน่วย SepoliaETH และอนุมัติสิทธิ์ใน Smart Contract เพื่อวางขายบนตลาด
            </p>
          </div>
        </div>

        {/* Selected NFT Preview */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0c0818] border border-purple-950 mb-6">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-16 h-16 rounded-xl object-cover bg-slate-900 ring-1 ring-purple-500/30"
          />
          <div className="truncate">
            <h4 className="font-display font-semibold text-sm text-white truncate">
              {nft.title}
            </h4>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Token #{nft.tokenId} · ERC-721
            </div>
            <div className="text-[11px] text-purple-400 font-mono mt-0.5">
              Sepolia Testnet
            </div>
          </div>
        </div>

        {/* Price Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Listing Price (กำหนดราคาขายในหน่วย SepoliaETH เท่านั้น)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="0.05"
                disabled={isLoading}
                className="w-full pl-4 pr-28 py-3 rounded-2xl bg-[#0b0717] border border-purple-900/60 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono text-base text-white placeholder:text-slate-600 disabled:opacity-50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-xs font-mono font-semibold text-purple-300">
                SepoliaETH
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/50 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Workflow explanation */}
          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-900/40 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>2-Step On-Chain Execution</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              1. ป๊อปอัป MetaMask: อนุมัติสิทธิ์ (Approve) สัญญา NFT ให้กับ Marketplace ({MARKETPLACE_CONTRACT_ADDRESS.slice(0, 6)}...{MARKETPLACE_CONTRACT_ADDRESS.slice(-4)})
              <br />
              2. ป๊อปอัป MetaMask: ยืนยันการวางขาย (listItem) ตามราคาที่คุณกำหนด
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Processing Listing...' : 'Confirm Listing'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
