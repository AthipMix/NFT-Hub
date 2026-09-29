import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  DIGITAL_ART_NFT_721_ADDRESS,
  NFT_MARKETPLACE_ADDRESS,
  DIGITAL_ART_NFT_1155_ADDRESS,
  ETHERSCAN_SEPOLIA_BASE_URL,
} from '../contracts/addresses';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-purple-950/60 bg-[#07060d] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#07060d] rounded-[6px] flex items-center justify-center">
              <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xs">
                NH
              </span>
            </div>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              NFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hub</span>
            </span>
            <p className="text-[11px] text-slate-400">
              © 2026 NFT Hub. Powered by Ethereum Sepolia Testnet.
            </p>
          </div>
        </div>

        {/* Contract Links on Sepolia Etherscan */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <a
            href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${DIGITAL_ART_NFT_721_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
            title="DigitalArtNFT721 on Sepolia Etherscan"
          >
            <span>DigitalArtNFT721</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <span className="text-purple-900">•</span>

          <a
            href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${NFT_MARKETPLACE_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
            title="NFTMarketplace on Sepolia Etherscan"
          >
            <span>NFTMarketplace</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <span className="text-purple-900">•</span>

          <a
            href={`${ETHERSCAN_SEPOLIA_BASE_URL}/address/${DIGITAL_ART_NFT_1155_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
            title="DigitalArtNFT1155 on Sepolia Etherscan"
          >
            <span>DigitalArtNFT1155</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Currency Unit badge */}
        <div className="text-xs font-mono text-pink-400/90 bg-[#151322] px-3 py-1.5 rounded-full border border-purple-900/50">
          Currency: SepoliaETH
        </div>

      </div>
    </footer>
  );
};
