import { ethers } from 'ethers';
import {
  DIGITAL_ART_NFT_721_ADDRESS,
  DigitalArtNFT721,
  NFT_MARKETPLACE_ADDRESS,
  NFTMarketplace,
  SEPOLIA_CHAIN_ID,
  SEPOLIA_HEX_CHAIN_ID,
  SEPOLIA_NETWORK_CONFIG,
} from '../contracts/addresses';
import { NFT721_ABI, NFTMARKETPLACE_ABI } from '../contracts/abi';

// Extend Window interface for Ethereum provider
declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Web3AccountDetails {
  address: string;
  balance: string; // Formatted in SepoliaETH
  chainId: number;
  isSepolia: boolean;
}
// ดึง Signer จากกระเป๋า MetaMask
export const getSigner = async () => {
  if (!window.ethereum) throw new Error('กรุณาติดตั้ง MetaMask');
  const provider = new ethers.BrowserProvider(window.ethereum);
  return await provider.getSigner();
};

// 1. ฟังก์ชันสร้าง NFT จริง (Create / Mint)
export const mintNFT = async (tokenURI: string) => {
  const signer = await getSigner();
  const userAddress = await signer.getAddress();
  
  const nftContract = new ethers.Contract(
    DigitalArtNFT721,
    NFT721_ABI,
    signer
  );

  // ส่ง Transaction ไปที่ Smart Contract
  const tx = await nftContract.safeMint(userAddress, tokenURI);
  
  // รอยืนยัน Transaction บนบล็อกเชน
  const receipt = await tx.wait();
  return receipt;
};

// 2. ฟังก์ชันซื้อ NFT จริง (Buy NFT)
export const buyNFTItem = async (listingId: number | string, priceInEth: string) => {
  const signer = await getSigner();

  const marketplaceContract = new ethers.Contract(
    NFTMarketplace,
    NFTMARKETPLACE_ABI,
    signer
  );

  // ส่ง Transaction ซื้อพร้อมแนบเงิน SepoliaETH
  const tx = await marketplaceContract.buyNFT(listingId, {
    value: ethers.parseEther(priceInEth),
  });

  // รอยืนยัน Transaction
  const receipt = await tx.wait();
  return receipt;
};

export interface ChainListing {
  listingId: number;
  seller: string;
  nftContract: string;
  tokenId: number;
  price: string;
  active: boolean;
}

