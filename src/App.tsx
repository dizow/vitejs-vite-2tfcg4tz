import { useMemo, useState } from 'react';
import './style.css';

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  specs: string;
  imageUrl: string;
  amazonUrl: string;
  officialUrl: string;
  modelUrl: string;
};

type Item = [string, string, number, string];

const categories = [
  'CPU',
  'GPU',
  'Motherboard',
  'RAM',
  'Storage',
  'PSU',
  'Case',
  'Cooling',
];

const catalog: Record<string, Item[]> = {
  CPU: [
    ['Ryzen 9 9950X', 'AMD', 649, '16 cores · 32 threads · AM5'],
    ['Ryzen 7 9800X3D', 'AMD', 479, '8 cores · 16 threads · 3D V-Cache'],
    ['Ryzen 7 9700X', 'AMD', 329, '8 cores · 16 threads · AM5'],
    ['Ryzen 5 9600X', 'AMD', 249, '6 cores · 12 threads · AM5'],
    ['Ryzen 9 9900X', 'AMD', 399, '12 cores · 24 threads · AM5'],
    ['Core Ultra 9 285K', 'Intel', 589, '24 cores · LGA1851'],
    ['Core Ultra 7 265K', 'Intel', 379, '20 cores · LGA1851'],
    ['Core Ultra 5 245K', 'Intel', 279, '14 cores · LGA1851'],
    ['Core i9-14900K', 'Intel', 499, '24 cores · LGA1700'],
    ['Core i7-14700K', 'Intel', 369, '20 cores · LGA1700'],
    ['Ryzen 9 9950X3D', 'AMD', 699, '16 cores · 32 threads · AM5'],
    ['Ryzen 9 9900X3D', 'AMD', 599, '12 cores · 24 threads · AM5'],
    ['Ryzen 9 7950X', 'AMD', 549, '16 cores · 32 threads · AM5'],
    ['Ryzen 9 7900X', 'AMD', 399, '12 cores · 24 threads · AM5'],
    ['Ryzen 9 7900', 'AMD', 379, '12 cores · 24 threads · AM5'],
    ['Ryzen 7 7800X3D', 'AMD', 399, '8 cores · 16 threads · AM5'],
    ['Ryzen 7 7700X', 'AMD', 299, '8 cores · 16 threads · AM5'],
    ['Ryzen 7 7700', 'AMD', 279, '8 cores · 16 threads · AM5'],
    ['Ryzen 5 7600X', 'AMD', 219, '6 cores · 12 threads · AM5'],
    ['Ryzen 5 7600', 'AMD', 199, '6 cores · 12 threads · AM5'],
    ['Ryzen 5 7500F', 'AMD', 159, '6 cores · 12 threads · AM5'],
    ['Ryzen 7 5700X3D', 'AMD', 229, '8 cores · 16 threads · AM4'],
    ['Core Ultra 7 265KF', 'Intel', 359, '20 cores · LGA1851'],
    ['Core Ultra 7 265', 'Intel', 339, '20 cores · LGA1851'],
    ['Core Ultra 5 245KF', 'Intel', 259, '14 cores · LGA1851'],
    ['Core Ultra 5 225', 'Intel', 199, '10 cores · LGA1851'],
    ['Core i9-14900KF', 'Intel', 469, '24 cores · LGA1700'],
    ['Core i7-14700KF', 'Intel', 349, '20 cores · LGA1700'],
    ['Core i5-14600K', 'Intel', 289, '14 cores · LGA1700'],
    ['Core i5-14400F', 'Intel', 179, '10 cores · LGA1700'],
  ],

  GPU: [
    ['GeForce RTX 5090', 'NVIDIA', 1999, '32GB GDDR7 · Enthusiast'],
    ['GeForce RTX 5080', 'NVIDIA', 999, '16GB GDDR7 · High-end'],
    ['GeForce RTX 5070 Ti', 'NVIDIA', 749, '16GB GDDR7'],
    ['GeForce RTX 5070', 'NVIDIA', 549, '12GB GDDR7'],
    ['GeForce RTX 5060 Ti', 'NVIDIA', 429, '16GB GDDR7'],
    ['GeForce RTX 5060', 'NVIDIA', 299, '8GB GDDR7'],
    ['Radeon RX 9070 XT', 'AMD', 599, '16GB GDDR6'],
    ['Radeon RX 9070', 'AMD', 499, '16GB GDDR6'],
    ['Radeon RX 9060 XT', 'AMD', 349, '16GB GDDR6'],
    ['Radeon RX 7900 XTX', 'AMD', 899, '24GB GDDR6'],
    ['Radeon RX 7800 XT', 'AMD', 479, '16GB GDDR6'],
    ['Arc B580', 'Intel', 249, '12GB GDDR6'],
    ['GeForce RTX 4090', 'NVIDIA', 1599, '24GB GDDR6X'],
    ['GeForce RTX 4080 SUPER', 'NVIDIA', 999, '16GB GDDR6X'],
    ['GeForce RTX 4070 Ti SUPER', 'NVIDIA', 799, '16GB GDDR6X'],
    ['GeForce RTX 4070 Ti', 'NVIDIA', 699, '12GB GDDR6X'],
    ['GeForce RTX 4070 SUPER', 'NVIDIA', 599, '12GB GDDR6X'],
    ['GeForce RTX 4070', 'NVIDIA', 549, '12GB GDDR6X'],
    ['GeForce RTX 4060 Ti 16GB', 'NVIDIA', 449, '16GB GDDR6'],
    ['GeForce RTX 4060 Ti 8GB', 'NVIDIA', 379, '8GB GDDR6'],
    ['GeForce RTX 4060', 'NVIDIA', 299, '8GB GDDR6'],
    ['GeForce RTX 3090', 'NVIDIA', 899, '24GB GDDR6X'],
    ['GeForce RTX 3080', 'NVIDIA', 499, '10GB GDDR6X'],
    ['Radeon RX 7900 XT', 'AMD', 699, '20GB GDDR6'],
    ['Radeon RX 7900 GRE', 'AMD', 549, '16GB GDDR6'],
    ['Radeon RX 7700 XT', 'AMD', 399, '12GB GDDR6'],
    ['Radeon RX 7600 XT', 'AMD', 329, '16GB GDDR6'],
    ['Radeon RX 7600', 'AMD', 259, '8GB GDDR6'],
    ['Radeon RX 6950 XT', 'AMD', 599, '16GB GDDR6'],
    ['Arc B570', 'Intel', 219, '10GB GDDR6'],
  ],

  Motherboard: [
    ['ROG Crosshair X870E Hero', 'ASUS', 699, 'AM5 · X870E · ATX'],
    ['ROG Strix X870E-E', 'ASUS', 499, 'AM5 · X870E · ATX'],
    ['TUF Gaming B850-Plus', 'ASUS', 219, 'AM5 · B850 · ATX'],
    ['MPG X870E Carbon WiFi', 'MSI', 449, 'AM5 · X870E · ATX'],
    ['MAG B850 Tomahawk', 'MSI', 239, 'AM5 · B850 · ATX'],
    ['B850 AORUS Elite WiFi7', 'Gigabyte', 229, 'AM5 · B850 · ATX'],
    ['X870E AORUS Master', 'Gigabyte', 499, 'AM5 · X870E · E-ATX'],
    ['Z890 AORUS Elite', 'Gigabyte', 269, 'LGA1851 · Z890 · ATX'],
    ['Z890 Tomahawk WiFi', 'MSI', 289, 'LGA1851 · Z890 · ATX'],
    ['Prime Z890-P WiFi', 'ASUS', 219, 'LGA1851 · Z890 · ATX'],
    ['ROG Strix X670E-E', 'ASUS', 399, 'AM5 · X670E · ATX'],
    ['ProArt X870E-Creator', 'ASUS', 449, 'AM5 · X870E · ATX'],
    ['ROG Strix B650E-F', 'ASUS', 269, 'AM5 · B650E · ATX'],
    ['Prime B650-Plus', 'ASUS', 159, 'AM5 · B650 · ATX'],
    ['TUF Gaming B650M-Plus', 'ASUS', 169, 'AM5 · B650 · mATX'],
    ['MEG X670E ACE', 'MSI', 499, 'AM5 · X670E · E-ATX'],
    ['MPG B650 Edge WiFi', 'MSI', 219, 'AM5 · B650 · ATX'],
    ['PRO B650-P WiFi', 'MSI', 169, 'AM5 · B650 · ATX'],
    ['MAG B650M Mortar WiFi', 'MSI', 179, 'AM5 · B650 · mATX'],
    ['B650 AORUS Elite AX', 'Gigabyte', 189, 'AM5 · B650 · ATX'],
    ['X670E AORUS Pro X', 'Gigabyte', 329, 'AM5 · X670E · ATX'],
    ['B650I AORUS Ultra', 'Gigabyte', 239, 'AM5 · B650 · Mini-ITX'],
    ['Z790 AORUS Master', 'Gigabyte', 399, 'LGA1700 · Z790 · E-ATX'],
    ['Z790 Gaming X AX', 'Gigabyte', 219, 'LGA1700 · Z790 · ATX'],
    ['MAG Z790 Tomahawk WiFi', 'MSI', 239, 'LGA1700 · Z790 · ATX'],
    ['PRO Z790-A WiFi', 'MSI', 219, 'LGA1700 · Z790 · ATX'],
    ['ROG Strix Z790-E', 'ASUS', 399, 'LGA1700 · Z790 · ATX'],
    ['TUF Gaming Z790-Plus', 'ASUS', 229, 'LGA1700 · Z790 · ATX'],
    ['B760 Gaming X AX', 'Gigabyte', 159, 'LGA1700 · B760 · ATX'],
    ['B760M Mortar WiFi', 'MSI', 169, 'LGA1700 · B760 · mATX'],
  ],

  RAM: [
    ['Vengeance RGB 32GB DDR5', 'Corsair', 119, '2×16GB · 6000MHz'],
    ['Vengeance RGB 64GB DDR5', 'Corsair', 219, '2×32GB · 6000MHz'],
    ['Dominator Titanium 64GB', 'Corsair', 299, '2×32GB · DDR5'],
    ['Trident Z5 Neo RGB 32GB', 'G.Skill', 129, '2×16GB · 6000MHz'],
    ['Trident Z5 RGB 64GB', 'G.Skill', 239, '2×32GB · DDR5'],
    ['Flare X5 32GB', 'G.Skill', 99, '2×16GB · DDR5'],
    ['Fury Beast RGB 32GB', 'Kingston', 109, '2×16GB · DDR5'],
    ['Fury Renegade 64GB', 'Kingston', 209, '2×32GB · DDR5'],
    ['XPG Lancer RGB 32GB', 'ADATA', 99, '2×16GB · DDR5'],
    ['T-Force Delta RGB 32GB', 'TeamGroup', 109, '2×16GB · DDR5'],
    ['Vengeance LPX 32GB DDR4', 'Corsair', 69, '2×16GB · 3200MHz'],
    ['Vengeance LPX 64GB DDR4', 'Corsair', 119, '2×32GB · 3600MHz'],
    ['Dominator Platinum RGB 32GB', 'Corsair', 159, '2×16GB · DDR5'],
    ['Vengeance 32GB DDR5', 'Corsair', 99, '2×16GB · 6000MHz'],
    ['Trident Z5 Royal 32GB', 'G.Skill', 179, '2×16GB · DDR5'],
    ['Trident Z5 Neo 64GB', 'G.Skill', 199, '2×32GB · 6000MHz'],
    ['Ripjaws S5 32GB', 'G.Skill', 109, '2×16GB · DDR5'],
    ['Ripjaws V 32GB DDR4', 'G.Skill', 65, '2×16GB · 3600MHz'],
    ['Fury Beast 64GB DDR5', 'Kingston', 179, '2×32GB · 6000MHz'],
    ['Fury Beast 16GB DDR5', 'Kingston', 59, '2×8GB · 5200MHz'],
    ['Fury Renegade RGB 32GB', 'Kingston', 149, '2×16GB · DDR5'],
    ['Renegade 32GB DDR4', 'Kingston', 89, '2×16GB · 3600MHz'],
    ['XPG Lancer Blade 32GB', 'ADATA', 89, '2×16GB · DDR5'],
    ['XPG Spectrix D50 32GB', 'ADATA', 99, '2×16GB · DDR4'],
    ['T-Force Vulcan 32GB', 'TeamGroup', 79, '2×16GB · DDR5'],
    ['T-Force Delta RGB 64GB', 'TeamGroup', 189, '2×32GB · DDR5'],
    ['Vulcan Z 32GB DDR4', 'TeamGroup', 59, '2×16GB · 3200MHz'],
    ['Viper Venom 32GB', 'Patriot', 89, '2×16GB · DDR5'],
    ['Viper Steel 32GB DDR4', 'Patriot', 69, '2×16GB · 3600MHz'],
    ['Pro 32GB DDR5', 'Crucial', 85, '2×16GB · 5600MHz'],
  ],

  Storage: [
    ['990 PRO 1TB', 'Samsung', 109, 'NVMe · PCIe 4.0'],
    ['990 PRO 2TB', 'Samsung', 169, 'NVMe · PCIe 4.0'],
    ['990 EVO Plus 2TB', 'Samsung', 139, 'NVMe · PCIe 4.0'],
    ['WD Black SN850X 1TB', 'Western Digital', 99, 'NVMe · PCIe 4.0'],
    ['WD Black SN850X 2TB', 'Western Digital', 149, 'NVMe · PCIe 4.0'],
    ['WD Black SN8100 2TB', 'Western Digital', 219, 'NVMe · PCIe 5.0'],
    ['Crucial T500 2TB', 'Crucial', 139, 'NVMe · PCIe 4.0'],
    ['Crucial P3 Plus 1TB', 'Crucial', 69, 'NVMe · PCIe 4.0'],
    ['FireCuda 530 2TB', 'Seagate', 179, 'NVMe · PCIe 4.0'],
    ['MP700 PRO 2TB', 'Corsair', 229, 'NVMe · PCIe 5.0'],
    ['990 PRO 4TB', 'Samsung', 299, 'NVMe · PCIe 4.0'],
    ['980 PRO 1TB', 'Samsung', 89, 'NVMe · PCIe 4.0'],
    ['980 PRO 2TB', 'Samsung', 149, 'NVMe · PCIe 4.0'],
    ['990 EVO 1TB', 'Samsung', 79, 'NVMe · PCIe 4.0'],
    ['990 EVO 2TB', 'Samsung', 119, 'NVMe · PCIe 4.0'],
    ['SN850X 4TB', 'Western Digital', 279, 'NVMe · PCIe 4.0'],
    ['SN770 1TB', 'Western Digital', 69, 'NVMe · PCIe 4.0'],
    ['SN770 2TB', 'Western Digital', 119, 'NVMe · PCIe 4.0'],
    ['SN580 1TB', 'Western Digital', 65, 'NVMe · PCIe 4.0'],
    ['T700 2TB', 'Crucial', 199, 'NVMe · PCIe 5.0'],
    ['P5 Plus 1TB', 'Crucial', 89, 'NVMe · PCIe 4.0'],
    ['P3 Plus 2TB', 'Crucial', 99, 'NVMe · PCIe 4.0'],
    ['FireCuda 540 2TB', 'Seagate', 249, 'NVMe · PCIe 5.0'],
    ['FireCuda 530 1TB', 'Seagate', 99, 'NVMe · PCIe 4.0'],
    ['BarraCuda 2TB HDD', 'Seagate', 65, '2.5-inch · SATA'],
    ['MP600 PRO LPX 2TB', 'Corsair', 169, 'NVMe · PCIe 4.0'],
    ['MP600 CORE XT 1TB', 'Corsair', 79, 'NVMe · PCIe 4.0'],
    ['A440 Pro 2TB', 'TeamGroup', 119, 'NVMe · PCIe 4.0'],
    ['Legend 960 MAX 2TB', 'ADATA', 129, 'NVMe · PCIe 4.0'],
    ['KC3000 2TB', 'Kingston', 149, 'NVMe · PCIe 4.0'],
  ],

  PSU: [
    ['RM850x 850W', 'Corsair', 139, '850W · 80+ Gold'],
    ['RM1000x 1000W', 'Corsair', 179, '1000W · 80+ Gold'],
    ['HX1200i 1200W', 'Corsair', 289, '1200W · Platinum'],
    ['ROG Thor 1000W', 'ASUS', 299, '1000W · Platinum'],
    ['TUF Gaming 850W', 'ASUS', 139, '850W · Gold'],
    ['MAG A850GL', 'MSI', 119, '850W · Gold'],
    ['MPG A1000G', 'MSI', 169, '1000W · Gold'],
    ['AORUS P1200W', 'Gigabyte', 259, '1200W · Platinum'],
    ['Focus GX-850', 'Seasonic', 129, '850W · Gold'],
    ['Vertex GX-1000', 'Seasonic', 189, '1000W · Gold'],
    ['RM750e 750W', 'Corsair', 109, '750W · 80+ Gold'],
    ['RM850e 850W', 'Corsair', 129, '850W · 80+ Gold'],
    ['RM1200x 1200W', 'Corsair', 229, '1200W · 80+ Gold'],
    ['Shift RM850x', 'Corsair', 169, '850W · 80+ Gold'],
    ['ROG Loki 850W', 'ASUS', 249, '850W · Platinum · SFX-L'],
    ['ROG Strix 1000W', 'ASUS', 229, '1000W · Gold'],
    ['TUF Gaming 750W', 'ASUS', 109, '750W · Gold'],
    ['MAG A750GL', 'MSI', 99, '750W · Gold'],
    ['MAG A1000GL', 'MSI', 159, '1000W · Gold'],
    ['MEG Ai1300P', 'MSI', 299, '1300W · Platinum'],
    ['UD850GM', 'Gigabyte', 99, '850W · Gold'],
    ['UD1000GM', 'Gigabyte', 139, '1000W · Gold'],
    ['AORUS P850W', 'Gigabyte', 149, '850W · Gold'],
    ['Prime TX-1000', 'Seasonic', 299, '1000W · Titanium'],
    ['Vertex GX-850', 'Seasonic', 159, '850W · Gold'],
    ['Pure Power 12 M 850W', 'be quiet!', 139, '850W · Gold'],
    ['Straight Power 12 1000W', 'be quiet!', 219, '1000W · Platinum'],
    ['Leadex VII XG 850W', 'Super Flower', 139, '850W · Gold'],
    ['V850 SFX Gold', 'Cooler Master', 149, '850W · Gold · SFX'],
    ['Focus GX-750', 'Seasonic', 109, '750W · Gold'],
  ],

  Case: [
    ['H9 Flow', 'NZXT', 159, 'Dual chamber · ATX'],
    ['H6 Flow RGB', 'NZXT', 139, 'Panoramic glass · ATX'],
    ['H7 Flow', 'NZXT', 129, 'Airflow case · ATX'],
    ['O11 Dynamic EVO', 'Lian Li', 159, 'Dual chamber · ATX'],
    ['O11 Vision', 'Lian Li', 139, 'Panoramic glass · ATX'],
    ['Lancool 216', 'Lian Li', 99, 'High airflow · ATX'],
    ['5000D Airflow', 'Corsair', 149, 'High airflow · ATX'],
    ['4000D RGB Airflow', 'Corsair', 119, 'Tempered glass · ATX'],
    ['North XL', 'Fractal Design', 179, 'Wood front · E-ATX'],
    ['Torrent', 'Fractal Design', 189, 'High airflow · ATX'],
    ['H5 Flow', 'NZXT', 89, 'Airflow case · ATX'],
    ['H7 Elite', 'NZXT', 179, 'Tempered glass · ATX'],
    ['H9 Elite', 'NZXT', 239, 'Dual chamber · ATX'],
    ['O11 Dynamic EVO XL', 'Lian Li', 229, 'Full tower · E-ATX'],
    ['Lancool III', 'Lian Li', 149, 'High airflow · ATX'],
    ['Lancool 205 Mesh', 'Lian Li', 89, 'Mesh front · ATX'],
    ['7000D Airflow', 'Corsair', 229, 'Full tower · E-ATX'],
    ['3000D Airflow', 'Corsair', 79, 'Airflow case · ATX'],
    ['Pop Air', 'Fractal Design', 89, 'Mesh front · ATX'],
    ['Meshify 2', 'Fractal Design', 159, 'Mesh front · ATX'],
    ['Define 7', 'Fractal Design', 169, 'Silent case · ATX'],
    ['Shadow Base 800 FX', 'be quiet!', 179, 'ARGB airflow · ATX'],
    ['Pure Base 500DX', 'be quiet!', 99, 'Airflow · ATX'],
    ['Pure Base 600', 'be quiet!', 109, 'Silent case · ATX'],
    ['View 71 TG', 'Thermaltake', 169, 'Tempered glass · Full tower'],
    ['The Tower 300', 'Thermaltake', 149, 'Showcase · mATX'],
    ['Ceres 500', 'Thermaltake', 129, 'Mesh airflow · ATX'],
    ['NV5', 'Phanteks', 109, 'Showcase · ATX'],
    ['NV7', 'Phanteks', 199, 'Dual chamber · E-ATX'],
    ['Eclipse G500A', 'Phanteks', 119, 'High airflow · ATX'],
  ],

  Cooling: [
    ['Kraken Elite 360 RGB', 'NZXT', 279, '360mm liquid cooler'],
    ['Kraken 360', 'NZXT', 189, '360mm liquid cooler'],
    ['iCUE Link H150i LCD', 'Corsair', 299, '360mm · LCD display'],
    ['iCUE H150i Elite', 'Corsair', 219, '360mm liquid cooler'],
    ['ROG Ryujin III 360', 'ASUS', 349, '360mm · LCD display'],
    ['ROG Strix LC III 360', 'ASUS', 199, '360mm liquid cooler'],
    ['MAG CoreLiquid 360R', 'MSI', 129, '360mm liquid cooler'],
    ['Liquid Freezer III 360', 'Arctic', 119, '360mm liquid cooler'],
    ['Peerless Assassin 120', 'Thermalright', 39, 'Dual tower air cooler'],
    ['AK620 Digital', 'DeepCool', 89, 'Dual tower · Digital display'],
    ['Kraken Elite 240 RGB', 'NZXT', 239, '240mm liquid cooler'],
    ['Kraken 240', 'NZXT', 149, '240mm liquid cooler'],
    ['H100i Elite Capellix', 'Corsair', 179, '240mm liquid cooler'],
    ['H170i Elite LCD', 'Corsair', 329, '420mm · LCD display'],
    ['ROG Ryujin III 240', 'ASUS', 279, '240mm · LCD display'],
    ['ROG Strix LC II 240', 'ASUS', 149, '240mm liquid cooler'],
    ['MAG CoreLiquid 240R', 'MSI', 99, '240mm liquid cooler'],
    ['Liquid Freezer III 280', 'Arctic', 109, '280mm liquid cooler'],
    ['Liquid Freezer III 420', 'Arctic', 149, '420mm liquid cooler'],
    ['Freezer 36', 'Arctic', 39, 'Single tower air cooler'],
    ['Phantom Spirit 120', 'Thermalright', 45, 'Dual tower air cooler'],
    ['Peerless Assassin 120 SE', 'Thermalright', 35, 'Dual tower air cooler'],
    ['AK620', 'DeepCool', 69, 'Dual tower air cooler'],
    ['Assassin IV', 'DeepCool', 99, 'Dual tower air cooler'],
    ['LS720', 'DeepCool', 119, '360mm liquid cooler'],
    ['LT720', 'DeepCool', 129, '360mm liquid cooler'],
    ['Fuma 3', 'Scythe', 59, 'Dual tower air cooler'],
    ['NH-D15', 'Noctua', 119, 'Dual tower air cooler'],
    ['NH-U12A', 'Noctua', 109, 'Single tower air cooler'],
    ['NH-U12S Redux', 'Noctua', 59, 'Single tower air cooler'],
  ],
};

