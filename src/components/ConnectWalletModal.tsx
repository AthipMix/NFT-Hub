import React from 'react';
import { X, Wallet, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';
import { SEPOLIA_CHAIN_ID, ETHERSCAN_SEPOLIA_BASE_URL } from '../contracts/addresses';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
  isConnecting: boolean;
  hasProvider: boolean;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  isConnecting,
  hasProvider,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#141022] border border-purple-800/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <div className="w-full h-full bg-[#141022] rounded-[14px] flex items-center justify-center">
            <Wallet className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          กรุณาเชื่อมต่อกระเป๋าเงิน MetaMask บนเครือข่าย <strong className="text-purple-300">Ethereum Sepolia Testnet</strong> เพื่อทำการซื้อ ฝากขาย หรือเสนอราคา NFT
        </p>

        {/* Network requirement highlight */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-900/60 mb-6 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300">
            <span className="font-semibold text-white block mb-0.5">เครือข่ายเป้าหมาย: Sepolia Testnet</span>
            Chain ID: <span className="font-mono text-purple-300">{SEPOLIA_CHAIN_ID}</span> · สกุลเงิน: <span className="font-mono text-pink-300">SepoliaETH</span>
          </div>
        </div>

        {hasProvider ? (
          <div className="space-y-3">
            <button
              onClick={() => {
                onConnect();
                onClose();
              }}
              disabled={isConnecting}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-between cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{isConnecting ? 'Connecting MetaMask...' : 'Connect with MetaMask'}</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
            <p className="text-amber-300 text-xs font-medium mb-3">
              ไม่พบส่วนขยาย MetaMask ในเบราว์เซอร์ของคุณ
            </p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              <span>Install MetaMask Extension</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-purple-900/30 text-center">
          <a
            href="https://sepoliafaucet.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-purple-400 hover:text-pink-300 transition-colors inline-flex items-center gap-1"
          >
            <span>ต้องการรับ SepoliaETH ฟรีสำหรับค่า Gas? แวะไปที่ Sepolia Faucet</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
