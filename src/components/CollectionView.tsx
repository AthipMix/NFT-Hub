import React, { useState } from 'react';
import { NFTItem, WalletState } from '../types/nft';
import { ETHERSCAN_SEPOLIA_BASE_URL } from '../contracts/addresses';
import { Copy, Check, ExternalLink, Tag, PlusCircle, AlertCircle, ShoppingBag, XCircle } from 'lucide-react';

interface CollectionViewProps {
  nfts: NFTItem[];
  wallet: WalletState;
  onSelectNFT: (nft: NFTItem) => void;
  onOpenListModal: (nft: NFTItem) => void;
  onCancelListing: (nft: NFTItem) => void;
  onOpenCreateModal: () => void;
  onConnectWallet: () => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  nfts,
  wallet,
  onSelectNFT,
  onOpenListModal,
  onCancelListing,
  onOpenCreateModal,
  onConnectWallet,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'on-sale' | 'unlisted'>('all');
  const [copied, setCopied] = useState(false);

  const userAddress = wallet.address?.toLowerCase() || '';

  // Filter NFTs owned by connected wallet
  const ownedNFTs = nfts.filter((nft) => nft.owner.toLowerCase() === userAddress);
  const onSaleNFTs = ownedNFTs.filter((nft) => nft.isListed);
  const unlistedNFTs = ownedNFTs.filter((nft) => !nft.isListed);

  const displayedNFTs =
    activeSubTab === 'on-sale'
      ? onSaleNFTs
      : activeSubTab === 'unlisted'
      ? unlistedNFTs
      : ownedNFTs;

  const totalValue = ownedNFTs
    .reduce((acc, curr) => acc + parseFloat(curr.priceSepoliaETH || '0'), 0)
    .toFixed(3);

  const handleCopy = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!wallet.isConnected) {
    return (
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="rounded-3xl bg-[#151322] border border-purple-900/40 p-10 sm:p-14 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Connect Wallet to View Collection
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
            กรุณาเชื่อมต่อกระเป๋าเงิน MetaMask บนเครือข่าย Sepolia Testnet เพื่อดูผลงานทั้งหมดที่คุณเป็นเจ้าของ และจัดการรายการวางขาย
          </p>
          <button
            onClick={onConnectWallet}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
          >
            Connect Wallet
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header Card */}
      <div className="relative rounded-3xl bg-[#151322] border border-purple-900/40 p-6 sm:p-8 mb-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-purple-900/50 via-pink-900/30 to-indigo-950/50" />

        <div className="relative z-10 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full ring-4 ring-[#151322] bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-[0_0_25px_rgba(168,85,247,0.4)] overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${wallet.address || 'User'}`}
                  alt="Avatar"
                  className="w-full h-full object-cover bg-slate-900 rounded-full"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#151322]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display font-bold text-white">
                  My Collection
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 text-[11px] font-mono border border-purple-500/30">
                  Sepolia Connected
                </span>
              </div>

              {/* Address with copy & Etherscan link */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-lg border border-purple-950">
                  {wallet.address}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md text-slate-400 hover:text-purple-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${wallet.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-md text-slate-400 hover:text-purple-300 hover:bg-slate-800 transition-colors"
                  title="View on Sepolia Etherscan"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 sm:gap-8 bg-[#0d0918] p-4 rounded-2xl border border-purple-950">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Owned</div>
              <div className="text-xl font-display font-bold text-white tabular-nums">
                {ownedNFTs.length}
              </div>
            </div>
            <div className="w-px h-8 bg-purple-900/40" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Active Listings</div>
              <div className="text-xl font-display font-bold text-purple-400 tabular-nums">
                {onSaleNFTs.length}
              </div>
            </div>
            <div className="w-px h-8 bg-purple-900/40" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Balance</div>
              <div className="text-xl font-display font-bold text-pink-400 font-mono tabular-nums">
                {wallet.balance} <span className="text-xs font-sans text-purple-300">SepoliaETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs navigation & Create NFT Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 p-1.5 bg-[#151322] rounded-2xl border border-purple-900/40">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Owned ({ownedNFTs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('on-sale')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'on-sale'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            On Sale ({onSaleNFTs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('unlisted')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'unlisted'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Vault ({unlistedNFTs.length})
          </button>
        </div>

        {/* Create NFT Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New NFT</span>
        </button>
      </div>

      {/* Grid of User's Owned Items */}
      {displayedNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedNFTs.map((nft) => (
            <div
              key={nft.id}
              onClick={() => onSelectNFT(nft)}
              className="group relative flex flex-col rounded-2xl bg-[#151322] hover:bg-[#1c1830] border border-purple-900/40 hover:border-purple-500/50 shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Artwork */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-purple-300">
                  Token #{nft.tokenId}
                </div>
                <div className="absolute top-3 right-3">
                  {nft.isListed ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-400 font-medium">
                      Active for Sale
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] text-slate-400 font-medium">
                      In Vault
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white truncate mb-1">
                    {nft.title}
                  </h3>
                  <div className="text-xs text-slate-400 mb-3">
                    Category: <span className="text-purple-300">{nft.category}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0d0918] border border-purple-950 mb-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {nft.isListed ? 'Listing Price:' : 'Estimated Price:'}
                    </span>
                    <span className="font-mono text-xs font-bold text-purple-300">
                      {nft.priceSepoliaETH} SepoliaETH
                    </span>
                  </div>
                </div>

                {/* Management Action Buttons */}
                <div className="pt-2 border-t border-purple-900/30">
                  {nft.isListed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancelListing(nft);
                      }}
                      className="w-full py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Listing</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenListModal(nft);
                      }}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>List for Sale</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#151322]/50 rounded-3xl border border-purple-900/30">
          <AlertCircle className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-60" />
          <h3 className="text-slate-200 font-bold text-base mb-1">
            {activeSubTab === 'on-sale'
              ? 'ไม่พบรายการที่เปิดวางขายอยู่'
              : activeSubTab === 'unlisted'
              ? 'ไม่พบผลงานในคลัง'
              : 'คุณยังไม่มีผลงาน NFT ในกระเป๋า'}
          </h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6">
            คุณสามารถซื้องานศิลปะได้จากแท็บ &quot;Marketplace&quot; หรือสร้างและมิ้นต์ผลงานใหม่ลงบนบล็อกเชน Sepolia ได้ทันที
          </p>
          <button
            onClick={onOpenCreateModal}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create NFT</span>
          </button>
        </div>
      )}
    </section>
  );
};
