import React, { useState, useEffect } from 'react';
import { NFTItem, WalletState } from '../types/nft';
import { ArrowRight, Clock, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  featuredNFTs: NFTItem[];
  wallet: WalletState;
  onConnectWallet: () => void;
  onSelectNFT: (nft: NFTItem) => void;
  onExploreClick: () => void;
  onCollectionClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredNFTs,
  wallet,
  onConnectWallet,
  onSelectNFT,
  onExploreClick,
  onCollectionClick,
}) => {
  // Real-time countdown timer tick for central card
  const [timeLeft, setTimeLeft] = useState({
    hours: '01',
    minutes: '16',
    seconds: '25',
    ms: '45',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const remainingSeconds = 3600 * 24 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
      const h = String(Math.floor(remainingSeconds / 3600) % 24).padStart(2, '0');
      const m = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
      const s = String(remainingSeconds % 60).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimeLeft({ hours: h, minutes: m, seconds: s, ms });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Center featured card is the first one (Triumphant Awakening)
  const centerNFT = featuredNFTs[0];
  const leftNFT = featuredNFTs[1] || featuredNFTs[0];
  const rightNFT = featuredNFTs[2] || featuredNFTs[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28">
      {/* Cyberpunk background ambient glow orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative cyber curved light lines from reference */}
      <svg
        className="absolute top-20 right-10 w-48 h-48 opacity-20 pointer-events-none hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 80 Q 50 10 90 80" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-12 right-1/4 w-32 h-16 opacity-30 pointer-events-none hidden lg:block"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 20 L20 0 L40 30 L60 10 L80 35 L100 15 L120 25" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                NFTHub
              </span>
            </div>

            {/* Giant Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Buy &amp; Sell Quality{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                NFT Collection
              </span>
            </h1>

            {/* Subtitle in Thai per strict requirement */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              แหล่งรวบรวมและจัดแสดงผลงานศิลปะดิจิทัลคุณภาพสูง ซื้อขายอย่างปลอดภัยและโปร่งใสผ่านเทคโนโลยีบล็อกเชนบนเครือข่าย Sepolia
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {wallet.isConnected ? (
                <button
                  onClick={onExploreClick}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all cursor-pointer group"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={onConnectWallet}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all cursor-pointer group"
                >
                  <span>Connect Wallet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <button
                onClick={onCollectionClick || onExploreClick}
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-[#161226] hover:bg-[#1f1936] border border-purple-900/50 hover:border-purple-600/50 transition-all cursor-pointer"
              >
                My Collection
              </button>
            </div>

            {/* Key Stats Counter: 6.7k Art Work, 37k Artist, 90k+ Auction */}
            <div className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-purple-900/30 mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  6.7k
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Art Work</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80" />
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  37k
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Artist</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80" />
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 tabular-nums">
                  90k+
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Auction</div>
              </div>
            </div>

            {/* Community Avatars Stack */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#090810]"
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=CryptoFan1"
                  alt="Member"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#090810]"
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=CryptoFan2"
                  alt="Member"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#090810]"
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=CryptoFan3"
                  alt="Member"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#090810]"
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=CryptoFan4"
                  alt="Member"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100 font-display">47k+</div>
                <div className="text-xs text-slate-400">สมาชิกในคอมมูนิตี้</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Staggered Interactive Cards (Matching Image 1) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[560px] h-[480px] sm:h-[520px] flex items-center justify-center">
              
              {/* Left Flanking Card (Hamlet Contemplates) */}
              {leftNFT && (
                <div
                  onClick={() => onSelectNFT(leftNFT)}
                  className="absolute left-0 sm:left-4 z-10 w-[200px] sm:w-[220px] rounded-2xl bg-[#141022] p-3 border border-purple-900/40 shadow-xl opacity-75 hover:opacity-100 transition-all duration-300 transform -rotate-6 hover:-rotate-2 hover:scale-105 cursor-pointer hidden xs:block"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5 bg-slate-950">
                    <img
                      src={leftNFT.image}
                      alt={leftNFT.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
                      <span>{leftNFT.likes}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-white truncate mb-1">
                    {leftNFT.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[90px]">{leftNFT.creator.name}</span>
                    <span className="font-mono text-purple-300 font-medium">
                      {leftNFT.priceSepoliaETH} SepoliaETH
                    </span>
                  </div>
                </div>
              )}

              {/* Right Flanking Card (Living Vase) */}
              {rightNFT && (
                <div
                  onClick={() => onSelectNFT(rightNFT)}
                  className="absolute right-0 sm:right-4 z-10 w-[200px] sm:w-[220px] rounded-2xl bg-[#141022] p-3 border border-purple-900/40 shadow-xl opacity-75 hover:opacity-100 transition-all duration-300 transform rotate-6 hover:rotate-2 hover:scale-105 cursor-pointer hidden xs:block"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5 bg-slate-950">
                    <img
                      src={rightNFT.image}
                      alt={rightNFT.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
                      <span>{rightNFT.likes}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-white truncate mb-1">
                    {rightNFT.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[90px]">{rightNFT.creator.name}</span>
                    <span className="font-mono text-purple-300 font-medium">
                      {rightNFT.priceSepoliaETH} SepoliaETH
                    </span>
                  </div>
                </div>
              )}

              {/* Central Dominant Hero Card (Triumphant Awakening) */}
              {centerNFT && (
                <div
                  onClick={() => onSelectNFT(centerNFT)}
                  className="relative z-20 w-[280px] sm:w-[320px] rounded-3xl bg-gradient-to-b from-[#1f1738] to-[#120e24] p-4 border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:shadow-[0_0_50px_rgba(236,72,153,0.55)] transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  {/* Artwork Container */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3.5 bg-slate-950">
                    <img
                      src={centerNFT.image}
                      alt={centerNFT.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Likes Top Right */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-white flex items-center gap-1.5 border border-white/10">
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      <span>{centerNFT.likes}</span>
                    </div>

                    {/* Hover Buy CTA */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-5 py-2 rounded-full bg-white text-slate-950 font-bold text-xs shadow-lg hover:bg-purple-100 transition-colors flex items-center gap-1.5 cursor-pointer">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Place Bid</span>
                      </button>
                    </div>

                    {/* Countdown Timer Bar */}
                    <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                      <span className="font-semibold tracking-wider">
                        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}:{timeLeft.ms}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="truncate">
                      <h3 className="font-display font-bold text-base text-white truncate">
                        &quot;{centerNFT.title}&quot;
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>Sepolia Testnet</span>
                      </div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/40 text-[11px] font-mono text-purple-300 font-semibold">
                      ERC-721
                    </span>
                  </div>

                  {/* Creator & Price Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-purple-900/40">
                    <div className="flex items-center gap-2">
                      <img
                        src={centerNFT.creator.avatar}
                        alt={centerNFT.creator.name}
                        className="w-7 h-7 rounded-full ring-1 ring-purple-500/50"
                      />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Creator</div>
                        <div className="text-xs font-medium text-slate-200 truncate max-w-[100px]">
                          {centerNFT.creator.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Current Bid</div>
                      <div className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                        {centerNFT.priceSepoliaETH} SepoliaETH
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
