export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_HEX_CHAIN_ID = '0xaa36a7';

export const SEPOLIA_NETWORK_CONFIG = {
  chainId: SEPOLIA_HEX_CHAIN_ID,
  chainName: 'Ethereum Sepolia Testnet',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [
    'https://rpc.sepolia.org',
    'https://ethereum-sepolia-rpc.publicnode.com',
    'https://sepolia.drpc.org',
  ],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

// Contract Addresses ตัวจริงของคุณ
export const DIGITAL_ART_NFT_721_ADDRESS = '0x6eAc1bCEb53b43B4919de7E453A5dAFa4F07E772';
export const NFT_MARKETPLACE_ADDRESS = '0x5229A280A82a8Bad09D6fff1f7c0Ca2eCb394C71';
export const DIGITAL_ART_NFT_1155_ADDRESS = '0xA7542eCd0204ab7367B721CF32B44A620cCE76e7';

// ตั้งชื่อสำรองไว้รองรับทุกไฟล์
export const DigitalArtNFT721 = DIGITAL_ART_NFT_721_ADDRESS;
export const NFTMarketplace = NFT_MARKETPLACE_ADDRESS;
export const DigitalArtNFT1155 = DIGITAL_ART_NFT_1155_ADDRESS;
export const NFT_CONTRACT_ADDRESS = DIGITAL_ART_NFT_721_ADDRESS;
export const MARKETPLACE_CONTRACT_ADDRESS = NFT_MARKETPLACE_ADDRESS;

export const ETHERSCAN_SEPOLIA_BASE_URL = 'https://sepolia.etherscan.io';