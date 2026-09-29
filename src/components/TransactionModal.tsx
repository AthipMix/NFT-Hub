import React from 'react';
import { X, CheckCircle2, AlertTriangle, ExternalLink, Loader2, ShieldCheck } from 'lucide-react';
import { ETHERSCAN_SEPOLIA_BASE_URL } from '../contracts/addresses';
import { TxStep } from '../types/nft';

interface TransactionModalProps {
  isOpen: boolean;
  step: TxStep;
  title: string;
  description: string;
  txHash?: string;
  errorMessage?: string;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  step,
  title,
  description,
  txHash,
  errorMessage,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#141022] border border-purple-800/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (enabled on success or error) */}
        {(step === 'success' || step === 'error') && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* State Icon Visualizer */}
        <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center">
          {step === 'preparing' || step === 'approving' || step === 'confirming' ? (
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
              <Loader2 className="absolute inset-0 m-auto w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          ) : step === 'success' ? (
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.35)]">
              <AlertTriangle className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Heading */}
        <h3 className="font-display text-xl font-bold text-white mb-2">
          {title}
        </h3>

        {/* Description or Error */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {errorMessage || description}
        </p>

        {/* Transaction Hash on Etherscan */}
        {txHash && (
          <div className="mb-6 p-3 rounded-2xl bg-[#0c0818] border border-purple-950 text-xs font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Sepolia Testnet Hash
            </div>
            <a
              href={`${ETHERSCAN_SEPOLIA_BASE_URL}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-purple-300 hover:text-pink-300 transition-colors inline-flex items-center gap-1.5 break-all"
            >
              <span>{txHash.slice(0, 16)}...{txHash.slice(-12)}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        )}

        {/* Action Button */}
        {(step === 'success' || step === 'error') ? (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg transition-all cursor-pointer"
          >
            {step === 'success' ? 'Great, Continue Exploring' : 'Close and Retry'}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>กรุณาอย่าปิดหน้าต่าง MetaMask หรือรีเฟรชหน้าเว็บขณะทำรายการ</span>
          </div>
        )}
      </div>
    </div>
  );
};
