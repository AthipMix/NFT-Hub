export type NFTCategory = 'All' | 'Art' | '3D' | 'Abstract' | 'Cyberpunk' | 'Collectible';

export interface Creator {
  name: string;
  address: string;
  avatar: string;
  verified: boolean;
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFTActivity {
  type: 'Mint' | 'List' | 'Sale' | 'Transfer' | 'Cancel';
  from: string;
  to?: string;
  priceSepoliaETH?: string;
  timestamp: string;
  txHash?: string;
}

export interface NFTItem {
  id: string;
  tokenId: number;
  contractAddress: string;
  title: string;
  description: string;
  image: string;
  category: NFTCategory;
  creator: Creator;
  owner: string;
  isListed: boolean;
  listingId?: number;
  priceSepoliaETH: string;
  highestBidSepoliaETH?: string;
  likes: number;
  featured?: boolean;
  endTimestamp?: number; // Epoch timestamp for countdown
  attributes: NFTAttribute[];
  activity: NFTActivity[];
  network: 'Sepolia';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null; // Formatted in SepoliaETH
  chainId: number | null;
  isSepolia: boolean;
  isConnecting: boolean;
  error: string | null;
}

export type TxStep = 'idle' | 'preparing' | 'approving' | 'confirming' | 'success' | 'error';

export interface TransactionNotice {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  title: string;
  description: string;
  txHash?: string;
}
