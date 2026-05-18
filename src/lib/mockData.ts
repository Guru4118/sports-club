import type { Tournament, Match, Player, GalleryImage, Announcement } from '@/types'

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    _id: '1',
    slug: 'jof-kabaddi-cup-2025',
    name: 'JOF Kabaddi Cup',
    edition: '5th Edition',
    startDate: '2025-06-15',
    endDate: '2025-06-17',
    venue: 'Maniyambet Municipal Ground',
    location: 'Maniyambet, Dharmapuri',
    posterUrl: '',
    totalPrize: '₹75,000',
    prizePool: [
      { rank: 1, label: 'Champion',     amount: '₹25,000', trophy: '🏆' },
      { rank: 2, label: 'Runner-Up',    amount: '₹15,000', trophy: '🥈' },
      { rank: 3, label: 'Third Place',  amount: '₹10,000', trophy: '🥉' },
      { rank: 4, label: 'Fair Play',    amount: '₹5,000',  trophy: '🏅' },
    ],
    rules: [
      'Each team must have 12 players (7 on field + 5 substitutes)',
      'Players must carry valid ID proof',
      'Match duration: 20 minutes each half with 5-minute break',
      'Report 30 minutes before match time',
      'Any dispute will be resolved by the organizing committee',
      'Decision of referee is final',
    ],
    registrationOpen: true,
    maxTeams: 32,
    registeredTeams: 18,
    status: 'upcoming',
    description: 'The biggest Kabaddi tournament in Maniyambet. 32 teams. 3 days of pure energy.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    _id: '2',
    slug: 'pongal-challenge-2025',
    name: 'Pongal Kabaddi Challenge',
    edition: '3rd Edition',
    startDate: '2025-01-14',
    endDate: '2025-01-15',
    venue: 'Maniyambet School Ground',
    location: 'Maniyambet',
    totalPrize: '₹40,000',
    prizePool: [
      { rank: 1, label: 'Champion',   amount: '₹20,000', trophy: '🏆' },
      { rank: 2, label: 'Runner-Up',  amount: '₹10,000', trophy: '🥈' },
      { rank: 3, label: 'Third Place',amount: '₹5,000',  trophy: '🥉' },
    ],
    rules: ['Teams of 12 players', 'Open to all districts', 'Standard kabaddi rules apply'],
    registrationOpen: false,
    maxTeams: 16,
    registeredTeams: 16,
    status: 'completed',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-01',
  },
]

export const MOCK_PLAYERS: Player[] = [
  { _id: '1', name: 'Arjun Kumar',    jerseyNumber: 7,  role: 'Raider',       active: true, hometown: 'Maniyambet', joinedYear: 2020, achievements: ['Best Raider 2024', 'Most Points 2023'], bio: 'Lightning-fast raider known for his signature cross ankle hold.' },
  { _id: '2', name: 'Selvam R',       jerseyNumber: 3,  role: 'Defender',     active: true, hometown: 'Dharmapuri', joinedYear: 2019, achievements: ['Best Defender 2024', 'Iron Wall Award'], bio: 'Immovable corner post. 3 years undefeated in home matches.' },
  { _id: '3', name: 'Murugan S',      jerseyNumber: 11, role: 'All-Rounder',  active: true, hometown: 'Maniyambet', joinedYear: 2021, achievements: ['Best All-Rounder 2023', 'MVP 2022'], bio: 'The captain. Reads the game better than anyone on the mat.' },
  { _id: '4', name: 'Dinesh P',       jerseyNumber: 9,  role: 'Raider',       active: true, hometown: 'Hosur',      joinedYear: 2022, achievements: ['Rising Star 2023'], bio: 'Young gun with explosive speed. Future of JOF.' },
  { _id: '5', name: 'Karthik B',      jerseyNumber: 4,  role: 'Defender',     active: true, hometown: 'Krishnagiri', joinedYear: 2020, achievements: ['Strongest Grip Award 2024'], bio: 'Tackle specialist. No raider has escaped his grip twice.' },
  { _id: '6', name: 'Vijay Kumar',    jerseyNumber: 12, role: 'All-Rounder',  active: true, hometown: 'Maniyambet', joinedYear: 2018, achievements: ['Club Legend', 'Most Matches Played'], bio: 'Foundation member of JOF. The soul of the team.' },
  { _id: '7', name: 'Rajan M',        jerseyNumber: 6,  role: 'Defender',     active: true, hometown: 'Pennagaram', joinedYear: 2021, achievements: ['Best Rookie 2021'], bio: 'Cover defender with exceptional positioning.' },
  { _id: '8', name: 'Suresh T',       jerseyNumber: 15, role: 'Raider',       active: true, hometown: 'Maniyambet', joinedYear: 2023, achievements: ['Fastest Raid Record 2024'], bio: 'Speedster who completes raids in under 10 seconds.' },
]

