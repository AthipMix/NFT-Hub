import React from 'react';
import { NFTItem, WalletState } from '../types/nft';
import { Heart, Sparkles, User, ShoppingBag } from 'lucide-react';

interface NFTCardProps {
  nft: NFTItem;
  wallet: WalletState;
  onSelect: (nft: NFTItem) => void;
  onQuickBuy?: (nft: NFTItem, e: React.MouseEvent) => void;
  onToggleLike?: (nftId: string, e: React.MouseEvent) => void;
  isLiked?: boolean;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  wallet,
  onSelect,
  onQuickBuy,
  onToggleLike,
  isLiked = false,
}) => {
  const isOwner =
    wallet.isConnected &&
    wallet.address &&
    nft.owner.toLowerCase() === wallet.address.toLowerCase();

  return (
    <div
      onClick={() => onSelect(nft)}
      className="group relative flex flex-col rounded-2xl bg-[#141022] hover:bg-[#1a152d] border border-purple-900/40 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Artwork Header */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Category Tag */}
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-purple-300 border border-purple-500/20">
            {nft.category}
          </span>

          {/* Likes Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleLike) onToggleLike(nft.id, e);
            }}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-slate-200 hover:text-pink-400 border border-white/10 transition-colors"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-300'
              }`}
            />
            <span>{nft.likes + (isLiked ? 1 : 0)}</span>
          </button>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090810]/95 via-[#090810]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          {nft.isListed ? (
            isOwner ? (
              <div className="w-full py-2.5 rounded-xl bg-purple-900/80 backdrop-blur-md border border-purple-500/50 text-center text-xs font-semibold text-purple-200">
                You are the Owner
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onQuickBuy) onQuickBuy(nft, e);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Now ({nft.priceSepoliaETH} SepoliaETH)</span>
              </button>
            )
          ) : (
            <div className="w-full text-center">
              <button
                disabled
                className="w-full py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-400 text-xs font-semibold cursor-not-allowed mb-1"
              >
                Showcase Only
              </button>
              <div className="text-[10px] text-purple-300/80">ผลงานนี้จัดแสดงอย่างเดียว ยังไม่เปิดขาย</div>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">Token ID: #{nft.tokenId}</span>
            <span className="text-[11px] text-purple-400">Sepolia</span>
          </div>

          <h3 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2">
            {nft.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <img
              src={nft.creator.avatar}
              alt={nft.creator.name}
              className="w-5 h-5 rounded-full ring-1 ring-purple-500/40"
            />
            <span className="text-xs text-slate-300 truncate max-w-[120px]">
              {nft.creator.name}
            </span>
          </div>
        </div>

        {/* Price & Status Footer */}
        <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              {nft.isListed ? 'Price' : 'Status'}
            </div>
            <div className="text-sm font-mono font-bold">
              {nft.isListed ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  {nft.priceSepoliaETH} <span className="text-xs font-sans text-purple-400">SepoliaETH</span>
                </span>
              ) : (
                <span className="text-slate-400 text-xs font-sans">Showcase Only</span>
              )}
            </div>
          </div>

          <div>
            {isOwner ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-[11px] font-semibold text-purple-300">
                <User className="w-3 h-3 text-purple-400" />
                <span>You are the Owner</span>
              </span>
            ) : nft.isListed ? (
              <span className="text-xs font-medium text-purple-400 group-hover:text-pink-400 transition-colors">
                Buy Now &rarr;
              </span>
            ) : (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Showcase Only
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
