import { NFTItem } from '../types/nft';
import { NFT_CONTRACT_ADDRESS } from '../contracts/addresses';

// High-fidelity handcrafted Cyberpunk / Dark Neon SVG artworks
// Guaranteed zero broken links, instant load, crisp retina rendering

const SVG_TRIUMPHANT_AWAKENING = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141124"/>
      <stop offset="50%" stop-color="#221738"/>
      <stop offset="100%" stop-color="#0f0b1a"/>
    </linearGradient>
    <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffedd5"/>
      <stop offset="100%" stop-color="#fed7aa"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="500" height="500" fill="url(#bg)"/>
  <circle cx="250" cy="270" r="180" fill="#a855f7" opacity="0.15" filter="url(#glow)"/>
  
  <!-- Stylized Foliage / Head Piece -->
  <path d="M 250 80 C 180 120 140 210 160 300 C 180 340 320 340 340 300 C 360 210 320 120 250 80 Z" fill="url(#neonGreen)"/>
  <path d="M 250 60 C 220 100 210 160 250 200 C 290 160 280 100 250 60 Z" fill="url(#gold)"/>
  <path d="M 170 140 C 140 180 150 240 190 260 C 170 200 180 160 170 140 Z" fill="#86efac"/>
  <path d="M 330 140 C 360 180 350 240 310 260 C 330 200 320 160 330 140 Z" fill="#86efac"/>

  <!-- Character Face -->
  <ellipse cx="250" cy="285" rx="80" ry="75" fill="url(#skin)"/>
  <!-- Rosy Cheeks -->
  <circle cx="195" cy="305" r="14" fill="#fb7185" opacity="0.6"/>
  <circle cx="305" cy="305" r="14" fill="#fb7185" opacity="0.6"/>
  
  <!-- Eyes -->
  <ellipse cx="205" cy="280" rx="15" ry="20" fill="#1e1b4b"/>
  <circle cx="200" cy="275" r="6" fill="#ffffff"/>
  <ellipse cx="295" cy="280" rx="15" ry="20" fill="#1e1b4b"/>
  <circle cx="290" cy="275" r="6" fill="#ffffff"/>
  
  <!-- Cute mouth -->
  <path d="M 238 315 Q 250 328 262 315" stroke="#9a3412" stroke-width="4" stroke-linecap="round" fill="none"/>
  
  <!-- Floating cyber particles -->
  <circle cx="120" cy="160" r="4" fill="#a855f7" filter="url(#glow)"/>
  <circle cx="380" cy="180" r="5" fill="#38bdf8" filter="url(#glow)"/>
  <circle cx="100" cy="360" r="3" fill="#ec4899"/>
  <circle cx="410" cy="340" r="4" fill="#4ade80"/>
</svg>
`)}`;

