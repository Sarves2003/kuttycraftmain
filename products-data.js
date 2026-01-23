// products-data.js
// Product data for Kutty Craft - Keep this file separate for easy management

const productsData = [
    // Crochet Products (5 items)
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Crochet Baby Bunny", 
        category: "Crochet", 
        description: "Adorable handmade crochet bunny perfect for gifting. Made with soft, premium yarn in beautiful pastel colors.", 
        price: 450, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Crochet Bear Toy", 
        category: "Crochet", 
        description: "Soft and cuddly crochet bear made with love. Perfect companion for kids and collectors alike.", 
        price: 520, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Crochet Octopus", 
        category: "Crochet", 
        description: "Colorful crochet octopus with 8 cute tentacles. A unique handmade creation that brings smiles.", 
        price: 380, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Crochet Elephant", 
        category: "Crochet", 
        description: "Large crochet elephant with trunk and tusks. Handcrafted with attention to detail.", 
        price: 650, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Crochet Unicorn", 
        category: "Crochet", 
        description: "Magical crochet unicorn with horn and colorful mane.", 
        price: 620, 
        isBestSeller: true 
    },
    
    // Paintings (5 items)
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Abstract Sunset", 
        category: "Paintings", 
        description: "Beautiful abstract sunset painting with warm colors and dreamy atmosphere.", 
        price: 1200, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Mountain Landscape", 
        category: "Paintings", 
        description: "Serene mountain landscape in watercolor. Perfect for living room decor.", 
        price: 1500, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Floral Bouquet", 
        category: "Paintings", 
        description: "Vibrant floral bouquet painting with rich colors and fine details.", 
        price: 900, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Ocean Waves", 
        category: "Paintings", 
        description: "Dynamic ocean waves in acrylic. Brings the sea to your home.", 
        price: 1100, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Starry Night", 
        category: "Paintings", 
        description: "Magical starry night sky inspired painting with deep blues.", 
        price: 1400, 
        isBestSeller: true 
    },

    // Makeup Pouches (5 items)
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Floral Makeup Pouch", 
        category: "Makeup Pouch", 
        description: "Handmade floral printed makeup pouch. Perfect for organizing cosmetics.", 
        price: 280, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Polka Dot Pouch", 
        category: "Makeup Pouch", 
        description: "Cute polka dot cosmetic pouch with zipper closure.", 
        price: 250, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Velvet Makeup Bag", 
        category: "Makeup Pouch", 
        description: "Luxury velvet makeup organizer. Soft and spacious.", 
        price: 350, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Canvas Pouch", 
        category: "Makeup Pouch", 
        description: "Natural canvas utility pouch. Eco-friendly and durable.", 
        price: 200, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Embroidered Bag", 
        category: "Makeup Pouch", 
        description: "Hand-embroidered cosmetic bag with intricate designs.", 
        price: 380, 
        isBestSeller: true 
    },

    // Clocks (5 items)
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Wooden Wall Clock", 
        category: "Clock", 
        description: "Rustic wooden wall clock. Handcrafted from quality wood.", 
        price: 1500, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Modern Minimalist Clock", 
        category: "Clock", 
        description: "Sleek minimalist design clock. Perfect for modern homes.", 
        price: 1200, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Vintage Clock", 
        category: "Clock", 
        description: "Antique style vintage clock with roman numerals.", 
        price: 1800, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Floral Clock", 
        category: "Clock", 
        description: "Hand-painted floral clock. Adds charm to any room.", 
        price: 1400, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Marble Clock", 
        category: "Clock", 
        description: "Elegant marble face clock. Premium quality timepiece.", 
        price: 2000, 
        isBestSeller: true 
    },

    // Crafts (5 items)
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Handmade Candles", 
        category: "Crafts", 
        description: "Aromatic handmade soy candles in various scents.", 
        price: 350, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg"
        ], 
        title: "Macrame Wall Hanging", 
        category: "Crafts", 
        description: "Boho macrame wall decoration. Handwoven with care.", 
        price: 800, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Dreamcatcher", 
        category: "Crafts", 
        description: "Beautiful handcrafted dreamcatcher with feathers.", 
        price: 450, 
        isBestSeller: true 
    },
    { 
        images: [
            "./asset/images/IMG_3472.JPG.jpeg",
            "./asset/images/IMG_3473.JPG.jpeg"
        ], 
        title: "Wooden Coasters", 
        category: "Crafts", 
        description: "Set of 4 wooden coasters. Hand-carved and polished.", 
        price: 400, 
        isBestSeller: false 
    },
    { 
        images: [
            "./asset/images/IMG_3473.JPG.jpeg",
            "./asset/images/IMG_3627.JPG.jpeg",
            "./asset/images/IMG_3472.JPG.jpeg"
        ], 
        title: "Clay Pots", 
        category: "Crafts", 
        description: "Hand-painted clay plant pots. Set of 3 different sizes.", 
        price: 280, 
        isBestSeller: true 
    },
];