const officialDomains: Record<string, string> = {
  AMD: 'amd.com',
  Intel: 'intel.com',
  NVIDIA: 'nvidia.com',
  ASUS: 'asus.com',
  MSI: 'msi.com',
  Gigabyte: 'gigabyte.com',
  Corsair: 'corsair.com',
  'G.Skill': 'gskill.com',
  Kingston: 'kingston.com',
  ADATA: 'adata.com',
  Samsung: 'samsung.com',
  'Western Digital': 'wd.com',
  Crucial: 'crucial.com',
  Seagate: 'seagate.com',
  NZXT: 'nzxt.com',
  'Lian Li': 'lian-li.com',
  'Fractal Design': 'fractal-design.com',
  'be quiet!': 'bequiet.com',
  Thermaltake: 'thermaltake.com',
  Phanteks: 'phanteks.com',
  Arctic: 'arctic.de',
  Thermalright: 'thermalright.com',
  DeepCool: 'deepcool.com',
  Scythe: 'scythe.com',
  Noctua: 'noctua.at',
  Patriot: 'patriotmemory.com',
  TeamGroup: 'teamgroupinc.com',
  'Super Flower': 'super-flower.com.tw',
  'Cooler Master': 'coolermaster.com',
  Seasonic: 'seasonic.com',
};