const SVG_HAMLET_CAT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="catBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b132b"/>
      <stop offset="100%" stop-color="#1c2541"/>
    </linearGradient>
    <linearGradient id="cyberSuit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="catSkin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#c7d2fe"/>
    </linearGradient>
    <filter id="cyberGlow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="500" height="500" fill="url(#catBg)"/>
  <circle cx="250" cy="250" r="170" fill="#6366f1" opacity="0.2" filter="url(#cyberGlow)"/>

  <!-- Ears -->
  <polygon points="160,210 130,80 230,160" fill="url(#catSkin)"/>
  <polygon points="165,190 145,105 210,160" fill="#f43f5e" opacity="0.6"/>
  <polygon points="340,210 370,80 270,160" fill="url(#catSkin)"/>
  <polygon points="335,190 355,105 290,160" fill="#f43f5e" opacity="0.6"/>

  <!-- Cat Head -->
  <ellipse cx="250" cy="260" rx="110" ry="95" fill="url(#catSkin)"/>
  
  <!-- Large Anime Cyber Eyes -->
  <ellipse cx="200" cy="260" rx="36" ry="42" fill="#0f172a"/>
  <ellipse cx="200" cy="260" rx="30" ry="36" fill="#38bdf8" filter="url(#cyberGlow)"/>
  <circle cx="190" cy="250" r="12" fill="#ffffff"/>
  <circle cx="215" cy="275" r="6" fill="#ffffff"/>

  <ellipse cx="300" cy="260" rx="36" ry="42" fill="#0f172a"/>
  <ellipse cx="300" cy="260" rx="30" ry="36" fill="#38bdf8" filter="url(#cyberGlow)"/>
  <circle cx="290" cy="250" r="12" fill="#ffffff"/>
  <circle cx="315" cy="275" r="6" fill="#ffffff"/>

  <!-- Nose & Whiskers -->
  <polygon points="250,295 244,288 256,288" fill="#ec4899"/>
  <path d="M 160 295 L 100 285 M 160 305 L 95 310" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
  <path d="M 340 295 L 400 285 M 340 305 L 405 310" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>

  <!-- Cyber Suit Collar -->
  <path d="M 180 340 Q 250 370 320 340 L 340 450 L 160 450 Z" fill="url(#cyberSuit)"/>
  <circle cx="250" cy="370" r="12" fill="#22d3ee" filter="url(#cyberGlow)"/>
</svg>
`)}`;

const SVG_LIVING_VASE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="vaseBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#27272a"/>
    </linearGradient>
    <linearGradient id="warmAmber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="antlers" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" fill="url(#vaseBg)"/>
  <circle cx="250" cy="260" r="160" fill="#ea580c" opacity="0.15"/>
  
  <!-- Antlers / Branches -->
  <path d="M 210 190 Q 150 140 130 90 M 165 145 Q 120 160 100 130" stroke="url(#antlers)" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M 290 190 Q 350 140 370 90 M 335 145 Q 380 160 400 130" stroke="url(#antlers)" stroke-width="8" stroke-linecap="round" fill="none"/>

  <!-- Vase Character Body -->
  <ellipse cx="250" cy="225" rx="65" ry="60" fill="url(#warmAmber)"/>
  <path d="M 220 280 L 210 390 Q 250 410 290 390 L 280 280 Z" fill="#c2410c"/>
  
  <!-- Minimalist Expressive Face -->
  <circle cx="225" cy="225" r="10" fill="#09090b"/>
  <circle cx="275" cy="225" r="10" fill="#09090b"/>
  <circle cx="228" cy="222" r="3" fill="#ffffff"/>
  <circle cx="278" cy="222" r="3" fill="#ffffff"/>
  <path d="M 245 250 Q 250 255 255 250" stroke="#451a03" stroke-width="3" stroke-linecap="round" fill="none"/>

  <circle cx="250" cy="340" r="8" fill="#fef08a"/>
</svg>
`)}`;

const SVG_MINIMALIST_CHARACTER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgAbstract" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="50%" stop-color="#311042"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" fill="url(#bgAbstract)"/>
  
  <!-- Architectural mural elements -->
  <rect x="40" y="40" width="140" height="240" fill="#dc2626" opacity="0.85"/>
  <rect x="320" y="80" width="140" height="340" fill="#0284c7" opacity="0.75"/>
  <polygon points="120,400 240,460 30,480" fill="#eab308"/>

  <!-- Stylized Hair Sculpt -->
  <path d="M 160 220 C 130 90 360 80 340 220 C 370 290 340 370 290 360 C 230 360 170 320 160 220 Z" fill="#09090b"/>
  
  <!-- Face -->
  <path d="M 190 220 Q 250 200 310 220 L 300 360 Q 250 400 200 360 Z" fill="#fbcfe8"/>
  
  <!-- Eyes & Red Lips -->
  <ellipse cx="225" cy="270" rx="14" ry="10" fill="#18181b"/>
  <circle cx="225" cy="270" r="5" fill="#f43f5e"/>
  <ellipse cx="275" cy="270" rx="14" ry="10" fill="#18181b"/>
  <circle cx="275" cy="270" r="5" fill="#f43f5e"/>
  
  <!-- Abstract Tear Drop -->
  <path d="M 285 310 C 275 330 295 345 285 365 C 275 345 295 330 285 310 Z" fill="#facc15"/>
  <path d="M 235 345 Q 250 355 265 345" stroke="#e11d48" stroke-width="7" stroke-linecap="round" fill="none"/>
</svg>
`)}`;

const SVG_FRAGMENTS_3D = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="fragBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070614"/>
      <stop offset="100%" stop-color="#181028"/>
    </linearGradient>
    <linearGradient id="disc1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d946ef"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="disc2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <filter id="neonReflect">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="500" height="500" fill="url(#fragBg)"/>
  
  <!-- Floating 3D Geometric Discs -->
  <ellipse cx="250" cy="340" rx="140" ry="45" fill="url(#disc1)" transform="rotate(-15 250 340)" filter="url(#neonReflect)"/>
  <ellipse cx="230" cy="240" rx="110" ry="38" fill="url(#disc2)" transform="rotate(25 230 240)"/>
  <ellipse cx="280" cy="150" rx="75" ry="26" fill="url(#disc1)" transform="rotate(-30 280 150)"/>
  
  <!-- Shimmer Spheres -->
  <circle cx="140" cy="180" r="16" fill="#38bdf8" filter="url(#neonReflect)"/>
  <circle cx="360" cy="270" r="22" fill="#ec4899" filter="url(#neonReflect)"/>
</svg>
`)}`;

const SVG_SHINE_BRIGHT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="crystBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090514"/>
      <stop offset="100%" stop-color="#1a0b2e"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" fill="url(#crystBg)"/>
  <!-- Faceted Crystal Prism Cluster -->
  <polygon points="250,90 340,190 280,270 200,230" fill="#a855f7" opacity="0.9"/>
  <polygon points="250,90 200,230 140,160" fill="#06b6d4" opacity="0.85"/>
  <polygon points="280,270 380,310 320,400 220,380" fill="#ec4899" opacity="0.9"/>
  <polygon points="200,230 280,270 220,380 150,330" fill="#8b5cf6" opacity="0.8"/>
  <polygon points="340,190 420,240 380,310 280,270" fill="#f43f5e" opacity="0.75"/>
  <polygon points="140,160 200,230 150,330 90,260" fill="#3b82f6" opacity="0.85"/>
  
  <!-- Glowing highlights -->
  <line x1="250" y1="90" x2="280" y2="270" stroke="#ffffff" stroke-width="2" opacity="0.7"/>
  <line x1="200" y1="230" x2="380" y2="310" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
</svg>
`)}`;

const SVG_FIRE_MAGIC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="fireBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0b0f19"/>
    </linearGradient>
    <filter id="fireGlow">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="500" height="500" fill="url(#fireBg)"/>
  
  <!-- Flowing Plasma Tendrils -->
  <path d="M 250 450 Q 180 350 210 260 Q 240 170 190 80 Q 290 140 270 230 Q 250 310 320 400 Z" fill="#06b6d4" opacity="0.75" filter="url(#fireGlow)"/>
  <path d="M 270 460 Q 320 340 280 250 Q 240 180 270 90 Q 340 180 320 280 Z" fill="#a855f7" opacity="0.85" filter="url(#fireGlow)"/>
  <path d="M 240 430 Q 220 330 250 240 Q 270 170 250 120 Q 280 180 270 270 Z" fill="#f43f5e" opacity="0.9" filter="url(#fireGlow)"/>
  <circle cx="250" cy="220" r="10" fill="#fde047" filter="url(#fireGlow)"/>
</svg>
`)}`;

const SVG_CYBER_SMILE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="smileBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#130e24"/>
      <stop offset="100%" stop-color="#090810"/>
    </linearGradient>
    <linearGradient id="neonYellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="smileGlow">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="500" height="500" fill="url(#smileBg)"/>
  <circle cx="250" cy="250" r="140" fill="url(#neonYellow)" filter="url(#smileGlow)"/>
  
  <!-- Wink Eye -->
  <circle cx="205" cy="220" r="14" fill="#090810"/>
  <path d="M 275 225 Q 295 210 315 225" stroke="#090810" stroke-width="8" stroke-linecap="round" fill="none"/>
  
  <!-- Cyberpunk Smile -->
  <path d="M 185 270 Q 250 340 315 270" stroke="#090810" stroke-width="12" stroke-linecap="round" fill="none"/>
</svg>
`)}`;

export const INITIAL_NFTS: NFTItem[] = [
  {
    id: 'nft-1',
    tokenId: 1,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Triumphant Awakening #01',
    description: 'ผู้พิทักษ์พฤกษศาสตร์ชีวจักรกล 3 มิติ ที่ถือกำเนิดขึ้นในโลกดิจิทัลเมตาเวิร์ส สื่อถึงการสังเคราะห์ของธรรมชาติภายในมหานครไซเบอร์พังค์อันเรืองรอง',
    image: SVG_TRIUMPHANT_AWAKENING,
    category: '3D',
    creator: {
      name: 'Trista Francis',
      address: '0x8b32A46F49341774f26E77A1Ffe37E5e373a4b9A',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Trista',
      verified: true,
    },
    owner: '0x43De2F1E0C401cE4069811C8131365F42D5e85cE',
    isListed: true,
    priceSepoliaETH: '0.048',
    highestBidSepoliaETH: '0.042',
    likes: 220,
    featured: true,
    endTimestamp: Date.now() + 1000 * 60 * 60 * 25, // 25 hours from now
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Species', value: 'Botanical Mecha' },
      { trait_type: 'Class', value: 'Guardian' },
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Aura', value: 'Verdant Gold' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x43De2F1E0C401cE4069811C8131365F42D5e85cE',
        priceSepoliaETH: '0.048',
        timestamp: '2 ชั่วโมงที่แล้ว',
        txHash: '0x3a9f018e24c52f829910d7a04918e7cfa12f36d400492819e6d08129758d4381',
      },
      {
        type: 'Mint',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x43De2F1E0C401cE4069811C8131365F42D5e85cE',
        timestamp: '3 วันที่แล้ว',
        txHash: '0x9482bf1084220021c4e974e1d5a711b4a0349281ec0184712038148b48f98014',
      },
    ],
  },
  {
    id: 'nft-2',
    tokenId: 2,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Hamlet Contemplates Matrix',
    description: 'แมวไซเบอร์เนติกเพื่อนร่วมทางที่กำลังสำรวจโครงข่ายประสาทเทียมและจิตสำนึกสังเคราะห์ในโลกใต้ดินนีออนอันกว้างใหญ่',
    image: SVG_HAMLET_CAT,
    category: 'Cyberpunk',
    creator: {
      name: 'SalvadorDali.eth',
      address: '0x19278B375f10255c56784d0E7790E95aE2368940',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hamlet',
      verified: true,
    },
    owner: '0x992b8d541E3435EbEb76587c653457a4192Af010',
    isListed: true,
    priceSepoliaETH: '0.035',
    highestBidSepoliaETH: '0.029',
    likes: 184,
    featured: true,
    endTimestamp: Date.now() + 1000 * 60 * 60 * 42,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Archetype', value: 'Synthesized Familiar' },
      { trait_type: 'Optics', value: 'Azure Hologram' },
      { trait_type: 'Affiliation', value: 'Underground Syndicate' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x992b8d541E3435EbEb76587c653457a4192Af010',
        priceSepoliaETH: '0.035',
        timestamp: '5 ชั่วโมงที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-3',
    tokenId: 3,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Living Vase 01 By Lanza',
    description: 'โบราณวัตถุดินเหนียวมีชีวิตที่ผสานด้วยจิตวิญญาณแห่งป่าดึกดำบรรพ์และแสงอำพันอบอุ่น หนึ่งในคอลเลกชันพิเศษ Lanza Genesis',
    image: SVG_LIVING_VASE,
    category: 'Art',
    creator: {
      name: 'Freddie Carpenter',
      address: '0x6291a82E643f873971E3C8B715A512803274249a',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Lanza',
      verified: true,
    },
    owner: '0x12a97f259B4aE10f39D5580B708239082Fcb6a21',
    isListed: true,
    priceSepoliaETH: '0.052',
    highestBidSepoliaETH: '0.045',
    likes: 96,
    featured: true,
    endTimestamp: Date.now() + 1000 * 60 * 60 * 18,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Material', value: 'Living Terracotta' },
      { trait_type: 'Antlers', value: 'Sprout Horns' },
      { trait_type: 'Element', value: 'Earth & Fire' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x12a97f259B4aE10f39D5580B708239082Fcb6a21',
        priceSepoliaETH: '0.052',
        timestamp: '1 วันที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-4',
    tokenId: 4,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Minimalist Character #07',
    description: 'ภาพกราฟิกลัทธิคิวบิสม์ยุคใหม่ที่มีคอนทราสต์สูง สำรวจสถาปัตยกรรมอารมณ์และเรขาคณิตของเมือง ผ่านโทนสีแม่สีที่โดดเด่นสะกดสายตา',
    image: SVG_MINIMALIST_CHARACTER,
    category: 'Art',
    creator: {
      name: 'Merry Rose',
      address: '0x5391d8498263D714E7C137123Eb75791244C335A',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Merry',
      verified: true,
    },
    owner: '0x71C35520d2A40Ea7e17812971eaee2ea43b40090',
    isListed: true,
    priceSepoliaETH: '0.065',
    highestBidSepoliaETH: '0.058',
    likes: 312,
    featured: false,
    endTimestamp: Date.now() + 1000 * 60 * 60 * 72,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Style', value: 'Neo-Cubism' },
      { trait_type: 'Medium', value: 'Vector Precision' },
      { trait_type: 'Palette', value: 'Primary Crimson & Cyan' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x71C35520d2A40Ea7e17812971eaee2ea43b40090',
        priceSepoliaETH: '0.065',
        timestamp: '12 ชั่วโมงที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-5',
    tokenId: 5,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Fragments of Reality',
    description: 'วงแหวนเรขาคณิตสามมิติเหลือบแสงสีรุ้งลอยอยู่ในสภาวะไร้น้ำหนัก สะท้อนแสงอัลตราไวโอเลตแบบไดนามิกแบบเรียลไทม์',
    image: SVG_FRAGMENTS_3D,
    category: 'Abstract',
    creator: {
      name: 'Roy Vance',
      address: '0xce6b221eb847898863f683e970a25694f4799056',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Roy',
      verified: true,
    },
    owner: '0xce6b221eb847898863f683e970a25694f4799056',
    isListed: false, // Showcase Only / Not For Sale
    priceSepoliaETH: '0.080',
    highestBidSepoliaETH: '0.075',
    likes: 674,
    featured: false,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Render', value: 'Octane Spectral' },
      { trait_type: 'Dimension', value: 'Non-Euclidean' },
      { trait_type: 'Status', value: 'Showcase Only' },
    ],
    activity: [
      {
        type: 'Mint',
        from: '0x0000000000000000000000000000000000000000',
        to: '0xce6b221eb847898863f683e970a25694f4799056',
        timestamp: '6 วันที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-6',
    tokenId: 6,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Shine Bright Prism_00',
    description: 'โครงสร้างผลึกอเมทิสต์ที่สร้างขึ้นด้วยอัลกอริทึม ส่องสว่างด้วยเลเซอร์นีออนคู่แบบสมมาตร',
    image: SVG_SHINE_BRIGHT,
    category: '3D',
    creator: {
      name: 'Roy Vance',
      address: '0xce6b221eb847898863f683e970a25694f4799056',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Roy',
      verified: true,
    },
    owner: '0x992b8d541E3435EbEb76587c653457a4192Af010',
    isListed: true,
    priceSepoliaETH: '0.030',
    highestBidSepoliaETH: '0.024',
    likes: 420,
    featured: false,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Geometry', value: 'Hexagonal Prism' },
      { trait_type: 'Dispersion', value: 'High Chromatic' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x992b8d541E3435EbEb76587c653457a4192Af010',
        priceSepoliaETH: '0.030',
        timestamp: '8 ชั่วโมงที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-7',
    tokenId: 7,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Fire Magic Tendril',
    description: 'ริบบิ้นพลาสมาสีฟ้าและมาเจนต้าที่เคลื่อนไหวอย่างมีชีวิตผ่านควอนตัมอีเธอร์เหลว ส่องสว่างในความมืดมิด',
    image: SVG_FIRE_MAGIC,
    category: 'Abstract',
    creator: {
      name: 'Roy Vance',
      address: '0xce6b221eb847898863f683e970a25694f4799056',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Roy',
      verified: true,
    },
    owner: '0x992b8d541E3435EbEb76587c653457a4192Af010',
    isListed: true,
    priceSepoliaETH: '0.029',
    highestBidSepoliaETH: '0.012',
    likes: 789,
    featured: false,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Element', value: 'Plasma' },
      { trait_type: 'Density', value: 'Subatomic' },
    ],
    activity: [
      {
        type: 'List',
        from: '0x992b8d541E3435EbEb76587c653457a4192Af010',
        priceSepoliaETH: '0.029',
        timestamp: '12 ชั่วโมงที่แล้ว',
      },
    ],
  },
  {
    id: 'nft-8',
    tokenId: 8,
    contractAddress: NFT_CONTRACT_ADDRESS,
    title: 'Cyber SmileFace #99',
    description: 'ตราสัญลักษณ์หน้ายิ้มเรโทร-ฟิวเจอร์ริสติกที่สร้างขึ้นใหม่ด้วยเม็ดสีฟอสฟอรัสเรืองแสงกัมมันตรังสี',
    image: SVG_CYBER_SMILE,
    category: 'Collectible',
    creator: {
      name: 'Roy Vance',
      address: '0xce6b221eb847898863f683e970a25694f4799056',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Roy',
      verified: true,
    },
    owner: '0x889B2a4e4029B85b4629Ac1741528E75BfE2164A',
    isListed: false, // Showcase Only
    priceSepoliaETH: '0.045',
    highestBidSepoliaETH: '0.040',
    likes: 1300,
    featured: false,
    network: 'Sepolia',
    attributes: [
      { trait_type: 'Expression', value: 'Rebellious Wink' },
      { trait_type: 'Surface', value: 'Phosphor Glow' },
    ],
    activity: [
      {
        type: 'Mint',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x889B2a4e4029B85b4629Ac1741528E75BfE2164A',
        timestamp: '1 วันที่แล้ว',
      },
    ],
  },
];
