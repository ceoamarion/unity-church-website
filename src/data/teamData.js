/**
 * teamData.js — Unity Christian Church Leadership & Ministry Leaders
 * Direct asset imports ensure 100% reliable bundling & caching in Vite.
 */

import tjGroomsImg from '../assets/attachments (1)/TJ Grooms-Pastor.JPEG';
import markelLockhartImg from '../assets/attachments (1)/Markel Lockhart-Pastoral.PNG';
import briyeleGambleImg from '../assets/attachments (1)/Briyele Gamble- Backend Manager.PNG';
import sheliaNelsonImg from '../assets/attachments (1)/Shelia Nelson-Prayer Team.JPEG';
import brianBaxterImg from '../assets/attachments (1)/Brian Nelson-Pastoral Team.JPEG';
import alexiusBrunsonImg from '../assets/attachments (1)/Alexius Brunson-Special Needs.JPEG';
import tylerBrunsonImg from '../assets/attachments (1)/Tyler Brunson-Special Needs.JPEG';
import shalaDinkinsImg from '../assets/attachments (1)/Shala Dinkins-Music Minister.JPEG';
import sandraRichardsonImg from '../assets/attachments (1)/Sandra Richardson-Unity Cares Ministries Director.JPEG';
import ericBannisterImg from '../assets/attachments (1)/Eric Bannister-Parking Lot Ministry Leader.JPEG';

export const TEAM_MEMBERS = [
  {
    id: 'tj-grooms',
    name: 'Pastor TJ Grooms',
    role: 'Lead Pastor',
    department: 'Senior Leadership',
    image: tjGroomsImg,
    objectPosition: 'center 12%',
    category: 'Pastoral',
    featured: true,
    passage:
      'Leading Unity Christian Church with vision, biblical conviction, and a shepherd’s heart. Pastor TJ is dedicated to preaching the uncompromised Word of God, empowering families, and cultivating a welcoming sanctuary where all people experience Christ’s transforming love and find their purpose.',
  },
  {
    id: 'markel-lockhart',
    name: 'Markel Lockhart',
    role: 'Pastoral Ministry',
    department: 'Pastoral Team',
    image: markelLockhartImg,
    objectPosition: 'center 15%',
    category: 'Pastoral',
    featured: false,
    passage:
      'Providing spiritual care, pastoral guidance, and discipleship across our church family. Markel ministers with wisdom and compassionate support, walking alongside individuals and families through life’s pivotal moments and strengthening their spiritual foundation.',
  },
  {
    id: 'brian-baxter',
    name: 'Brian Baxter',
    role: 'Pastoral Team',
    department: 'Pastoral Care & Outreach',
    image: brianBaxterImg,
    objectPosition: 'center 12%',
    category: 'Pastoral',
    featured: false,
    passage:
      'Serving faithfully in pastoral leadership, community engagement, and spiritual mentorship. Brian is committed to building authentic relationships, providing sound biblical counsel, and strengthening faith in day-to-day life.',
  },
  {
    id: 'briyele-gamble',
    name: 'Briyele Gamble',
    role: 'Backend Manager',
    department: 'Church Operations & Administration',
    image: briyeleGambleImg,
    objectPosition: 'center 15%',
    category: 'Operations',
    featured: false,
    passage:
      'Directing backend church administration, operational logistics, and digital systems. Briyele ensures every ministry initiative, event, and service operates seamlessly with excellence and structural intentionality.',
  },
  {
    id: 'shelia-nelson',
    name: 'Shelia Nelson',
    role: 'Prayer Team Leader',
    department: 'Intercessory Prayer Ministry',
    image: sheliaNelsonImg,
    objectPosition: 'center 10%',
    category: 'Prayer & Care',
    featured: false,
    passage:
      'Interceding fervently for the church body, our community, and global outreach. Shelia leads a devoted prayer team committed to consistent prayer, spiritual covering, and personal ministry for those in need.',
  },
  {
    id: 'alexius-brunson',
    name: 'Alexius Brunson',
    role: 'Special Needs Ministry',
    department: 'Specialized Family Care',
    image: alexiusBrunsonImg,
    objectPosition: 'center 10%',
    category: 'Family & Outreach',
    featured: false,
    passage:
      'Championing inclusivity, compassion, and individualized spiritual care for individuals with special needs and their families. Alexius ensures every child of God is celebrated, supported, and welcomed with open arms.',
  },
  {
    id: 'tyler-brunson',
    name: 'Tyler Brunson',
    role: 'Music Minister Director',
    department: 'Worship & Creative Arts',
    image: tylerBrunsonImg,
    objectPosition: 'center 12%',
    category: 'Worship',
    featured: false,
    passage:
      'Directing dynamic musical arrangements and musicianship that usher the congregation into God’s presence through instrumental excellence, creativity, and anointed praise.',
  },
  {
    id: 'shala-dinkins',
    name: 'Shala Dinkins',
    role: 'Music Minister Director',
    department: 'Worship & Creative Arts',
    image: shalaDinkinsImg,
    objectPosition: 'center 14%',
    category: 'Worship',
    featured: false,
    passage:
      'Co-directing worship arts and vocal ministry with passion and grace. Shala helps cultivate a spiritually rich atmosphere where praise and authentic adoration draw people closer to Christ each week.',
  },
  {
    id: 'sandra-richardson',
    name: 'Sandra Richardson',
    role: 'Unity Cares Ministries Director',
    department: 'Community Outreach & Benevolence',
    image: sandraRichardsonImg,
    objectPosition: 'center 14%',
    category: 'Family & Outreach',
    featured: false,
    passage:
      'Leading the Unity Cares Ministry with a heart for community transformation. Sandra spearheads local outreach initiatives, resource distribution, and benevolent support to extend tangible hope and love to families in need.',
  },
  {
    id: 'eric-bannister',
    name: 'Eric Bannister',
    role: 'Parking Lot Ministry Leader',
    department: 'First Impressions & Hospitality',
    image: ericBannisterImg,
    objectPosition: 'center 12%',
    category: 'Operations',
    featured: false,
    passage:
      'Creating the very first warm, joyful, and safe experience for every guest and member entering our church campus. Eric leads our parking and arrival team with faithful hospitality and servant leadership.',
  },
];

export const TEAM_CATEGORIES = ['All', 'Pastoral', 'Worship', 'Prayer & Care', 'Family & Outreach', 'Operations'];
