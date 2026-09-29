import React, { useState, useEffect } from 'react';
import { NFTItem, WalletState } from '../types/nft';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Clock,
  Heart,
  Share2,
  Tag,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { ETHERSCAN_SEPOLIA_BASE_URL, NFT_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS } from '../contracts/addresses';

interface NFTDetailsModalProps {
  nft: NFTItem | null;
  wallet: WalletState;
  onClose: () => void;
  onBuyItem: (nft: NFTItem) => void;
  onOpenListModal: (nft: NFTItem) => void;
  onCancelListing: (nft: NFTItem) => void;
  onConnectWallet: () => void;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const NFTDetailsModal: React.FC<NFTDetailsModalProps> = ({
  nft,
  wallet,
  onClose,
  onBuyItem,
  onOpenListModal,
  onCancelListing,
  onConnectWallet,
  isLiked = false,
  onToggleLike,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'attributes' | 'history'>('info');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Real-time countdown simulation
  const [countdown, setCountdown] = useState({
    days: '05',
    hours: '26',
    minutes: '19',
    seconds: '42',
  });

  useEffect(() => {
    if (!nft) return;
    const interval = setInterval(() => {
      const now = new Date();
      const s = String(60 - now.getSeconds()).padStart(2, '0');
      const m = String(59 - now.getMinutes()).padStart(2, '0');
      setCountdown((prev) => ({ ...prev, minutes: m, seconds: s }));
    }, 1000);
    return () => clearInterval(interval);
  }, [nft]);

  if (!nft) return null;

  const isOwner =
    wallet.isConnected &&
    wallet.address &&
    nft.owner.toLowerCase() === wallet.address.toLowerCase();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#141022] border border-purple-800/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-purple-950 text-slate-300 hover:text-white border border-purple-900/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Artwork Showcase (Matching Image 3) */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#0c0818] flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-purple-900/30">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-950 ring-1 ring-purple-500/30">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-purple-300 border border-purple-500/30">
                Token #{nft.tokenId}
              </div>
            </div>

            {/* Network verification indicator */}
            <div className="w-full mt-6 p-3 rounded-2xl bg-[#141022] border border-purple-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300">Sepolia Verified ERC-721</span>
              </div>
              <a
                href={`${ETHERSCAN_SEPOLIA_BASE_URL}/token/${NFT_CONTRACT_ADDRESS}?a=${nft.tokenId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-pink-400 transition-colors"
              >
                <span>Etherscan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Information, Pricing, & Action Buttons */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Top Kicker & Actions */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
                  {nft.category} Collection
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleLike && onToggleLike(nft.id)}
                    className="p-2 rounded-xl bg-slate-900/60 hover:bg-purple-950/60 border border-purple-900/40 text-slate-300 hover:text-pink-400 transition-colors"
                    title="Like NFT"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: nft.title,
                          text: `Check out ${nft.title} on NFT Hub (Ethereum Sepolia Testnet)`,
                          url: window.location.href,
                        });
                      } else {
                        handleCopy(window.location.href);
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-900/60 hover:bg-purple-950/60 border border-purple-900/40 text-slate-300 hover:text-purple-300 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {nft.title}
              </h2>

              {/* Price Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-950/80 to-pink-950/80 border border-purple-500/40 mb-4">
                <span className="text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  {nft.priceSepoliaETH} SepoliaETH
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  {nft.isListed ? '· Listed On-Chain' : '· Showcase Only'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {nft.description}
              </p>

              {/* Creator & Current Owner Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Creator */}
                <div className="p-3 rounded-2xl bg-[#0d0918] border border-purple-950">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Creator</div>
                  <div className="flex items-center gap-2">
                    <img
                      src={nft.creator.avatar}
                      alt={nft.creator.name}
                      className="w-6 h-6 rounded-full ring-1 ring-purple-500/50"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        <span className="truncate">{nft.creator.name}</span>
                        {nft.creator.verified && <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner */}
                <div className="p-3 rounded-2xl bg-[#0d0918] border border-purple-950">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Current Owner</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-300 truncate max-w-[90px]">
                      {isOwner ? 'You' : `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`}
                    </span>
                    <button
                      onClick={() => handleCopy(nft.owner)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copy owner address"
                    >
                      {copiedAddress === nft.owner ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Countdown Bar if Listed */}
              {nft.isListed && (
                <div className="p-4 rounded-2xl bg-[#0d0918] border border-purple-900/40 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Listing Active / Escrow Settlement</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-center">
                    <div className="flex-1 bg-[#141022] p-2 rounded-xl border border-purple-950">
                      <div className="text-base font-bold text-white tabular-nums">{countdown.days}</div>
                      <div className="text-[9px] text-slate-400 uppercase">Days</div>
                    </div>
                    <div className="flex-1 bg-[#141022] p-2 rounded-xl border border-purple-950">
                      <div className="text-base font-bold text-white tabular-nums">{countdown.hours}</div>
                      <div className="text-[9px] text-slate-400 uppercase">Hours</div>
                    </div>
                    <div className="flex-1 bg-[#141022] p-2 rounded-xl border border-purple-950">
                      <div className="text-base font-bold text-white tabular-nums">{countdown.minutes}</div>
                      <div className="text-[9px] text-slate-400 uppercase">Minutes</div>
                    </div>
                    <div className="flex-1 bg-[#141022] p-2 rounded-xl border border-purple-950">
                      <div className="text-base font-bold text-purple-400 tabular-nums">{countdown.seconds}</div>
                      <div className="text-[9px] text-slate-400 uppercase">Seconds</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Tabs (Info / Attributes / History) */}
              <div className="mb-6">
                <div className="flex items-center gap-2 border-b border-purple-900/40 pb-2 mb-3">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`text-xs font-semibold pb-1 transition-colors cursor-pointer ${
                      activeTab === 'info'
                        ? 'text-purple-400 border-b-2 border-purple-500'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setActiveTab('attributes')}
                    className={`text-xs font-semibold pb-1 transition-colors cursor-pointer ${
                      activeTab === 'attributes'
                        ? 'text-purple-400 border-b-2 border-purple-500'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Attributes ({nft.attributes?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`text-xs font-semibold pb-1 transition-colors cursor-pointer ${
                      activeTab === 'history'
                        ? 'text-purple-400 border-b-2 border-purple-500'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    History
                  </button>
                </div>

                {activeTab === 'info' && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Contract Address:</span>
                      <a
                        href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${NFT_CONTRACT_ADDRESS}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-300 hover:underline flex items-center gap-1"
                      >
                        {NFT_CONTRACT_ADDRESS.slice(0, 6)}...{NFT_CONTRACT_ADDRESS.slice(-4)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Token ID:</span>
                      <span>#{nft.tokenId}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Token Standard:</span>
                      <span>ERC-721</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Blockchain Network:</span>
                      <span className="text-emerald-400">Ethereum Sepolia (11155111)</span>
                    </div>
                  </div>
                )}

                {activeTab === 'attributes' && (
                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                    {nft.attributes?.map((attr, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-[#0d0918] border border-purple-950 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">{attr.trait_type}</div>
                        <div className="text-xs font-semibold text-purple-300 truncate mt-0.5">{attr.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-2 max-h-36 overflow-y-auto text-xs font-mono">
                    {nft.activity?.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#0d0918]">
                        <span className="text-purple-300 font-semibold">{act.type}</span>
                        <span className="text-slate-400 text-[11px]">{act.timestamp}</span>
                        {act.priceSepoliaETH && (
                          <span className="text-pink-400 font-bold">{act.priceSepoliaETH} SepoliaETH</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions with Access Control */}
            <div className="pt-4 border-t border-purple-900/40">
              {!wallet.isConnected ? (
                <button
                  onClick={() => {
                    onClose();
                    onConnectWallet();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all cursor-pointer"
                >
                  Connect Wallet to Purchase
                </button>
              ) : isOwner ? (
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center text-xs font-semibold text-purple-200">
                    You are the current owner of this token
                  </div>
                  {nft.isListed ? (
                    <button
                      onClick={() => {
                        onClose();
                        onCancelListing(nft);
                      }}
                      className="w-full py-3 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Cancel Marketplace Listing
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenListModal(nft);
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Tag className="w-4 h-4" />
                      <span>List for Sale</span>
                    </button>
                  )}
                </div>
              ) : nft.isListed ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onBuyItem(nft);
                    }}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all cursor-pointer"
                  >
                    Buy Now ({nft.priceSepoliaETH} SepoliaETH)
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onBuyItem(nft);
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-purple-900/50 transition-colors cursor-pointer"
                  >
                    Place Bid
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 font-semibold text-xs cursor-not-allowed text-center"
                >
                  Not Listed / Showcase Only
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