export class Web3Service {
  private static instance: Web3Service;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  public static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }
  
  

  /**
   * Check if an Ethereum wallet (like MetaMask) is injected
   */
  public hasInjectedProvider(): boolean {
    return typeof window !== 'undefined' && Boolean(window.ethereum);
  }

  /**
   * Get active BrowserProvider
   */
  public getProvider(): ethers.BrowserProvider | null {
    if (!this.hasInjectedProvider()) return null;
    if (!this.provider) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
    return this.provider;
  }

  /**
   * Reset provider/signer on disconnect
   */
  public resetConnection(): void {
    this.provider = null;
    this.signer = null;
  }

  /**
   * Connect wallet and return account details on Sepolia
   */
  public async connectWallet(): Promise<Web3AccountDetails> {
    if (!this.hasInjectedProvider()) {
      throw new Error('ไม่พบกระเป๋าเงิน MetaMask หรือ Web3 Wallet ในเบราว์เซอร์ของคุณ กรุณาติดตั้ง MetaMask เพื่อดำเนินการต่อ');
    }

    try {
      const provider = this.getProvider()!;

      // Request user accounts
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('ไม่พบบัญชีที่เลือก กรุณาปลดล็อกกระเป๋าเงิน MetaMask ของคุณ');
      }

      const activeAddress = accounts[0];

      // Check current network
      const network = await provider.getNetwork();
      const currentChainId = Number(network.chainId);
      const isSepolia = currentChainId === SEPOLIA_CHAIN_ID;

      // If connected to a different network, automatically prompt to switch to Sepolia
      if (!isSepolia) {
        await this.switchToSepolia();
      }

      // Re-initialize signer on Sepolia
      this.signer = await provider.getSigner();
      const balanceWei = await provider.getBalance(activeAddress);
      const balanceFormatted = Number(ethers.formatEther(balanceWei)).toFixed(4);

      return {
        address: activeAddress,
        balance: balanceFormatted,
        chainId: SEPOLIA_CHAIN_ID,
        isSepolia: true,
      };
    } catch (err: any) {
      throw this.parseContractError(err);
    }
  }

  /**
   * Prompt wallet to switch to Ethereum Sepolia Testnet
   */
  public async switchToSepolia(): Promise<boolean> {
    if (!this.hasInjectedProvider()) {
      throw new Error('ไม่ได้ติดตั้งส่วนขยาย MetaMask ในเบราว์เซอร์');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_HEX_CHAIN_ID }],
      });
      // Refresh provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      return true;
    } catch (switchError: any) {
      // Error code 4902 indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902 || switchError?.data?.originalError?.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK_CONFIG],
          });
          this.provider = new ethers.BrowserProvider(window.ethereum);
          return true;
        } catch (addError: any) {
          throw this.parseContractError(addError);
        }
      }
      throw this.parseContractError(switchError);
    }
  }

  /**
   * Get fresh balance for account in SepoliaETH
   */
  public async getBalance(address: string): Promise<string> {
    try {
      const provider = this.getProvider();
      if (!provider) return '0.0000';
      const balance = await provider.getBalance(address);
      return Number(ethers.formatEther(balance)).toFixed(4);
    } catch {
      return '0.0000';
    }
  }

  /**
   * Get NFT ERC721 Contract Instance (DigitalArtNFT721)
   */
  public async getNFTContract(withSigner = false): Promise<ethers.Contract> {
    const provider = this.getProvider();
    if (!provider) {
      throw new Error('No web3 provider available.');
    }

    if (withSigner) {
      if (!this.signer) {
        this.signer = await provider.getSigner();
      }
      return new ethers.Contract(DigitalArtNFT721, NFT721_ABI, this.signer);
    }

    return new ethers.Contract(DigitalArtNFT721, NFT721_ABI, provider);
  }

  /**
   * Get Marketplace Contract Instance (NFTMarketplace)
   */
  public async getMarketplaceContract(withSigner = false): Promise<ethers.Contract> {
    const provider = this.getProvider();
    if (!provider) {
      throw new Error('No web3 provider available.');
    }

    if (withSigner) {
      if (!this.signer) {
        this.signer = await provider.getSigner();
      }
      return new ethers.Contract(NFTMarketplace, NFTMARKETPLACE_ABI, this.signer);
    }

    return new ethers.Contract(NFTMarketplace, NFTMARKETPLACE_ABI, provider);
  }

  /**
   * Mint NFT using safeMint(userAddress, metadataURI) or fallback mint(...)
   */
  async mintNFT(toAddress: string, tokenURI: string) {
    if (!window.ethereum) throw new Error('กรุณาติดตั้ง MetaMask');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const nftContract = new ethers.Contract(
      DIGITAL_ART_NFT_721_ADDRESS,
      NFT721_ABI,
      signer
    );

    let tx;

    // เช็คว่ามีฟังก์ชัน mintNFT (ตามไฟล์ .sol จริงของคุณ) หรือไม่
    if (typeof nftContract.mintNFT === 'function') {
      tx = await nftContract.mintNFT(toAddress, tokenURI);
    } else if (typeof nftContract.safeMint === 'function') {
      tx = await nftContract.safeMint(toAddress, tokenURI);
    } else if (typeof nftContract.mint === 'function') {
      tx = await nftContract.mint(toAddress, tokenURI);
    } else {
      // เรียกตรงๆ ผ่าน interface
      tx = await nftContract.getFunction('mintNFT')(toAddress, tokenURI);
    }

    const receipt = await tx.wait();

    let tokenId = 1;
    if (receipt.logs && receipt.logs.length > 0) {
      try {
        const parsedLog = nftContract.interface.parseLog(receipt.logs[0]);
        if (parsedLog && parsedLog.args) {
          tokenId = Number(parsedLog.args.tokenId ?? parsedLog.args[2] ?? 1);
        }
      } catch {
        // fallback
      }
    }

    return {
      hash: receipt.hash,
      tokenId: tokenId,
    };
  }

  /**
   * Buy NFT item from Marketplace Contract
   * Executes marketContract.buyNFT(listingId) with { value: listingPrice }
   * or fallbacks to marketContract.buyItem(nftContract, tokenId, { value })
   */
  public async buyNFT(
    listingId: number,
    priceSepoliaETH: string
  ): Promise<{ hash: string }> {
    try {
      // 1. ดึง Contract พร้อม Signer (true = ต้องการ Signer เพื่อเซ็นทำธุรกรรม)
      const marketContract = await this.getMarketplaceContract(true);

      // 2. แปลงราคา SepoliaETH เป็น Wei
      const priceInWei = ethers.parseEther(priceSepoliaETH.toString());

      // 3. ส่งคำสั่งซื้อ buyNFT(listingId) พร้อมแนบเงิน SepoliaETH
      const tx = await marketContract.buyNFT(listingId, {
        value: priceInWei,
      });

      // 4. รอการยืนยัน Transaction บน Sepolia
      const receipt = await tx.wait();

      return { hash: receipt?.hash || tx.hash };
    } catch (err: any) {
      console.error("Buy NFT Error Details:", err);
      throw this.parseContractError ? this.parseContractError(err) : err;
    }
  }

  public async listNFT(
    tokenId: number,
    priceSepoliaETH: string,
    onStepChange?: (step: 'approving' | 'listing') => void
  ): Promise<{ hash: string; listingId?: number }> {
    try {
      const nftContract = await this.getNFTContract(true);
      const marketContract = await this.getMarketplaceContract(true);
      const priceInWei = ethers.parseEther(priceSepoliaETH);

      if (onStepChange) onStepChange('approving');

      // Check current approval for this specific token
      try {
        const approvedAddress = await nftContract.getApproved(tokenId);
        if (approvedAddress.toLowerCase() !== NFT_MARKETPLACE_ADDRESS.toLowerCase()) {
          const approveTx = await nftContract.approve(NFT_MARKETPLACE_ADDRESS, tokenId);
          await approveTx.wait();
        }
      } catch {
        // Direct approval attempt
        const approveTx = await nftContract.approve(NFT_MARKETPLACE_ADDRESS, tokenId);
        await approveTx.wait();
      }

      if (onStepChange) onStepChange('listing');

      // Call listNFT or fallback to listItem
      let listTx: any;
      try {
        if (typeof marketContract.listNFT === 'function') {
          listTx = await marketContract.listNFT(DIGITAL_ART_NFT_721_ADDRESS, tokenId, priceInWei);
        } else {
          listTx = await marketContract.listItem(DIGITAL_ART_NFT_721_ADDRESS, tokenId, priceInWei);
        }
      } catch (err) {
        if (typeof marketContract.listItem === 'function') {
          listTx = await marketContract.listItem(DIGITAL_ART_NFT_721_ADDRESS, tokenId, priceInWei);
        } else {
          throw err;
        }
      }

      const receipt = await listTx.wait();

      return { hash: listTx.hash };
    } catch (err: any) {
      throw this.parseContractError(err);
    }
  }

  /**
   * Cancel Listing from Marketplace
   */
  public async cancelListing(listingIdOrTokenId: number): Promise<{ hash: string }> {
    try {
      const marketContract = await this.getMarketplaceContract(true);
      let tx: any;
      try {
        tx = await marketContract.cancelListing(listingIdOrTokenId);
      } catch {
        tx = await marketContract.cancelListing(DIGITAL_ART_NFT_721_ADDRESS, listingIdOrTokenId);
      }
      await tx.wait();
      return { hash: tx.hash };
    } catch (err: any) {
      throw this.parseContractError(err);
    }
  }

  /**
   * Read on-chain listing details
   */
  public async getOnChainListing(listingId: number): Promise<ChainListing | null> {
    try {
      const marketContract = await this.getMarketplaceContract(false);
      const res = await marketContract.getListing(listingId);
      return {
        listingId,
        seller: res.seller || res[0],
        nftContract: res.nftContract || res[1],
        tokenId: Number(res.tokenId || res[2]),
        price: ethers.formatEther(res.price || res[3]),
        active: Boolean(res.active ?? res[4]),
      };
    } catch {
      return null;
    }
  }

  /**
   * Human-friendly error translation for Web3 & Ethereum errors (in Thai)
   */
  public parseContractError(err: any): Error {
    if (!err) return new Error('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุบนบล็อกเชน');

    const message = err.message || '';
    const code = err.code || err.info?.error?.code;

    // User rejection in MetaMask
    if (code === 4001 || code === 'ACTION_REJECTED' || message.includes('user rejected') || message.includes('User denied')) {
      return new Error('ผู้ใช้ยกเลิกการทำรายการ');
    }

    // Pending request in MetaMask
    if (code === -32002 || message.includes('already pending')) {
      return new Error('มีคำขอเปิดค้างอยู่ใน MetaMask กรุณาเปิดส่วนขยายเพื่อยืนยัน');
    }

    // Insufficient funds for gas or purchase
    if (
      code === 'INSUFFICIENT_FUNDS' ||
      message.includes('insufficient funds') ||
      err.data?.code === -32000
    ) {
      return new Error('ยอดเงิน SepoliaETH ไม่เพียงพอสำหรับค่าแก๊สหรือราคาผลงาน');
    }

    // Wrong network
    if (message.includes('network') || message.includes('chain')) {
      return new Error('กรุณาสลับไปยังเครือข่าย Sepolia Testnet เพื่อใช้งาน');
    }

    // Contract execution revert
    if (err.reason) {
      return new Error(`สัญญาอัจฉริยะปฏิเสธการทำรายการ: ${err.reason}`);
    }

    return new Error(message || 'เกิดข้อผิดพลาดในการทำธุรกรรมบนเครือข่าย Sepolia Testnet');
  }
}

export const web3Service = Web3Service.getInstance();
