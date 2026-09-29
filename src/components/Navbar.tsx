import React from 'react';
import { WalletState } from '../types/nft';
import { Wallet, LogOut, PlusCircle, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { ETHERSCAN_SEPOLIA_BASE_URL } from '../contracts/addresses';

interface NavbarProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchToSepolia: () => void;
  activeTab: 'home' | 'marketplace' | 'collection';
  setActiveTab: (tab: 'home' | 'marketplace' | 'collection') => void;
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onConnect,
  onDisconnect,
  onSwitchToSepolia,
  activeTab,
  setActiveTab,
  onOpenCreateModal,
}) => {
  // Truncate wallet address e.g. 0x12...34ab
  const truncateAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090810]/90 border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] transition-all">
              <div className="w-full h-full bg-[#090810] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-lg">
                  NH
                </span>
              </div>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                NFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Hub</span>
              </span>
            </div>
          </button>
        </div>

        {/* Center: Clean Navigation Links + Create NFT Button */}
        <nav className="hidden md:flex items-center gap-2 bg-[#151322]/80 p-1.5 rounded-full border border-purple-900/40">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'collection'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Collection
          </button>

          {/* Distinct + Create NFT button */}
          <button
            onClick={onOpenCreateModal}
            className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white bg-purple-950/80 hover:bg-purple-900/90 border border-purple-500/50 hover:border-pink-500/70 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-pink-400" />
            <span>+ Create NFT</span>
          </button>
        </nav>

        {/* Right: Network Status & Connect / Disconnect Wallet */}
        <div className="flex items-center gap-3">
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              {/* Network Status Indicator */}
              {wallet.isSepolia ? (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sepolia</span>
                </div>
              ) : (
                <button
                  onClick={onSwitchToSepolia}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-medium hover:bg-amber-900/60 transition-colors cursor-pointer"
                  title="คลิกเพื่อสลับไปยังเครือข่าย Sepolia Testnet"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch to Sepolia</span>
                </button>
              )}

              {/* Connected Address & SepoliaETH Balance Pill */}
              <div className="flex items-center gap-2 bg-[#151322] px-3.5 py-1.5 rounded-full border border-purple-900/50 text-xs">
                <span className="font-mono text-purple-300 font-semibold">
                  {wallet.balance} <span className="text-[10px] text-pink-400 font-sans">SepoliaETH</span>
                </span>
                <span className="w-px h-3.5 bg-purple-900" />
                <a
                  href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${wallet.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-slate-300 hover:text-white flex items-center gap-1"
                  title="ดูที่อยู่บน Sepolia Etherscan"
                >
                  <span>{truncateAddress(wallet.address)}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

              {/* Disconnect Action */}
              <button
                onClick={onDisconnect}
                className="p-2 rounded-full bg-[#151322] hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-purple-900/40 hover:border-red-800/40 transition-colors cursor-pointer"
                title="Disconnect (ออกจากระบบ)"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={wallet.isConnecting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}

          {/* Mobile + Create NFT button */}
          <button
            onClick={onOpenCreateModal}
            className="md:hidden p-2 rounded-xl bg-purple-950 border border-purple-700 text-pink-300"
            title="Create NFT"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Mobile Nav Links bar */}
      <div className="md:hidden flex items-center justify-around border-t border-purple-950/40 py-2.5 px-4 bg-[#0c0a17]">
        <button
          onClick={() => setActiveTab('home')}
          className={`text-xs font-semibold py-1 px-3 rounded-lg ${
            activeTab === 'home' ? 'text-purple-400 bg-purple-950/80' : 'text-slate-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`text-xs font-semibold py-1 px-3 rounded-lg ${
            activeTab === 'marketplace' ? 'text-purple-400 bg-purple-950/80' : 'text-slate-400'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('collection')}
          className={`text-xs font-semibold py-1 px-3 rounded-lg ${
            activeTab === 'collection' ? 'text-purple-400 bg-purple-950/80' : 'text-slate-400'
          }`}
        >
          Collection
        </button>
      </div>
    </header>
  );
};