export const MOCK_MATCHES: Match[] = [
  { _id: '1', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Jeeva Oli Friends', teamB: 'Hosur Hawks',       round: 'Quarter Final', matchDate: '2025-06-15', matchTime: '10:00 AM', status: 'scheduled', venue: 'Ground A' },
  { _id: '2', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Dharmapuri Lions',  teamB: 'Krishnagiri Kings', round: 'Quarter Final', matchDate: '2025-06-15', matchTime: '12:00 PM', status: 'scheduled', venue: 'Ground A' },
  { _id: '3', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Salem Strikers',    teamB: 'Erode Eagles',      round: 'Quarter Final', matchDate: '2025-06-15', matchTime: '02:00 PM', status: 'scheduled', venue: 'Ground B' },
  { _id: '4', tournamentId: '2', tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Jeeva Oli Friends', teamB: 'Hosur Hawks',       scoreA: 42, scoreB: 31, winner: 'Jeeva Oli Friends', round: 'Final',         matchDate: '2025-01-15', matchTime: '04:00 PM', status: 'completed' },
  { _id: '5', tournamentId: '2', tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Jeeva Oli Friends', teamB: 'Salem Strikers',    scoreA: 38, scoreB: 27, winner: 'Jeeva Oli Friends', round: 'Semi Final',     matchDate: '2025-01-14', matchTime: '02:00 PM', status: 'completed' },
  { _id: '6', tournamentId: '2', tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Dharmapuri Lions',  teamB: 'Hosur Hawks',       scoreA: 29, scoreB: 35, winner: 'Hosur Hawks',       round: 'Semi Final',     matchDate: '2025-01-14', matchTime: '04:00 PM', status: 'completed' },
]

export const MOCK_GALLERY: GalleryImage[] = [
  { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', category: 'match',       caption: 'Quarter Final — intense raid action',             uploadedAt: '2025-01-15' },
  { _id: '2', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', category: 'celebration', caption: 'Champions celebration — Pongal Cup 2025',         uploadedAt: '2025-01-15' },
  { _id: '3', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', category: 'training',    caption: 'Morning training session',                        uploadedAt: '2025-01-10' },
  { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400', category: 'community',   caption: 'Community sports day — Maniyambet',               uploadedAt: '2025-01-08' },
  { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400', category: 'match',       caption: 'Final match — nail-biting finish',                uploadedAt: '2025-01-15' },
  { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', thumbnailUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', category: 'celebration', caption: 'Trophy ceremony with the whole team',             uploadedAt: '2025-01-15' },
]

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { _id: '1', text: '🏆 JOF Kabaddi Cup 5th Edition — Registrations OPEN! June 15-17, 2025 at Maniyambet Municipal Ground', link: '/tournament/jof-kabaddi-cup-2025', active: true, createdAt: '2025-01-01' },
  { _id: '2', text: '🎉 Congratulations! Jeeva Oli Friends won the Pongal Kabaddi Challenge 2025!', active: true, createdAt: '2025-01-15' },
  { _id: '3', text: '📋 Team registration deadline: June 1, 2025. Register your team now!', link: '/register', active: true, createdAt: '2025-01-01' },
]

export const CLUB_STATS = [
  { label: 'Years Active',      value: '8+',  suffix: '' },
  { label: 'Tournaments Won',   value: '12',  suffix: '' },
  { label: 'Players Trained',   value: '150+', suffix: '' },
  { label: 'Community Members', value: '500+', suffix: '' },
]

export const ACHIEVEMENTS = [
  { year: '2024', title: 'District Champions', event: 'Dharmapuri District Kabaddi League' },
  { year: '2024', title: 'Best Club Award',    event: 'Tamil Nadu Amateur Sports Federation' },
  { year: '2023', title: 'Zone Champions',     event: 'North Tamil Nadu Open Kabaddi' },
  { year: '2023', title: 'Runner-Up',          event: 'Salem Open Kabaddi Championship' },
  { year: '2022', title: 'District Champions', event: 'Dharmapuri District Kabaddi League' },
  { year: '2021', title: 'Founders Cup',       event: 'JOF Inaugural Tournament' },
]
