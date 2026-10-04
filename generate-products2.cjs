const fs = require('fs');

// Curated list of 100% working Unsplash images
const categoryImages = {
  'Electronics': [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", // Headphones
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", // Watch
    "https://images.unsplash.com/photo-1527814050087-379381547339?q=80&w=800&auto=format&fit=crop", // Mouse
    "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop", // Keyboard
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop", // Speaker
    "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=800&auto=format&fit=crop", // Drone
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", // Laptop
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop", // Smartwatch
    "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=800&auto=format&fit=crop", // Phone
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"  // Earbuds
  ],
  'Fashion': [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", // Shoes red
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop", // Jacket
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", // Bag
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", // Sunglasses
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop", // Hoodie
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", // T-shirt
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop", // Sneakers
    "https://images.unsplash.com/photo-1434389678248-cb58045d65f5?q=80&w=800&auto=format&fit=crop", // Sweater
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"  // Coat
  ],
  'Home & Kitchen': [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop", // Lamp
    "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop", // Coffee Machine
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop", // Purifier
    "https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?q=80&w=800&auto=format&fit=crop", // Desk organizer
    "https://images.unsplash.com/photo-1584285427181-79b8a213e878?q=80&w=800&auto=format&fit=crop", // Cookware
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop", // Sofa
    "https://images.unsplash.com/photo-1583847268964-b28ce8f52f34?q=80&w=800&auto=format&fit=crop", // Mug
    "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?q=80&w=800&auto=format&fit=crop"  // Diffuser
  ],
  'Sports': [
    "https://images.unsplash.com/photo-1592432678016-e910b06b3848?q=80&w=800&auto=format&fit=crop", // Yoga mat
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop", // Dumbbell
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop", // Water bottle
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", // Gym equipment
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop", // Boxing
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"  // Sneaker athletic
  ],
  'Books': [
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", // Book 1
    "https://images.unsplash.com/photo-1531346878377-a541ba67a149?q=80&w=800&auto=format&fit=crop", // Journal
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", // Design book
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", // Bookshelf
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop"  // Open book
  ],
  'Gaming': [
    "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop", // Console
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop", // Controller
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop", // PC setup
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop", // Gaming 2
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop"  // Headphones gaming
  ],
  'Beauty': [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop", // Serum
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop", // Perfume
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop", // Cosmetics
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", // Skincare
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop"  // Lipsticks
  ],
  'Accessories': [
    "https://images.unsplash.com/photo-1605100804763-247f67b8548e?q=80&w=800&auto=format&fit=crop", // Ring
    "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", // Wallet
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", // Necklace
    "https://images.unsplash.com/photo-1509941943102-10c232535736?q=80&w=800&auto=format&fit=crop", // Watch classical
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"  // Sunglasses accessory
  ]
};

// Fallback images if category is not found
const fallbackImages = categoryImages['Electronics'];