const products: Product[] = Object.entries(catalog).flatMap(
  ([category, items]) =>
    items.map(([name, brand, price, specs], index) => {
      const query = encodeURIComponent(`${brand} ${name}`);
      const domain = officialDomains[brand];

      return {
        id: `${category.toLowerCase()}-${index + 1}`,
        name,
        brand,
        category,
        price,
        specs,
        // Add a verified product image URL here when you have one.
        imageUrl: '',
        // These are product search links, not verified product listings.
        amazonUrl: `https://www.amazon.com/s?k=${query}`,
        officialUrl: domain
          ? `https://www.google.com/search?q=${encodeURIComponent(
              `site:${domain} ${brand} ${name}`
            )}`
          : `https://www.google.com/search?q=${query}+official`,
        // Add a real .glb or .gltf model URL here when available.
        modelUrl: '',
      };
    })
);

const money = (amount: number) => '$' + amount.toLocaleString('en-US');

function App() {
  const [page, setPage] = useState('Home');
  const [category, setCategory] = useState('GPU');
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All brands');
  const [selected, setSelected] = useState<Record<string, Product>>({});
  const [buildName, setBuildName] = useState('My dream PC');
  const [savedBuilds, setSavedBuilds] = useState<
    { name: string; parts: Record<string, Product> }[]
  >([]);
  const [caseColor, setCaseColor] = useState('#151922');
  const [rgbColor, setRgbColor] = useState('#3987ff');
  const [rgbEnabled, setRgbEnabled] = useState(true);

  const categoryProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brand === 'All brands' || product.brand === brand;
      return matchesCategory && matchesSearch && matchesBrand;
    });
  }, [category, search, brand]);

  const brands = [
    'All brands',
    ...Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.brand)
      )
    ),
  ];

  const total = Object.values(selected).reduce(
    (sum, product) => sum + product.price,
    0
  );

  const selectedCount = Object.keys(selected).length;

  function chooseProduct(product: Product) {
    setSelected((previous) => ({
      ...previous,
      [product.category]: product,
    }));
  }

  function saveBuild() {
    if (selectedCount === 0) return;
    setSavedBuilds((previous) => [
      ...previous,
      {
        name: buildName.trim() || 'My PC Build',
        parts: { ...selected },
      },
    ]);
  }

  function openBuild(build: { name: string; parts: Record<string, Product> }) {
    setBuildName(build.name);
    setSelected({ ...build.parts });
    setPage('PC Builder');
  }

  function removePart(key: string) {
    setSelected((previous) => {
      const updated = { ...previous };
      delete updated[key];
      return updated;
    });
  }

  function renderPCPreview() {
    return (
      <div
        className="pc-stage"
        style={
          {
            '--case-color': caseColor,
            '--rgb-color': rgbEnabled ? rgbColor : '#303744',
          } as React.CSSProperties
        }
      >
        <div className="pc-platform" />
        <div className="pc-case">
          <div className="pc-glass">
            <div className="pc-motherboard" />
            <div className="pc-gpu" />
            <div className="pc-ram">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="pc-fans">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="pc-front">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => setPage('Home')}>
          <span className="logo-mark">S</span>
          <span>
            SETUP<span className="blue-text">3D</span>
          </span>
        </div>

        <nav className="nav">
          {['Home', 'PC Builder', 'Desk Setup', 'My Builds'].map((item) => (
            <button
              key={item}
              className={page === item ? 'nav-link active' : 'nav-link'}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <span className="online-dot" />
          <span>Builder Studio</span>
        </div>
      </header>

      {page === 'Home' && (
        <main className="home-page">
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">YOUR SETUP. YOUR RULES.</span>
              <h1>
                Build your dream
                <br />
                <span className="blue-text">setup in 3D.</span>
              </h1>
              <p>
                Design your perfect PC and gaming space. Explore components,
                customize your setup and bring your ideas to life.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => setPage('PC Builder')}
                >
                  Start building <span>→</span>
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setPage('Desk Setup')}
                >
                  Explore desk setups
                </button>
              </div>
              <div className="hero-stats">
                <div>
                  <strong>{products.length}</strong>
                  <span>PC products</span>
                </div>
                <div>
                  <strong>8</strong>
                  <span>Categories</span>
                </div>
                <div>
                  <strong>3D</strong>
                  <span>Setup design</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-glow" />
              {renderPCPreview()}
            </div>
          </section>

          <section className="features">
            <div className="section-heading">
              <span className="eyebrow">WHAT YOU CAN DO</span>
              <h2>One place for your entire setup.</h2>
            </div>
            <div className="feature-grid">
              <div className="feature-card">
                <span className="feature-number">01</span>
                <h3>PC Builder</h3>
                <p>
                  Choose your CPU, GPU, motherboard, memory, storage and more.
                </p>
                <button onClick={() => setPage('PC Builder')}>
                  Build a PC →
                </button>
              </div>
              <div className="feature-card">
                <span className="feature-number">02</span>
                <h3>Desk Designer</h3>
                <p>Create your ideal gaming or productivity desk setup.</p>
                <button onClick={() => setPage('Desk Setup')}>
                  Design a desk →
                </button>
              </div>
              <div className="feature-card">
                <span className="feature-number">03</span>
                <h3>My Builds</h3>
                <p>
                  Keep your favorite builds together and return to them later.
                </p>
                <button onClick={() => setPage('My Builds')}>
                  View builds →
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {page === 'PC Builder' && (
        <main className="builder-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">COMPONENT CONFIGURATOR</span>
              <h1>PC Builder</h1>
              <p>Choose your components and create your dream PC.</p>
            </div>
            <div className="build-status">
              <span className="online-dot" />
              {selectedCount} of {categories.length} components selected
            </div>
          </div>

          <div className="pc-layout">
            <aside className="category-sidebar">
              <h3>COMPONENTS</h3>
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? 'category-button selected'
                      : 'category-button'
                  }
                  onClick={() => {
                    setCategory(item);
                    setSearch('');
                    setBrand('All brands');
                  }}
                >
                  <span>{item}</span>
                  <span className="category-count">
                    {selected[item]
                      ? '✓'
                      : products.filter((p) => p.category === item).length}
                  </span>
                </button>
              ))}
              <div className="sidebar-tip">
                <strong>BUILD TIP</strong>
                <p>
                  Choose your processor and graphics card first. These have the
                  biggest impact on performance.
                </p>
              </div>
            </aside>

            <section className="catalog">
              <div className="catalog-heading">
                <div>
                  <span className="eyebrow">SELECT A COMPONENT</span>
                  <h2>{category}</h2>
                  <p>{categoryProducts.length} products shown</p>
                </div>
                <div className="catalog-search">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products or brands..."
                  />
                </div>
              </div>

              <div className="brand-filters">
                {brands.map((item) => (
                  <button
                    key={item}
                    className={
                      brand === item ? 'filter-chip active' : 'filter-chip'
                    }
                    onClick={() => setBrand(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="product-grid">
                {categoryProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      <span className="product-brand">{product.brand}</span>

                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '15px',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '100%',
                            padding: '20px',
                            gap: '10px',
                          }}
                        >
                          <strong>{product.name}</strong>
                          <span style={{ opacity: 0.6, fontSize: '12px' }}>
                            Product image not added yet
                          </span>
                          <a
                            href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                              `${product.brand} ${product.name}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#70aaff', fontSize: '12px' }}
                          >
                            Find product image ↗
                          </a>
                        </div>
                      )}

                      {selected[category]?.id === product.id && (
                        <span className="selected-tag">SELECTED</span>
                      )}
                    </div>

                    <div className="product-info">
                      <span className="product-category">{product.brand}</span>
                      <h3>{product.name}</h3>
                      <p>{product.specs}</p>

                      <div className="product-bottom">
                        <strong>{money(product.price)}</strong>
                        <button
                          className={
                            selected[category]?.id === product.id
                              ? 'add-button added'
                              : 'add-button'
                          }
                          onClick={() => chooseProduct(product)}
                        >
                          {selected[category]?.id === product.id
                            ? 'Selected ✓'
                            : 'Add +'}
                        </button>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          marginTop: '12px',
                          fontSize: '12px',
                        }}
                      >
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#70aaff' }}
                        >
                          Amazon ↗
                        </a>
                        <a
                          href={product.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#70aaff' }}
                        >
                          Official store ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}

                {categoryProducts.length === 0 && (
                  <div className="empty-state">
                    <h3>No products found</h3>
                    <p>Try another search or brand.</p>
                  </div>
                )}
              </div>

              <p className="catalog-note">
                Demo catalog and estimated USD prices. Product availability and
                prices are not live retailer data.
              </p>
            </section>

            <aside className="preview-panel">
              <div className="preview-heading">
                <div>
                  <span className="eyebrow">LIVE PREVIEW</span>
                  <h2>Your PC</h2>
                </div>
                <span className="preview-badge">PREVIEW</span>
              </div>

              {renderPCPreview()}

              <div style={{ marginTop: '18px' }}>
                <h3>CASE COLOR</h3>
                <input
                  type="color"
                  value={caseColor}
                  onChange={(event) => setCaseColor(event.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    marginTop: '8px',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <h3>RGB LIGHTING</h3>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '8px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rgbEnabled}
                    onChange={(event) => setRgbEnabled(event.target.checked)}
                  />
                  Enable RGB
                </label>
                <input
                  type="color"
                  value={rgbColor}
                  disabled={!rgbEnabled}
                  onChange={(event) => setRgbColor(event.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    marginTop: '8px',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div className="preview-summary">
                <div className="summary-row">
                  <span>Selected components</span>
                  <strong>{selectedCount}/8</strong>
                </div>
                <div className="summary-row">
                  <span>Estimated total</span>
                  <strong className="summary-total">{money(total)}</strong>
                </div>
              </div>

              <div className="selected-parts">
                <h3>YOUR COMPONENTS</h3>
                {categories.map((item) => (
                  <div className="selected-part" key={item}>
                    <div>
                      <span>{item}</span>
                      <strong>{selected[item]?.name || 'Not selected'}</strong>
                    </div>
                    {selected[item] && (
                      <button onClick={() => removePart(item)}>×</button>
                    )}
                  </div>
                ))}
              </div>

              <input
                className="build-name"
                value={buildName}
                onChange={(event) => setBuildName(event.target.value)}
                placeholder="Name your build"
              />
              <button className="save-button" onClick={saveBuild}>
                Save build
              </button>
            </aside>
          </div>
        </main>
      )}

      {page === 'Desk Setup' && (
        <main className="builder-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">SPACE DESIGNER</span>
              <h1>Desk Setup</h1>
              <p>Start designing your perfect gaming and productivity space.</p>
            </div>
          </div>
          <div className="desk-layout">
            <div className="desk-stage">
              <div className="desk-wall" />
              <div className="desk-table" />
              <div className="desk-monitor">
                <div className="monitor-screen">
                  <span>
                    SETUP<span className="blue-text">3D</span>
                  </span>
                </div>
                <div className="monitor-stand" />
              </div>
              <div className="desk-keyboard" />
              <div className="desk-mouse" />
              <div className="desk-tower" />
            </div>
            <div className="desk-controls">
              <span className="eyebrow">COMING NEXT</span>
              <h2>Customize your space</h2>
              <p>
                We're building the full desk designer with selectable products
                and interactive placement.
              </p>
              <div className="desk-option">
                <span>01</span>
                <div>
                  <strong>Desks</strong>
                  <p>Different sizes, materials and colors</p>
                </div>
              </div>
              <div className="desk-option">
                <span>02</span>
                <div>
                  <strong>Monitors</strong>
                  <p>Single, dual and ultrawide displays</p>
                </div>
              </div>
              <div className="desk-option">
                <span>03</span>
                <div>
                  <strong>Accessories</strong>
                  <p>Keyboards, mice, headsets and more</p>
                </div>
              </div>
              <div className="desk-option">
                <span>04</span>
                <div>
                  <strong>Room customization</strong>
                  <p>Lighting, walls and setup colors</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === 'My Builds' && (
        <main className="builder-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">YOUR COLLECTION</span>
              <h1>My Builds</h1>
              <p>Your saved PC configurations.</p>
            </div>
            <button
              className="primary-button"
              onClick={() => setPage('PC Builder')}
            >
              + New build
            </button>
          </div>

          {savedBuilds.length === 0 ? (
            <div className="empty-builds">
              <div className="empty-icon">▧</div>
              <h2>No saved builds yet</h2>
              <p>
                Build your PC and save it here to keep it in your collection.
              </p>
              <button
                className="primary-button"
                onClick={() => setPage('PC Builder')}
              >
                Start building →
              </button>
            </div>
          ) : (
            <div className="saved-grid">
              {savedBuilds.map((build, index) => {
                const buildTotal = Object.values(build.parts).reduce(
                  (sum, product) => sum + product.price,
                  0
                );
                return (
                  <article
                    className="saved-card"
                    key={`${build.name}-${index}`}
                  >
                    <div className="saved-preview">{renderPCPreview()}</div>
                    <div className="saved-info">
                      <h3>{build.name}</h3>
                      <p>{Object.keys(build.parts).length} components</p>
                      <strong>{money(buildTotal)}</strong>
                      <button
                        className="save-button"
                        onClick={() => openBuild(build)}
                      >
                        Open build →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      )}

      <footer className="footer">
        <span>
          SETUP<span className="blue-text">3D</span>
        </span>
        <span>Design your setup. Build your vision.</span>
      </footer>
    </div>
  );
}

export default App;
