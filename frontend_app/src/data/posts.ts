import { CommunityPost } from '../types';

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    communityId: 'gir-farmers',
    authorName: 'Rameshwar Patel',
    authorRole: 'Progressive Dairy Farmer (14 Cows)',
    authorLocation: 'Sehore, MP',
    authorAvatarInitials: 'RP',
    timestamp: '2 hours ago',
    category: 'Feed Tips',
    content: 'Has anyone tried adding fresh azolla to the daily green fodder ration for Gir cows? I started with 1 kg daily per cow mixed with wheat bran, and observed a noticeable improvement in coat shine and milk fat within 12 days.',
    likes: 34,
    commentsCount: 12,
    tags: ['#Azolla', '#MilkFat', '#OrganicFeed']
  },
  {
    id: 'post-2',
    communityId: 'gir-farmers',
    authorName: 'Dr. Anita Joshi',
    authorRole: 'Livestock Field Officer',
    authorLocation: 'Ujjain, MP',
    authorAvatarInitials: 'AJ',
    timestamp: 'Yesterday at 4:30 PM',
    category: 'Care',
    content: 'Field Advisory: How do you manage summer heat stress during May? For Gir cattle, ensure shade netting blocks radiant afternoon heat and provide loose salt blocks. If panting is observed, hose legs with water—do not drench the head in sudden cold water.',
    likes: 58,
    commentsCount: 23,
    tags: ['#HeatStress', '#SummerCare', '#Advisory']
  },
  {
    id: 'post-3',
    communityId: 'gir-farmers',
    authorName: 'Vikram Singh Jadon',
    authorRole: 'Breeder',
    authorLocation: 'Indore, MP',
    authorAvatarInitials: 'VJ',
    timestamp: '3 days ago',
    category: 'Discussions',
    content: 'Sharing my fodder rotation schedule for central dry zone: Staggered planting of Multicut Hybrid Napier along farm bunds, supplemented by Sorghum in May and Lucerne in November. Keeps green feed available 365 days.',
    likes: 42,
    commentsCount: 8,
    tags: ['#FodderRotation', '#NapierGrass', '#DairyManagement']
  },
  {
    id: 'post-4',
    communityId: 'gir-farmers',
    authorName: 'Mahendra Bhati',
    authorRole: 'Dairy Cooperative Member',
    authorLocation: 'Hoshangabad, MP',
    authorAvatarInitials: 'MB',
    timestamp: '4 days ago',
    category: 'Market',
    content: 'Local chilling centre updated A2 Gir milk procurement rate to ₹62/Litre for 4.8% fat and 8.5% SNF. Cooperative bonus declared for verified purebred indigenous herds.',
    likes: 29,
    commentsCount: 15,
    tags: ['#MilkRates', '#A2Milk', '#Cooperative']
  },
  {
    id: 'post-5',
    communityId: 'sahiwal-farmers',
    authorName: 'Gurpreet Singh Mann',
    authorRole: 'Dairy Manager',
    authorLocation: 'Karnal, Haryana',
    authorAvatarInitials: 'GS',
    timestamp: '1 day ago',
    category: 'Questions',
    content: 'What is the ideal age you are seeing for first calving in modern Sahiwal heifers? With balanced calf starter and mineral mixture, our heifers are conceiving at 24 months, calving at 33 months smoothly.',
    likes: 45,
    commentsCount: 19,
    tags: ['#HeiferRearing', '#SahiwalBreeding']
  },
  {
    id: 'post-6',
    communityId: 'murrah-owners',
    authorName: 'Devendra Yadav',
    authorRole: 'Commercial Buffalo Dairy',
    authorLocation: 'Bhopal, MP',
    authorAvatarInitials: 'DY',
    timestamp: '5 hours ago',
    category: 'Care',
    content: 'Reminder for Murrah owners: Black skins absorb solar radiation heavily. If you do not have a natural pond, install two mist sprinkler lines in the shed. Our milk drop during peak afternoon heat was cut by 60%.',
    likes: 72,
    commentsCount: 31,
    tags: ['#MurrahCare', '#Sprinklers', '#Wallowing']
  }
];
