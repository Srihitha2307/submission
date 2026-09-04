import { Breed } from '../types';

export const BREEDS_DATA: Breed[] = [
  {
    id: 'gir',
    name: 'Gir',
    hindiName: 'गीर',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'Saurashtra (Gir Hills & forests), Gujarat',
    nativeTract: 'Junagadh, Bhavnagar, Rajkot, Amreli (Gujarat) & adjoining Central/Western India',
    milkYield: '1,800 – 3,200 kg per lactation (8 – 14 L/day)',
    milkFat: '4.5 – 5.2% (Rich A2 beta-casein)',
    temperament: 'Calm, docile and very human-friendly',
    climateSuitability: 'Hot, semi-arid and tropical climates',
    heatTolerance: 'Very High',
    characteristics: [
      'Convex dome-shaped forehead (acts as a cooling radiator)',
      'Long, pendulous ears resembling a curled leaf',
      'Curved horns turning downward and backwards (half-moon curve)',
      'Prominent well-developed hump over the shoulders',
      'Loose skin with deep dewlap and sheath'
    ],
    whyMatters: 'Gir is India’s flagship indigenous dairy breed, globally celebrated for high heat tolerance, disease resistance, tick resistance, and nutritious A2 milk.',
    bestSuitedFor: 'Farmers and dairy enterprises seeking resilient milk yield in warm climates with lower veterinary costs.',
    careConsiderations: [
      'Provide well-ventilated dry sheds during monsoon humid spells',
      'Needs balanced calcium-phosphorus ratio to sustain peak yield',
      'Grooms well with daily hand brushing; sensitive to gentle handling'
    ],
    regionalDistribution: ['Gujarat', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan'],
    quickFacts: [
      { label: 'Category', value: 'Zebu Dairy Cattle' },
      { label: 'Avg Adult Weight', value: 'Cow: 385–410 kg | Bull: 540–600 kg' },
      { label: 'Age at 1st Calving', value: '38–42 months' },
      { label: 'Inter-calving Period', value: '14–16 months' }
    ],
    tagColor: '#166534',
    imageAccent: '#E0F2FE'
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    hindiName: 'साहीवाल',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'Montgomery region (historic Punjab / Indo-Gangetic plains)',
    nativeTract: 'Punjab, Haryana, Rajasthan, Western Uttar Pradesh',
    milkYield: '2,000 – 3,500 kg per lactation (10 – 16 L/day)',
    milkFat: '4.8 – 5.5%',
    temperament: 'Lethargic, calm and highly manageable',
    climateSuitability: 'Sub-tropical, hot arid and semi-arid plains',
    heatTolerance: 'Very High',
    characteristics: [
      'Heavy body with loose, voluptuous skin (often called "Lola")',
      'Reddish dun to pale red coat color, sometimes with white patches',
      'Medium horns curving outward and slightly forward',
      'Massive hump in males and moderate distinct hump in females',
      'Large voluminous udder with symmetrical cylindrical teats'
    ],
    whyMatters: 'Considered the heaviest milker among all Indian zebu breeds with rich butterfat and robust tick and tick-borne fever immunity.',
    bestSuitedFor: 'Commercial dairy farms and progressive smallholders aiming for high commercial milk returns without foreign breed fragility.',
    careConsiderations: [
      'Requires clean dry bedding to prevent mastitis in large udders',
      'Benefits greatly from legume silage and protein-rich concentrate during peak lactation'
    ],
    regionalDistribution: ['Punjab', 'Haryana', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh'],
    quickFacts: [
      { label: 'Category', value: 'Heavy Dairy Zebu' },
      { label: 'Avg Adult Weight', value: 'Cow: 400–450 kg | Bull: 550–650 kg' },
      { label: 'Age at 1st Calving', value: '36–40 months' },
      { label: 'Inter-calving Period', value: '13–15 months' }
    ],
    tagColor: '#B45309',
    imageAccent: '#FEF3C7'
  },
  {
    id: 'murrah',
    name: 'Murrah',
    hindiName: 'मुर्रा',
    species: 'Buffalo',
    purpose: 'Dairy',
    origin: 'Haryana (Rohtak, Hisar, Jind) & Delhi/Punjab',
    nativeTract: 'Haryana, Punjab and distributed across all major Indian states',
    milkYield: '2,200 – 4,000 kg per lactation (12 – 20 L/day)',
    milkFat: '7.0 – 8.5% (High butterfat for ghee and paneer)',
    temperament: 'Placid, intelligent, bonds closely with caretaker',
    climateSuitability: 'Tropical and humid plains; needs water access or wallowing facility',
    heatTolerance: 'Moderate',
    characteristics: [
      'Jet black coat with small white switch on tail tip',
      'Tightly curled spiral horns ("Murrah" refers to curl)',
      'Short, fine neck and wedge-shaped dairy conformation',
      'Well-developed bowl-shaped udder with prominent milk veins'
    ],
    whyMatters: 'The undisputed "Black Gold" of Indian dairying, producing the nation’s highest fat milk used for premium ghee, butter, and sweets.',
    bestSuitedFor: 'Dairy farmers supplying private dairies, milk cooperatives, or value-added dairy product makers.',
    careConsiderations: [
      'Mandatory summer cooling: provide misting, wallowing pond, or water hosing twice daily',
      'High green fodder and clean water requirement (at least 80–100 L/day)'
    ],
    regionalDistribution: ['Haryana', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'All India'],
    quickFacts: [
      { label: 'Category', value: 'Riverine Dairy Buffalo' },
      { label: 'Avg Adult Weight', value: 'Female: 450–550 kg | Male: 600–800 kg' },
      { label: 'Age at 1st Calving', value: '40–44 months' },
      { label: 'Fat Yield', value: '7.5% average' }
    ],
    tagColor: '#1F2937',
    imageAccent: '#F3F4F6'
  },
  {
    id: 'red_sindhi',
    name: 'Red Sindhi',
    hindiName: 'लाल सिंधी',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'Historic Sindh / Western border regions',
    nativeTract: 'National breeding farms across MP, Tamil Nadu, Odisha, Kerala, Assam',
    milkYield: '1,800 – 2,800 kg per lactation (8 – 12 L/day)',
    milkFat: '4.5 – 5.0%',
    temperament: 'Docile and intelligent',
    climateSuitability: 'Extremely tolerant of extreme heat and tropical humidity',
    heatTolerance: 'Very High',
    characteristics: [
      'Deep red or mahogany coat color with darker extremities in males',
      'Compact, symmetrical body with fine dairy conformation',
      'Thick, short horns emerging outwards and curving upwards',
      'Distinctive hump and well-placed pendulous dewlap'
    ],
    whyMatters: 'Renowned for exceptional adaptability to diverse harsh climates ranging from hilly northeast to humid southern coasts.',
    bestSuitedFor: 'Mixed crop-livestock farmers in tropical and humid zones needing hardy dairy cows.',
    careConsiderations: [
      'Resistant to foot and mouth complications, but regular deworming is recommended',
      'Performs well even on coarse dry fodders combined with seasonal grazing'
    ],
    regionalDistribution: ['Madhya Pradesh', 'Kerala', 'Tamil Nadu', 'Odisha', 'Assam'],
    quickFacts: [
      { label: 'Category', value: 'Compact Indigenous Dairy' },
      { label: 'Avg Adult Weight', value: 'Cow: 320–350 kg | Bull: 450–500 kg' },
      { label: 'Age at 1st Calving', value: '39–42 months' },
      { label: 'Disease Resistance', value: 'Superior tick resistance' }
    ],
    tagColor: '#991B1B',
    imageAccent: '#FEE2E2'
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar',
    hindiName: 'थारपारकर',
    species: 'Cattle',
    purpose: 'Dual-purpose',
    origin: 'Thar desert region (Rajasthan & bordering Sindh)',
    nativeTract: 'Jodhpur, Jaisalmer, Barmer (Rajasthan) & Kutch (Gujarat)',
    milkYield: '1,700 – 2,500 kg per lactation (7 – 11 L/day)',
    milkFat: '4.4 – 4.9%',
    temperament: 'Alert yet quiet',
    climateSuitability: 'Severe desert heat, drought and arid conditions',
    heatTolerance: 'Very High',
    characteristics: [
      'White or light grey coat reflecting maximum solar radiation',
      'Convex face with medium forehead and flat poll',
      'Medium horns curving upward and inward',
      'Compact muscular frame capable of enduring long grazing treks in desert sand'
    ],
    whyMatters: 'Survives and produces milk on scrub vegetation in 48°C+ summer heat where exotic breeds would perish.',
    bestSuitedFor: 'Arid zone farmers, dryland pastoralists, and low-input eco-farming.',
    careConsiderations: [
      'Minimal shelter required; prefers open corral with night shade',
      'Thrives on desert grasses (Dhaman, Sewan) and khejri tree loppings'
    ],
    regionalDistribution: ['Rajasthan', 'Gujarat', 'Haryana', 'Madhya Pradesh'],
    quickFacts: [
      { label: 'Category', value: 'Desert Dual-purpose Zebu' },
      { label: 'Avg Adult Weight', value: 'Cow: 380–400 kg | Bull: 500–550 kg' },
      { label: 'Special Trait', value: 'Reflective coat & drought stamina' }
    ],
    tagColor: '#4B5563',
    imageAccent: '#E5E7EB'
  },
  {
    id: 'kankrej',
    name: 'Kankrej',
    hindiName: 'कांकरेज',
    species: 'Cattle',
    purpose: 'Dual-purpose',
    origin: 'Rann of Kutch & Banaskantha, North Gujarat',
    nativeTract: 'North Gujarat, Barmer/Jalore (Rajasthan)',
    milkYield: '1,500 – 2,800 kg per lactation (7 – 12 L/day)',
    milkFat: '4.6 – 5.0%',
    temperament: 'Active, proud carriage, known for "Sawai Chaal" (graceful gait)',
    climateSuitability: 'Arid, semi-arid, marshy saline border areas',
    heatTolerance: 'Very High',
    characteristics: [
      'Majestic lyre-shaped horns curving outward, upward and inward',
      'Silver-grey to iron-grey coat with darker shoulders and quarters in bulls',
      'Large, pendulous ears with open lobes',
      'Powerful hump and strong, clean legs for heavy draught'
    ],
    whyMatters: 'One of the heaviest and most powerful Indian breeds; excellent milk producer while bullocks possess unmatched ploughing strength.',
    bestSuitedFor: 'Farms requiring strong draught bullocks for field work combined with profitable milk production.',
    careConsiderations: [
      'Needs spacious paddocks; horns require ample clearance in stalls',
      'High roughage intake capacity'
    ],
    regionalDistribution: ['Gujarat', 'Rajasthan', 'Madhya Pradesh'],
    quickFacts: [
      { label: 'Category', value: 'Heavy Dual-purpose Zebu' },
      { label: 'Distinct Horns', value: 'Lyrate / Lyre-shaped' },
      { label: 'Bullock Strength', value: 'Exceptional road & field draught' }
    ],
    tagColor: '#047857',
    imageAccent: '#D1FAE5'
  },
  {
    id: 'rathi',
    name: 'Rathi',
    hindiName: 'राठी',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'Arid tracts of Northwest Rajasthan (Bikaner, Ganganagar)',
    nativeTract: 'Bikaner, Sri Ganganagar, Hanumangarh (Rajasthan)',
    milkYield: '1,600 – 2,600 kg per lactation (8 – 12 L/day)',
    milkFat: '4.5 – 4.9%',
    temperament: 'Very gentle and manageable',
    climateSuitability: 'Extreme temperature swings (-2°C winter to 49°C summer)',
    heatTolerance: 'Very High',
    characteristics: [
      'Brown coat with white irregular patches or black and white patchwork',
      'Medium sized horns curving outward and curving inwards',
      'Broad forehead slightly dished between the eyes',
      'Medium compact build with good udder attachment'
    ],
    whyMatters: 'Extremely cost-effective milk producer for marginal farmers in harsh climatic fluctuations with low feed costs.',
    bestSuitedFor: 'Smallholders in arid and semi-arid agro-ecological zones.',
    careConsiderations: [
      'Ensure adequate mineral block licking stations in desert water zones'
    ],
    regionalDistribution: ['Rajasthan', 'Punjab', 'Haryana', 'Madhya Pradesh'],
    quickFacts: [
      { label: 'Category', value: 'Indigenous Dairy' },
      { label: 'Avg Adult Weight', value: 'Cow: 300–350 kg | Bull: 400–450 kg' },
      { label: 'Feed Conversion', value: 'High efficiency on dry fodder' }
    ],
    tagColor: '#9A3412',
    imageAccent: '#FFEDD5'
  },
  {
    id: 'ongole',
    name: 'Ongole',
    hindiName: 'ओंगोल',
    species: 'Cattle',
    purpose: 'Dual-purpose',
    origin: 'Prakasam and Guntur districts, Andhra Pradesh',
    nativeTract: 'Coastal Andhra Pradesh',
    milkYield: '1,200 – 2,000 kg per lactation (6 – 9 L/day)',
    milkFat: '4.2 – 4.8%',
    temperament: 'Dignified, muscular, docile with handler',
    climateSuitability: 'Hot coastal, tropical and sub-humid plains',
    heatTolerance: 'Very High',
    characteristics: [
      'Muscular, regal build with white or light grey glossy coat',
      'Large hump standing upright on withers',
      'Short stumpy horns curving slightly inward',
      'Deep, spacious chest and heavy well-formed limbs'
    ],
    whyMatters: 'World-famous breed exported to Brazil, USA, and Australia (foundational ancestor of the global Brahman breed).',
    bestSuitedFor: 'Heavy agricultural transport, field ploughing, and hardy household milk supply.',
    careConsiderations: [
      'Strong muscular needs benefit from grain supplements when under draught work'
    ],
    regionalDistribution: ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka'],
    quickFacts: [
      { label: 'Category', value: 'Heavy Dual-purpose Zebu' },
      { label: 'Global Legacy', value: 'Foundation of Brazilian Nelore cattle' },
      { label: 'Eye Ring', value: 'Distinctive dark eye surround' }
    ],
    tagColor: '#374151',
    imageAccent: '#E5E7EB'
  },
  {
    id: 'vechur',
    name: 'Vechur',
    hindiName: 'वेचूर',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'Vechur village, Kottayam district, Kerala',
    nativeTract: 'Kottayam, Alappuzha, Ernakulam (Kerala)',
    milkYield: '600 – 1,000 kg per lactation (3 – 4 L/day)',
    milkFat: '4.8 – 6.0% (Small fat globule size, exceptionally easy to digest)',
    temperament: 'Extremely gentle, pet-like',
    climateSuitability: 'Warm, highly humid tropical coastal climates',
    heatTolerance: 'High',
    characteristics: [
      'World’s smallest cattle breed (Guinness Record holder, height ~90 cm)',
      'Light red, fawn, black or white coat',
      'Small thin horns pointing forward and downward or backward',
      'Tiny compact body requiring 1/3 the feed of normal cows'
    ],
    whyMatters: 'Ideal homestead cow for small backyards; milk has tiny fat globules prized in Ayurveda for infant and convalescent nutrition.',
    bestSuitedFor: 'Small homesteads, kitchen gardens, urban dairy enthusiasts, and organic family nutrition.',
    careConsiderations: [
      'Minimal housing required; vulnerable to predation by stray dogs if left untethered'
    ],
    regionalDistribution: ['Kerala', 'South India'],
    quickFacts: [
      { label: 'Height', value: '85–90 cm at withers' },
      { label: 'Weight', value: 'Cow: 130–150 kg' },
      { label: 'Medicinal Milk', value: 'Prized in traditional medicine' }
    ],
    tagColor: '#059669',
    imageAccent: '#D1FAE5'
  },
  {
    id: 'crossbred',
    name: 'Crossbred (HF / Jersey Cross)',
    hindiName: 'संकर गाय (Crossbred)',
    species: 'Cattle',
    purpose: 'Dairy',
    origin: 'National Crossbreeding Programmes across India',
    nativeTract: 'Distributed across peri-urban and dairy belts across all Indian states',
    milkYield: '3,000 – 5,500 kg per lactation (15 – 25 L/day)',
    milkFat: '3.6 – 4.2%',
    temperament: 'Placid, high feeding drive',
    climateSuitability: 'Moderate; vulnerable to summer heat stress above 35°C without shade/fans',
    heatTolerance: 'Moderate',
    characteristics: [
      'Varied coat color (black & white patches from HF or fawn/brown from Jersey)',
      'Reduced or absent hump compared to pure zebu',
      'Large pendulous udder with visible milk veins',
      'Refined angular European dairy profile with Indian leg sturdiness'
    ],
    whyMatters: 'Drives India’s White Revolution by combining European high milk volume with local adaptability when kept around 50–62.5% exotic inheritance.',
    bestSuitedFor: 'Commercial milk producers with access to adequate green fodder, clean water, and covered sheds with cooling fans.',
    careConsiderations: [
      'Essential summer protection: fans, sprinklers, and plenty of cool drinking water',
      'Rigorous vaccination against Foot & Mouth Disease (FMD) and Theileriosis'
    ],
    regionalDistribution: ['All India (Punjab, Maharashtra, Karnataka, Tamil Nadu, MP, UP)'],
    quickFacts: [
      { label: 'Category', value: 'Commercial Crossbred' },
      { label: 'Target Exotic Level', value: '50% to 62.5% recommended' },
      { label: 'Production Capacity', value: 'Highest volume per lactation' }
    ],
    tagColor: '#0284C7',
    imageAccent: '#E0F2FE'
  }
];
