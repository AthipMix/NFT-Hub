import React, { useState } from 'react';
import { NFTItem, WalletState } from '../types/nft';
import { NFT_MARKETPLACE_ADDRESS, ETHERSCAN_SEPOLIA_BASE_URL } from '../contracts/addresses';
import { ShoppingBag, ExternalLink, ShieldCheck, Tag, XCircle, AlertCircle, User } from 'lucide-react';

interface MarketplaceViewProps {
  listedNFTs: NFTItem[];
  wallet: WalletState;
  onBuyItem: (nft: NFTItem) => void;
  onCancelListing: (nft: NFTItem) => void;
  onSelectNFT: (nft: NFTItem) => void;
  onConnectWallet: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  listedNFTs,
  wallet,
  onBuyItem,
  onCancelListing,
  onSelectNFT,
  onConnectWallet,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'recent'>('price-asc');

  const filteredItems = listedNFTs
    .filter((item) => filterCategory === 'All' || item.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return parseFloat(a.priceSepoliaETH) - parseFloat(b.priceSepoliaETH);
      if (sortBy === 'price-desc') return parseFloat(b.priceSepoliaETH) - parseFloat(a.priceSepoliaETH);
      return b.tokenId - a.tokenId;
    });

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1b1233] via-[#22153d] to-[#16122a] p-6 sm:p-10 border border-purple-900/40 shadow-2xl mb-10 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>NFTMarketplace Active Listings</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Marketplace
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-xl">
              ซื้อขายผลงานศิลปะดิจิทัลที่ผ่านการตรวจสอบอย่างปลอดภัยบนเครือข่าย Ethereum Sepolia Testnet การทำธุรกรรมทั้งหมดจัดเก็บในระบบ Escrow และประมวลผลผ่าน Smart Contract บนบล็อกเชน
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-[#0e0a1a] border border-purple-900/50">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Marketplace Contract (Sepolia)
              </div>
              <a
                href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${NFT_MARKETPLACE_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-pink-300 transition-colors mt-1"
                title="ตรวจสอบสัญญาอัจฉริยะบน Sepolia Etherscan"
              >
                <span>{NFT_MARKETPLACE_ADDRESS.slice(0, 8)}...{NFT_MARKETPLACE_ADDRESS.slice(-6)}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">
            Active Listings ({filteredItems.length})
          </span>
          <span className="text-xs text-purple-300/80">· ราคาผลงานระบุเป็นหน่วย SepoliaETH เท่านั้น</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#151322] text-slate-200 text-xs rounded-xl px-3.5 py-2 border border-purple-900/40 focus:border-purple-500 focus:outline-none cursor-pointer"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Marketplace Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((nft, index) => {
            const isOwner =
              wallet.isConnected &&
              wallet.address &&
              nft.owner.toLowerCase() === wallet.address.toLowerCase();

            const listingId = nft.listingId ?? (index + 1);

            return (
              <div
                key={nft.id}
                onClick={() => onSelectNFT(nft)}
                className="group relative flex flex-col rounded-2xl bg-[#151322] hover:bg-[#1c1830] border border-purple-900/40 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Artwork */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Listing ID & Token ID pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-pink-300 border border-pink-500/30">
                      Listing #{listingId}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/30">
                      #{nft.tokenId}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-slate-200 border border-white/10 pointer-events-none">
                    {nft.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-1.5">
                      {nft.title}
                    </h3>

                    {/* Seller Address */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                      <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">
                        Seller: <span className="font-mono text-slate-300">{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</span>
                      </span>
                    </div>

                    {/* Price Card */}
                    <div className="p-2.5 rounded-xl bg-[#0b0817] border border-purple-950 flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          Price
                        </div>
                        <div className="text-base font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200">
                          {nft.priceSepoliaETH} <span className="text-xs font-sans text-purple-400">SepoliaETH</span>
                        </div>
                      </div>
                      <Tag className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>

                  {/* Action Button Section with Access Control */}
                  <div>
                    {!wallet.isConnected ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onConnectWallet();
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Connect Wallet</span>
                      </button>
                    ) : isOwner ? (
                      <div className="space-y-2">
                        <button
                          disabled
                          className="w-full py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center text-xs font-bold text-purple-300 cursor-not-allowed"
                        >
                          Your Listing
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCancelListing(nft);
                          }}
                          className="w-full py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium border border-red-900/50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel Listing</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBuyItem(nft);
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(236,72,153,0.55)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#151322]/50 rounded-3xl border border-purple-900/30">
          <AlertCircle className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-60" />
          <h3 className="text-slate-200 font-bold text-base">ขณะนี้ยังไม่มีผลงานที่เปิดวางขายใน Marketplace</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-md mx-auto">
            คุณสามารถเพิ่มผลงานและวางขายผลงานที่คุณเป็นเจ้าของได้จากเมนู &quot;Collection&quot; หรือคลิกปุ่ม &quot;+ Create NFT&quot;
          </p>
        </div>
      )}
    </section>
  );
};
