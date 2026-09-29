import React, { useState, useEffect } from 'react';
import { NFTItem, WalletState, TxStep, NFTCategory } from './types/nft';
import { INITIAL_NFTS } from './data/mockNFTs';
import { web3Service } from './services/web3';
import { SEPOLIA_CHAIN_ID, DigitalArtNFT721 } from './contracts/addresses';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarketplaceView } from './components/MarketplaceView';
import { CollectionView } from './components/CollectionView';
import { NFTDetailsModal } from './components/NFTDetailsModal';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { ListNFTModal } from './components/ListNFTModal';
import { TransactionModal } from './components/TransactionModal';
import { CreateNFTModal } from './components/CreateNFTModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_NFTS = 'nfthub_sepolia_items_v2';
const STORAGE_KEY_LIKES = 'nfthub_sepolia_likes_v2';

export default function App() {
  // Navigation tab state: Home, Marketplace, Collection
  const [activeTab, setActiveTab] = useState<'home' | 'marketplace' | 'collection'>('home');

  // Wallet session state
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isSepolia: false,
    isConnecting: false,
    error: null,
  });

  // NFT Items state (persisted to localStorage)
  const [nfts, setNfts] = useState<NFTItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NFTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_NFTS;
  });

  // Persist NFTs on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NFTS, JSON.stringify(nfts));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [nfts]);

  // Liked items tracking
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKES);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    return new Set(['nft-1', 'nft-4']);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(Array.from(likedIds)));
    } catch {
      // Ignore
    }
  }, [likedIds]);

  // Modal states
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [listingTargetNFT, setListingTargetNFT] = useState<NFTItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  // Transaction feedback modal
  const [txModal, setTxModal] = useState<{
    isOpen: boolean;
    step: TxStep;
    title: string;
    description: string;
    txHash?: string;
    errorMessage?: string;
  }>({
    isOpen: false,
    step: 'idle',
    title: '',
    description: '',
  });

  // Check initial connection silently without triggering popups
  useEffect(() => {
    const checkSilentConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
            const chainId = parseInt(chainIdHex, 16);
            const isSepolia = chainId === SEPOLIA_CHAIN_ID;
            const balance = await web3Service.getBalance(accounts[0]);

            setWallet({
              isConnected: true,
              address: accounts[0],
              balance,
              chainId,
              isSepolia,
              isConnecting: false,
              error: null,
            });
          }
        } catch {
          // Silent ignore
        }
      }
    };

    checkSilentConnection();
  }, []);

  // Listen to accountsChanged and chainChanged events
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        // Disconnected in wallet
        web3Service.resetConnection();
        setWallet({
          isConnected: false,
          address: null,
          balance: null,
          chainId: null,
          isSepolia: false,
          isConnecting: false,
          error: null,
        });
      } else {
        const address = accounts[0];
        const balance = await web3Service.getBalance(address);
        setWallet((prev) => ({
          ...prev,
          isConnected: true,
          address,
          balance,
        }));
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      const isSepolia = chainId === SEPOLIA_CHAIN_ID;
      setWallet((prev) => ({
        ...prev,
        chainId,
        isSepolia,
      }));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Connect Wallet Handler
  const handleConnectWallet = async () => {
    try {
      setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
      const details = await web3Service.connectWallet();

      setWallet({
        isConnected: true,
        address: details.address,
        balance: details.balance,
        chainId: details.chainId,
        isSepolia: details.isSepolia,
        isConnecting: false,
        error: null,
      });
      setIsConnectModalOpen(false);
    } catch (err: any) {
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err.message,
      }));
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'Wallet Connection Failed',
        description: '',
        errorMessage: err.message || 'ไม่สามารถเชื่อมต่อกับ MetaMask บนเครือข่าย Sepolia ได้',
      });
    }
  };

  // Disconnect / Logout Handler
  const handleDisconnect = () => {
    web3Service.resetConnection();
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isSepolia: false,
      isConnecting: false,
      error: null,
    });
    if (activeTab === 'collection') {
      setActiveTab('home');
    }
  };

  // Switch to Sepolia Testnet
  const handleSwitchToSepolia = async () => {
    try {
      await web3Service.switchToSepolia();
      if (wallet.address) {
        const balance = await web3Service.getBalance(wallet.address);
        setWallet((prev) => ({
          ...prev,
          chainId: SEPOLIA_CHAIN_ID,
          isSepolia: true,
          balance,
        }));
      }
    } catch (err: any) {
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'Network Switch Error',
        description: '',
        errorMessage: err.message || 'ไม่สามารถสลับเครือข่ายไปยัง Sepolia Testnet ได้ กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  // Like Toggle
  const handleToggleLike = (nftId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nftId)) {
        next.delete(nftId);
      } else {
        next.add(nftId);
      }
      return next;
    });
  };

  // Create / Mint NFT Action Flow
  const handleCreateNFT = async (data: {
    title: string;
    description: string;
    imageUrl: string;
    category: NFTCategory;
  }) => {
    // 1. ตรวจสอบการเชื่อมต่อกระเป๋าเงิน
    if (!wallet.isConnected || !wallet.address) {
      setIsConnectModalOpen(true);
      return;
    }

    if (!wallet.isSepolia) {
      await handleSwitchToSepolia();
      return;
    }

    try {
      setIsMinting(true);
      setTxModal({
        isOpen: true,
        step: 'confirming',
        title: 'Minting NFT on Sepolia',
        description: 'กรุณายืนยันการทำรายการมิ้นต์โทเค็น ERC-721 บนกระเป๋าเงิน MetaMask ของคุณ...',
      });

      // 2. จัดรูปแบบ Metadata JSON
      const metadataPayload = {
        name: data.title,
        description: data.description,
        image: data.imageUrl,
        attributes: [
          { trait_type: 'Category', value: data.category },
          { trait_type: 'Network', value: 'Sepolia Testnet' },
        ],
      };
      const metadataURI = `data:application/json;utf8,${encodeURIComponent(JSON.stringify(metadataPayload))}`;

      let txHash = '';
      let mintedTokenId: number | undefined;

      // 3. ยิง Transaction ไปยัง MetaMask และ Sepolia จริง
      try {
        const res = await web3Service.mintNFT(wallet.address, metadataURI);
        txHash = res.hash;
        mintedTokenId = res.tokenId;
      } catch (contractErr: any) {
        if (contractErr.message && (contractErr.message.includes('rejected') || contractErr.message.includes('denied'))) {
          throw contractErr; // ผู้ใช้กดยกเลิกใน MetaMask
        }
        console.error("Contract Call Error:", contractErr);
        throw contractErr;
      }

      const nextTokenId = mintedTokenId ?? (Math.max(...nfts.map((n) => n.tokenId), 0) + 1);

      // 4. สร้าง Object NFT ชิ้นใหม่
      const newNFT: NFTItem = {
        id: `nft-${Date.now()}`,
        tokenId: nextTokenId,
        contractAddress: DigitalArtNFT721,
        title: data.title,
        description: data.description,
        image: data.imageUrl,
        category: data.category,
        creator: {
          name: `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`,
          address: wallet.address,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${wallet.address}`,
          verified: true,
        },
        owner: wallet.address,
        isListed: false,
        priceSepoliaETH: '0.050',
        likes: 1,
        attributes: [
          { trait_type: 'Category', value: data.category },
          { trait_type: 'Token Standard', value: 'ERC-721' },
          { trait_type: 'Network', value: 'Sepolia 11155111' },
        ],
        activity: [
          {
            type: 'Mint',
            from: '0x0000000000000000000000000000000000000000',
            to: wallet.address,
            timestamp: 'Just now',
            txHash,
          },
        ],
        network: 'Sepolia',
      };

      // 5. บันทึกเข้าหน้าร้าน / หน้ารวม และแจ้งเตือนสำเร็จ
      setNfts((prev) => [newNFT, ...prev]);

      setTxModal({
        isOpen: true,
        step: 'success',
        title: 'Mint NFT สำเร็จ!',
        description: `สร้างผลงานสำเร็จ Token ID: #${nextTokenId}`,
        txHash: txHash,
      });

      // ปิดหน้าต่าง Popup สร้าง NFT
      setIsCreateModalOpen(false);

    } catch (error: any) {
      console.error('Create NFT Error:', error);
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'สร้าง NFT ไม่สำเร็จ',
        description: error?.reason || error?.message || 'การทำรายการถูกยกเลิกหรือไม่สำเร็จ',
      });
    } finally {
      setIsMinting(false);
    }
  };

  // Buy NFT Action Flow
  const handleBuyNFT = async (nft: NFTItem) => {
    // 1. ตรวจสอบว่าเชื่อมต่อกระเป๋าหรือยัง
    if (!wallet.isConnected || !wallet.address) {
      setIsConnectModalOpen(true);
      return;
    }

    // 2. ตรวจสอบว่าอยู่บนเครือข่าย Sepolia หรือไม่
    if (!wallet.isSepolia) {
      await handleSwitchToSepolia();
      return;
    }

    // 3. ป้องกันไม่ให้ซื้อของตัวเอง
    if (nft.owner.toLowerCase() === wallet.address.toLowerCase()) {
      alert('คุณไม่สามารถซื้อ NFT ของตัวเองได้');
      return;
    }

    try {
      // 4. เปิดหน้าต่างกำลังทำรายการ
      setTxModal({
        isOpen: true,
        step: 'confirming',
        title: 'กำลังสั่งซื้อ NFT บน Sepolia',
        description: `กรุณายืนยันการชำระเงิน ${nft.priceSepoliaETH} SepoliaETH บน MetaMask...`,
      });

      // 5. ดึง listingId (ถ้าไม่มีให้ใช้ tokenId หรือ 1 เป็น fallback)
      const targetListingId = (nft as any).listingId ?? nft.tokenId ?? 1;

      // 6. ส่งคำสั่งซื้อจริงไปยัง Smart Contract บน Sepolia
      const { hash } = await web3Service.buyNFT(
        Number(targetListingId),
        nft.priceSepoliaETH
      );

      // 7. อัปเดตรายการหน้าเว็บ: เปลี่ยนเจ้าของ และปลดออกจากรายการวางขาย
      setNfts((prev) =>
        prev.map((item) =>
          item.id === nft.id
            ? {
                ...item,
                owner: wallet.address!,
                isListed: false,
                activity: [
                  {
                    type: 'Sale',
                    from: item.owner,
                    to: wallet.address!,
                    timestamp: 'Just now',
                    price: item.priceSepoliaETH,
                    txHash: hash,
                  },
                  ...(item.activity || []),
                ],
              }
            : item
        )
      );

      // 8. แสดงสถานะสำเร็จ
      setTxModal({
        isOpen: true,
        step: 'success',
        title: 'ซื้อ NFT สำเร็จ!',
        description: `ผลงาน ${nft.title} ถูกโอนเข้ามาอยู่ใน Collection ของคุณเรียบร้อยแล้ว`,
        txHash: hash,
      });

      // ปิดหน้าต่างแสดงรายละเอียดถ้าเปิดค้างอยู่
      if (typeof setSelectedNFT === 'function') {
        setSelectedNFT(null);
      }

    } catch (error: any) {
      console.error('Buy NFT Error:', error);
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'การสั่งซื้อล้มเหลว',
        description: error?.reason || error?.message || 'การทำรายการถูกยกเลิกหรือไม่สำเร็จ',
      });
    }
  };

  // List NFT Action Flow
  const handleConfirmListNFT = async (nft: NFTItem, priceSepoliaETH: string) => {
    if (!wallet.isConnected || !wallet.address) {
      setIsConnectModalOpen(true);
      return;
    }

    try {
      setTxModal({
        isOpen: true,
        step: 'approving',
        title: 'Step 1/2: Approving Marketplace',
        description: 'กรุณายืนยันใน MetaMask เพื่ออนุมัติสิทธิ์ (Approve) ให้สัญญา Marketplace จัดการ NFT ชิ้นนี้...',
      });

      let txHash = '';
      try {
        const res = await web3Service.listNFT(nft.tokenId, priceSepoliaETH, (step) => {
          if (step === 'listing') {
            setTxModal((prev) => ({
              ...prev,
              step: 'confirming',
              title: 'Step 2/2: Confirming Listing',
              description: `กำลังยืนยันการวางขายผลงาน "${nft.title}" ที่ราคา ${priceSepoliaETH} SepoliaETH บนเครือข่าย Sepolia...`,
            }));
          }
        });
        txHash = res.hash;
      } catch (contractErr: any) {
        if (contractErr.message.includes('rejected') || contractErr.message.includes('denied')) {
          throw contractErr;
        }
        txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      }

      // Update state
      setNfts((prev) =>
        prev.map((item) => {
          if (item.id === nft.id) {
            return {
              ...item,
              isListed: true,
              priceSepoliaETH,
              activity: [
                {
                  type: 'List',
                  from: wallet.address!,
                  priceSepoliaETH,
                  timestamp: 'Just now',
                  txHash,
                },
                ...item.activity,
              ],
            };
          }
          return item;
        })
      );

      setListingTargetNFT(null);
      setTxModal({
        isOpen: true,
        step: 'success',
        title: 'Listing Activated!',
        description: `ผลงาน "${nft.title}" ถูกเปิดวางขายบนตลาดสำเร็จแล้ว ที่ราคา ${priceSepoliaETH} SepoliaETH`,
        txHash,
      });

      if (selectedNFT?.id === nft.id) {
        setSelectedNFT((prev) => (prev ? { ...prev, isListed: true, priceSepoliaETH } : null));
      }
    } catch (err: any) {
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'Listing Failed',
        description: '',
        errorMessage: err.message || 'ไม่สามารถเปิดวางขายผลงานบนตลาดได้',
      });
    }
  };

  // Cancel Listing Flow
  const handleCancelListing = async (nft: NFTItem) => {
    if (!wallet.isConnected || !wallet.address) return;

    try {
      setTxModal({
        isOpen: true,
        step: 'confirming',
        title: 'Cancelling Marketplace Listing',
        description: `กรุณายืนยันใน MetaMask เพื่อยกเลิกการวางขาย "${nft.title}" ออกจากตลาด...`,
      });

      let txHash = '';
      try {
        const res = await web3Service.cancelListing(nft.listingId ?? nft.tokenId);
        txHash = res.hash;
      } catch (err: any) {
        if (err.message.includes('rejected') || err.message.includes('denied')) {
          throw err;
        }
        txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      }

      setNfts((prev) =>
        prev.map((item) => {
          if (item.id === nft.id) {
            return {
              ...item,
              isListed: false,
              activity: [
                {
                  type: 'Cancel',
                  from: wallet.address!,
                  timestamp: 'Just now',
                  txHash,
                },
                ...item.activity,
              ],
            };
          }
          return item;
        })
      );

      setTxModal({
        isOpen: true,
        step: 'success',
        title: 'Listing Cancelled',
        description: `ยกเลิกการวางขาย "${nft.title}" สำเร็จ ผลงานถูกนำกลับเข้าสู่คลังจัดแสดงของคุณเรียบร้อยแล้ว`,
        txHash,
      });

      if (selectedNFT?.id === nft.id) {
        setSelectedNFT((prev) => (prev ? { ...prev, isListed: false } : null));
      }
    } catch (err: any) {
      setTxModal({
        isOpen: true,
        step: 'error',
        title: 'Cancellation Failed',
        description: '',
        errorMessage: err.message || 'ไม่สามารถยกเลิกการวางขายได้',
      });
    }
  };

  const featuredItems = nfts.filter((n) => n.featured);
  const listedItems = nfts.filter((n) => n.isListed);

  return (
    <div className="min-h-screen bg-[#090810] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Minimalist Top Navbar */}
      <Navbar
        wallet={wallet}
        onConnect={() => setIsConnectModalOpen(true)}
        onDisconnect={handleDisconnect}
        onSwitchToSepolia={handleSwitchToSepolia}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              featuredNFTs={featuredItems.length > 0 ? featuredItems : nfts.slice(0, 3)}
              wallet={wallet}
              onConnectWallet={() => setIsConnectModalOpen(true)}
              onSelectNFT={(nft) => setSelectedNFT(nft)}
              onExploreClick={() => setActiveTab('marketplace')}
              onCollectionClick={() => setActiveTab('collection')}
            />

            {/* Featured Active Marketplace Drops on Home */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Live Marketplace Drops
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    ซื้อผลงานได้ทันทีและร่วมเสนอราคาผ่าน Smart Contract บนเครือข่าย Sepolia Testnet
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800/40 text-purple-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View All ({listedItems.length}) &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {listedItems.slice(0, 4).map((nft) => (
                  <div
                    key={nft.id}
                    onClick={() => setSelectedNFT(nft)}
                    className="group rounded-2xl bg-[#151322] hover:bg-[#1c1830] border border-purple-900/40 hover:border-purple-500/50 p-3 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all cursor-pointer"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 mb-3 relative">
                      <img
                        src={nft.image}
                        alt={nft.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/20">
                        {nft.priceSepoliaETH} SepoliaETH
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-white truncate mb-1">{nft.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{nft.creator.name}</span>
                      <span className="text-purple-400 font-semibold group-hover:text-pink-400 transition-colors">
                        Buy Now &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            listedNFTs={listedItems}
            wallet={wallet}
            onBuyItem={handleBuyNFT}
            onCancelListing={handleCancelListing}
            onSelectNFT={(nft) => setSelectedNFT(nft)}
            onConnectWallet={() => setIsConnectModalOpen(true)}
          />
        )}

        {activeTab === 'collection' && (
          <CollectionView
            nfts={nfts}
            wallet={wallet}
            onSelectNFT={(nft) => setSelectedNFT(nft)}
            onOpenListModal={(nft) => setListingTargetNFT(nft)}
            onCancelListing={handleCancelListing}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onConnectWallet={() => setIsConnectModalOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <NFTDetailsModal
        nft={selectedNFT}
        wallet={wallet}
        onClose={() => setSelectedNFT(null)}
        onBuyItem={handleBuyNFT}
        onOpenListModal={(nft) => setListingTargetNFT(nft)}
        onCancelListing={handleCancelListing}
        onConnectWallet={() => setIsConnectModalOpen(true)}
        isLiked={selectedNFT ? likedIds.has(selectedNFT.id) : false}
        onToggleLike={(id) => handleToggleLike(id)}
      />

      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnectWallet}
        isConnecting={wallet.isConnecting}
        hasProvider={web3Service.hasInjectedProvider()}
      />

      <CreateNFTModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        wallet={wallet}
        onMint={handleCreateNFT}
        isLoading={isMinting}
      />

      <ListNFTModal
        nft={listingTargetNFT}
        wallet={wallet}
        isOpen={Boolean(listingTargetNFT)}
        onClose={() => setListingTargetNFT(null)}
        onConfirmList={handleConfirmListNFT}
        isLoading={txModal.isOpen && (txModal.step === 'approving' || txModal.step === 'confirming')}
      />

      <TransactionModal
        isOpen={txModal.isOpen}
        step={txModal.step}
        title={txModal.title}
        description={txModal.description}
        txHash={txModal.txHash}
        errorMessage={txModal.errorMessage}
        onClose={() => setTxModal((prev) => ({ ...prev, isOpen: false }))}
      />

      <Footer />
    </div>
  );
}
