import React, { useState } from 'react';
import { X, Sparkles, Image, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { NFTCategory, WalletState } from '../types/nft';
import { DIGITAL_ART_NFT_721_ADDRESS } from '../contracts/addresses';

interface CreateNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onMint: (data: {
    title: string;
    description: string;
    imageUrl: string;
    category: NFTCategory;
  }) => Promise<void>;
  isLoading: boolean;
}

const PRESET_ARTWORKS = [
  {
    name: 'Cyberpunk Oni Mask',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    category: 'Cyberpunk' as NFTCategory,
  },
  {
    name: 'Neon Samurai 2099',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: '3D' as NFTCategory,
  },
  {
    name: 'Quantum Core Hologram',
    url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=800&q=80',
    category: 'Abstract' as NFTCategory,
  },
  {
    name: 'Digital Android Maiden',
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    category: 'Art' as NFTCategory,
  },
];

export const CreateNFTModal: React.FC<CreateNFTModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onMint,
  isLoading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<NFTCategory>('Cyberpunk');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('กรุณาระบุชื่อผลงาน NFT');
      return;
    }
    if (!description.trim()) {
      setError('กรุณาระบุคำอธิบายผลงาน');
      return;
    }
    if (!imageUrl.trim()) {
      setError('กรุณาระบุลิงก์รูปภาพ หรือเลือกจาก Preset');
      return;
    }

    try {
      await onMint({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        category,
      });
      // Reset form
      setTitle('');
      setDescription('');
      setImageUrl('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'การมิ้นต์ NFT ล้มเหลว');
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_ARTWORKS[0]) => {
    setTitle(preset.name);
    setImageUrl(preset.url);
    setCategory(preset.category);
    if (!description) {
      setDescription(`ผลงานศิลปะดิจิทัล Cyberpunk Neon ซีรีส์ "${preset.name}" มิ้นต์บนบล็อกเชน Sepolia`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#141022] border border-purple-800/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-600 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#141022] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Create NFT
            </h3>
            <p className="text-xs text-slate-400">
              สร้างและมิ้นต์ผลงานศิลปะดิจิทัลจริงบนบล็อกเชน Ethereum Sepolia Testnet
            </p>
          </div>
        </div>

        {/* Contract Highlight */}
        <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/60 mb-6 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-purple-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>DigitalArtNFT721.sol</span>
          </div>
          <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
            {DIGITAL_ART_NFT_721_ADDRESS.slice(0, 6)}...{DIGITAL_ART_NFT_721_ADDRESS.slice(-4)}
          </span>
        </div>

        {/* Presets Quick Picker */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Quick Art Presets (คลิกเพื่อเลือกภาพตัวอย่าง)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRESET_ARTWORKS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`group relative rounded-xl overflow-hidden border p-1 text-left transition-all cursor-pointer ${
                  imageUrl === preset.url
                    ? 'border-purple-500 bg-purple-950/60 ring-2 ring-purple-500/50'
                    : 'border-purple-900/40 bg-[#0d0918] hover:border-purple-700'
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-950 mb-1 relative">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {imageUrl === preset.url && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="text-[11px] font-semibold text-slate-200 truncate">
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mint Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              NFT Title (ชื่อผลงาน)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cyber Ronin #01"
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b0717] border border-purple-900/60 focus:border-purple-500 text-sm text-white placeholder:text-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description (คำอธิบายผลงาน)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="บรรยายเรื่องราว รายละเอียด หรือคุณสมบัติพิเศษของงานศิลปะชิ้นนี้..."
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b0717] border border-purple-900/60 focus:border-purple-500 text-sm text-white placeholder:text-slate-600 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Image URL or IPFS URI
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... หรือ ipfs://..."
                  disabled={isLoading}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0b0717] border border-purple-900/60 focus:border-purple-500 text-xs text-white placeholder:text-slate-600 focus:outline-none font-mono"
                />
                <Image className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category (หมวดหมู่)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NFTCategory)}
                disabled={isLoading}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0b0717] border border-purple-900/60 focus:border-purple-500 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="Cyberpunk">Cyberpunk</option>
                <option value="3D">3D</option>
                <option value="Art">Art</option>
                <option value="Abstract">Abstract</option>
                <option value="Collectible">Collectible</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/50 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-purple-900/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Minting on Sepolia...' : 'Mint NFT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
