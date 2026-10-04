const fs = require('fs');

const categories = [
  {
    name: 'Electronics',
    items: [
      { n: "Quantum Sound Pro Headphones", k: "headphones" },
      { n: "NovaWatch Series X", k: "smartwatch" },
      { n: "AeroGlide Gaming Mouse", k: "mouse,computer" },
      { n: "MechPro Mechanical Keyboard", k: "keyboard,mechanical" },
      { n: "BassBoom Portable Speaker", k: "speaker,bluetooth" },
      { n: "UltraVision 4K Drone", k: "drone" },
      { n: "UltraWide Curved Monitor", k: "monitor,display" },
      { n: "Portable Power Bank 20000mAh", k: "powerbank" },
      { n: "ProX Studio Microphone", k: "microphone,podcast" },
      { n: "Elite Wireless Earbuds", k: "earbuds" },
      { n: "Smart Home Hub Max", k: "smarthub" },
      { n: "VisionVR Headset", k: "vrheadset" },
      { n: "NextGen Tablet Pro", k: "tablet,ipad" },
      { n: "SlimLapt 15-inch", k: "laptop,macbook" },
      { n: "4K Action Camera", k: "actioncamera" }
    ]
  },
  {
    name: 'Fashion',
    items: [
      { n: "Urban Style Sneakers", k: "sneakers,shoes" },
      { n: "Classic Denim Jacket", k: "denim,jacket" },
      { n: "Premium Leather Backpack", k: "leather,backpack" },
      { n: "Polarized Aviator Sunglasses", k: "sunglasses,aviator" },
      { n: "Cozy Oversized Hoodie", k: "hoodie" },
      { n: "Classic White T-Shirt", k: "tshirt,white" },
      { n: "Vintage Leather Boots", k: "boots,leather" },
      { n: "Athletic Running Shorts", k: "shorts,athletic" },
      { n: "Cashmere Winter Scarf", k: "scarf,cashmere" },
      { n: "Slim Fit Chino Pants", k: "chinos,pants" },
      { n: "Designer Silk Tie", k: "tie,silk" },
      { n: "Minimalist Crossbody Bag", k: "crossbody,bag" },
      { n: "Waterproof Trench Coat", k: "trenchcoat" },
      { n: "Knitted Wool Beanie", k: "beanie,hat" },
      { n: "Comfort Fit Sweatpants", k: "sweatpants" }
    ]
  },
  {
    name: 'Home & Kitchen',
    items: [
      { n: "Aura Smart Lamp", k: "smartlamp" },
      { n: "BrewMaster Coffee Machine", k: "coffeemachine" },
      { n: "PureAir HEPA Purifier", k: "airpurifier" },
      { n: "Minimalist Desk Organizer", k: "deskorganizer" },
      { n: "Ceramic Cookware Set", k: "cookware,pots" },
      { n: "Robot Vacuum Cleaner", k: "robotvacuum" },
      { n: "Ergonomic Office Chair", k: "officechair" },
      { n: "Luxury Memory Foam Mattress", k: "mattress" },
      { n: "Stainless Steel Chef Knife", k: "chefknife" },
      { n: "Smart Temperature Mug", k: "smartmug" },
      { n: "Aromatherapy Diffuser", k: "diffuser" },
      { n: "Bamboo Cutting Board Set", k: "cuttingboard" },
      { n: "Premium Cotton Bed Sheets", k: "bedsheets" },
      { n: "Electric Standing Desk", k: "standingdesk" },
      { n: "Blender Pro 1000W", k: "blender" }
    ]
  },
  {
    name: 'Sports',
    items: [
      { n: "ProGrip Yoga Mat", k: "yogamat" },
      { n: "Adjustable Dumbbell Set", k: "dumbbells" },
      { n: "Smart Water Bottle", k: "waterbottle" },
      { n: "Resistance Band Kit", k: "resistancebands" },
      { n: "Foam Roller Pro", k: "foamroller" },
      { n: "Jump Rope with Counter", k: "jumprope" },
      { n: "Boxing Gloves Elite", k: "boxinggloves" },
      { n: "Tennis Racket Pro", k: "tennisracket" },
      { n: "Cycling Helmet Aero", k: "cyclinghelmet" },
      { n: "Treadmill Max Runner", k: "treadmill" },
      { n: "Basketball Pro Grip", k: "basketball" },
      { n: "Hiking Backpack 50L", k: "hikingbackpack" },
      { n: "Fitness Tracker Ring", k: "fitnessring" },
      { n: "Kettlebell 20lbs", k: "kettlebell" }
    ]
  },
  {
    name: 'Books',
    items: [
      { n: "The Future of AI (Hardcover)", k: "book,ai" },
      { n: "Minimalist Journal", k: "journal,notebook" },
      { n: "The Art of Design", k: "designbook" },
      { n: "Startup Playbook", k: "startupbook" },
      { n: "Cosmos Illustrated", k: "spacebook" },
      { n: "Daily Planner 2027", k: "planner" },
      { n: "Mastering React", k: "programmingbook" },
      { n: "Healthy Recipes Guide", k: "cookbook" },
      { n: "Science Fiction Anthology", k: "scifibook" },
      { n: "World History Encylopedia", k: "historybook" },
      { n: "Photography Basics", k: "photographybook" },
      { n: "Mindfulness and Meditation", k: "meditationbook" },
      { n: "Financial Freedom 101", k: "financebook" }
    ]
  },
  {
    name: 'Gaming',
    items: [
      { n: "Nexus Gaming Console", k: "console,gaming" },
      { n: "Pro Elite Controller", k: "controller,xbox" },
      { n: "RGB Mechanical Keyboard", k: "gamingkeyboard" },
      { n: "Surround Sound Headset", k: "gamingheadset" },
      { n: "Gaming Chair Racing Style", k: "gamingchair" },
      { n: "Extended Mouse Pad", k: "mousepad" },
      { n: "Streaming Webcam 1080p", k: "webcam" },
      { n: "Capture Card Pro", k: "capturecard" },
      { n: "Arcade Fight Stick", k: "fightstick" },
      { n: "VR Racing Wheel", k: "racingwheel" },
      { n: "Console Travel Case", k: "consolecase" },
      { n: "Gaming Glasses UV", k: "gamingglasses" }
    ]
  },
  {
    name: 'Beauty',
    items: [
      { n: "Radiant Skin Serum", k: "serum,skincare" },
      { n: "Luxury Perfume Set", k: "perfume" },
      { n: "Organic Face Cleanser", k: "cleanser" },
      { n: "Matte Lipstick Collection", k: "lipstick" },
      { n: "Pro Makeup Brush Set", k: "makeupbrushes" },
      { n: "Hydrating Moisturizer", k: "moisturizer" },
      { n: "Charcoal Face Mask", k: "facemask" },
      { n: "Anti-aging Night Cream", k: "nightcream" },
      { n: "Natural Essential Oils", k: "essentialoils" },
      { n: "Hair Styling Clay", k: "hairclay" },
      { n: "Sonic Facial Cleansing Brush", k: "facialbrush" },
      { n: "Vegan Nail Polish", k: "nailpolish" }
    ]
  },
  {
    name: 'Accessories',
    items: [
      { n: "Titanium Men's Ring", k: "ring,titanium" },
      { n: "Leather Wallet", k: "wallet,leather" },
      { n: "Minimalist Silver Necklace", k: "necklace,silver" },
      { n: "Chronograph Watch", k: "watch,analog" },
      { n: "Woven Braided Belt", k: "belt" },
      { n: "Stainless Steel Cufflinks", k: "cufflinks" },
      { n: "RFID Blocking Cardholder", k: "cardholder" },
      { n: "Gold Hoop Earrings", k: "earrings" },
      { n: "Canvas Weekend Duffle", k: "dufflebag" },
      { n: "Travel Passport Holder", k: "passportholder" },
      { n: "Automatic Umbrella", k: "umbrella" },
      { n: "Silk Pocket Square", k: "pocketsquare" }
    ]
  }
];