const categories = [
  {
    name: 'Electronics',
    items: [
      { n: "Quantum Sound Pro Headphones" }, { n: "NovaWatch Series X" }, { n: "AeroGlide Gaming Mouse" },
      { n: "MechPro Mechanical Keyboard" }, { n: "BassBoom Portable Speaker" }, { n: "UltraVision 4K Drone" },
      { n: "UltraWide Curved Monitor" }, { n: "Portable Power Bank 20000mAh" }, { n: "ProX Studio Microphone" },
      { n: "Elite Wireless Earbuds" }, { n: "Smart Home Hub Max" }, { n: "VisionVR Headset" },
      { n: "NextGen Tablet Pro" }, { n: "SlimLapt 15-inch" }, { n: "4K Action Camera" }
    ]
  },
  {
    name: 'Fashion',
    items: [
      { n: "Urban Style Sneakers" }, { n: "Classic Denim Jacket" }, { n: "Premium Leather Backpack" },
      { n: "Polarized Aviator Sunglasses" }, { n: "Cozy Oversized Hoodie" }, { n: "Classic White T-Shirt" },
      { n: "Vintage Leather Boots" }, { n: "Athletic Running Shorts" }, { n: "Cashmere Winter Scarf" },
      { n: "Slim Fit Chino Pants" }, { n: "Designer Silk Tie" }, { n: "Minimalist Crossbody Bag" },
      { n: "Waterproof Trench Coat" }, { n: "Knitted Wool Beanie" }, { n: "Comfort Fit Sweatpants" }
    ]
  },
  {
    name: 'Home & Kitchen',
    items: [
      { n: "Aura Smart Lamp" }, { n: "BrewMaster Coffee Machine" }, { n: "PureAir HEPA Purifier" },
      { n: "Minimalist Desk Organizer" }, { n: "Ceramic Cookware Set" }, { n: "Robot Vacuum Cleaner" },
      { n: "Ergonomic Office Chair" }, { n: "Luxury Memory Foam Mattress" }, { n: "Stainless Steel Chef Knife" },
      { n: "Smart Temperature Mug" }, { n: "Aromatherapy Diffuser" }, { n: "Bamboo Cutting Board Set" },
      { n: "Premium Cotton Bed Sheets" }, { n: "Electric Standing Desk" }, { n: "Blender Pro 1000W" }
    ]
  },
  {
    name: 'Sports',
    items: [
      { n: "ProGrip Yoga Mat" }, { n: "Adjustable Dumbbell Set" }, { n: "Smart Water Bottle" },
      { n: "Resistance Band Kit" }, { n: "Foam Roller Pro" }, { n: "Jump Rope with Counter" },
      { n: "Boxing Gloves Elite" }, { n: "Tennis Racket Pro" }, { n: "Cycling Helmet Aero" },
      { n: "Treadmill Max Runner" }, { n: "Basketball Pro Grip" }, { n: "Hiking Backpack 50L" },
      { n: "Fitness Tracker Ring" }, { n: "Kettlebell 20lbs" }
    ]
  },
  {
    name: 'Books',
    items: [
      { n: "The Future of AI (Hardcover)" }, { n: "Minimalist Journal" }, { n: "The Art of Design" },
      { n: "Startup Playbook" }, { n: "Cosmos Illustrated" }, { n: "Daily Planner 2027" },
      { n: "Mastering React" }, { n: "Healthy Recipes Guide" }, { n: "Science Fiction Anthology" },
      { n: "World History Encylopedia" }, { n: "Photography Basics" }, { n: "Mindfulness and Meditation" },
      { n: "Financial Freedom 101" }
    ]
  },
  {
    name: 'Gaming',
    items: [
      { n: "Nexus Gaming Console" }, { n: "Pro Elite Controller" }, { n: "RGB Mechanical Keyboard" },
      { n: "Surround Sound Headset" }, { n: "Gaming Chair Racing Style" }, { n: "Extended Mouse Pad" },
      { n: "Streaming Webcam 1080p" }, { n: "Capture Card Pro" }, { n: "Arcade Fight Stick" },
      { n: "VR Racing Wheel" }, { n: "Console Travel Case" }, { n: "Gaming Glasses UV" }
    ]
  },
  {
    name: 'Beauty',
    items: [
      { n: "Radiant Skin Serum" }, { n: "Luxury Perfume Set" }, { n: "Organic Face Cleanser" },
      { n: "Matte Lipstick Collection" }, { n: "Pro Makeup Brush Set" }, { n: "Hydrating Moisturizer" },
      { n: "Charcoal Face Mask" }, { n: "Anti-aging Night Cream" }, { n: "Natural Essential Oils" },
      { n: "Hair Styling Clay" }, { n: "Sonic Facial Cleansing Brush" }, { n: "Vegan Nail Polish" }
    ]
  },
  {
    name: 'Accessories',
    items: [
      { n: "Titanium Men's Ring" }, { n: "Leather Wallet" }, { n: "Minimalist Silver Necklace" },
      { n: "Chronograph Watch" }, { n: "Woven Braided Belt" }, { n: "Stainless Steel Cufflinks" },
      { n: "RFID Blocking Cardholder" }, { n: "Gold Hoop Earrings" }, { n: "Canvas Weekend Duffle" },
      { n: "Travel Passport Holder" }, { n: "Automatic Umbrella" }, { n: "Silk Pocket Square" }
    ]
  }
];

let globalId = 1;
const products = [];

categories.forEach(cat => {
  const imagesForCat = categoryImages[cat.name] || fallbackImages;
  
  cat.items.forEach((item, index) => {
    const basePrice = Math.floor(Math.random() * 200) + 20;
    const isDiscounted = Math.random() > 0.4;
    const discount = isDiscounted ? Math.floor(Math.random() * 30) + 10 : 0;
    const originalPrice = isDiscounted ? parseFloat((basePrice * (1 + discount / 100)).toFixed(2)) : basePrice;
    
    // Pick image deterministically so it doesn't change on rebuilds
    const image = imagesForCat[index % imagesForCat.length];

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
console.log('Products generated successfully with reliable Unsplash images. Total products:', products.length);