let globalId = 1;
const products = [];

categories.forEach(cat => {
  cat.items.forEach(item => {
    const basePrice = Math.floor(Math.random() * 200) + 20;
    const isDiscounted = Math.random() > 0.4;
    const discount = isDiscounted ? Math.floor(Math.random() * 30) + 10 : 0;
    const originalPrice = isDiscounted ? parseFloat((basePrice * (1 + discount / 100)).toFixed(2)) : basePrice;
    
    const lock = globalId + 100;
    const image = "https://loremflickr.com/800/800/" + item.k + "?lock=" + lock;

    products.push({
      id: "prod_" + globalId,
      name: item.n,
      category: cat.name,
      price: basePrice,
      originalPrice: originalPrice,
      discount: discount,
      rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 1500) + 10,
      image: image,
      description: "Experience the premium quality of " + item.n + ". Designed with precision and top-tier materials to provide the best experience in " + cat.name + ".",
      specifications: [
        "Premium Quality Material",
        "Durable Construction",
        "Modern Design",
        "1 Year Warranty"
      ],
      stock: Math.floor(Math.random() * 200) + 5
    });

    globalId++;
  });
});

const fileContent = "export const products = " + JSON.stringify(products, null, 2) + ";";
fs.writeFileSync('C:/Users/NAISE GUPTA/Downloads/NOVA-MART-FINAL/ShopSphere3D/src/data/products.js', fileContent);
console.log('Products generated successfully. Total products:', products.length);
