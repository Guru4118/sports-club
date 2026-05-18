// ─── Core Types ───────────────────────────────────────────────

export type TournamentStatus = 'upcoming' | 'ongoing' | 'completed'
export type MatchStatus      = 'scheduled' | 'live' | 'completed'
export type PlayerRole       = 'Raider' | 'Defender' | 'All-Rounder'
export type RegistrationStatus = 'pending' | 'approved' | 'rejected'
export type SponsorshipStatus  = 'new' | 'contacted' | 'confirmed'
export type GalleryCategory    = 'match' | 'celebration' | 'community' | 'training'

export interface PrizeTier {
  rank: number
  label: string   // e.g. "Champion", "Runner-Up", "Third Place"
  amount: string  // e.g. "₹25,000"
  trophy?: string // emoji or icon name
}

export interface Tournament {
  _id: string
  slug: string
  name: string
  edition: string
  startDate: string
  endDate: string
  venue: string
  location: string
  posterUrl?: string
  prizePool: PrizeTier[]
  totalPrize?: string
  rules: string[]
  registrationOpen: boolean
  maxTeams: number
  registeredTeams: number
  status: TournamentStatus
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Match {
  _id: string
  tournamentId: string
  tournamentName?: string
  teamA: string
  teamB: string
  scoreA?: number
  scoreB?: number
  winner?: string
  matchDate: string
  matchTime?: string
  round: string   // e.g. "Quarter Final", "Semi Final", "Final"
  venue?: string
  status: MatchStatus
  notes?: string
}

export interface Player {
  _id: string
  name: string
  nameTamil?: string
  jerseyNumber: number
  role: PlayerRole
  photoUrl?: string
  achievements: string[]
  bio?: string
  active: boolean
  hometown?: string
  joinedYear?: number
}

export interface Registration {
  _id: string
  tournamentId: string
  tournamentName?: string
  teamName: string
  captainName: string
  contactPhone: string
  contactEmail: string
  playerCount: number
  location: string
  district?: string
  experience?: string
  message?: string
  status: RegistrationStatus
  submittedAt: string
}

export interface Sponsorship {
  _id: string
  businessName: string
  contactName: string
  phone: string
  email: string
  website?: string
  message: string
  tier?: 'title' | 'gold' | 'silver' | 'general'
  status: SponsorshipStatus
  submittedAt: string
}

export interface GalleryImage {
  _id: string
  tournamentId?: string
  imageUrl: string
  thumbnailUrl?: string
  caption?: string
  category: GalleryCategory
  width?: number
  height?: number
  uploadedAt: string
}

export interface Announcement {
  _id: string
  text: string
  link?: string
  active: boolean
  createdAt: string
}

// ─── Form Payloads ────────────────────────────────────────────

export interface RegistrationFormData {
  teamName: string
  captainName: string
  contactPhone: string
  contactEmail: string
  playerCount: number
  location: string
  district?: string
  experience?: string
  message?: string
  tournamentId: string
}

export interface SponsorFormData {
  businessName: string
  contactName: string
  phone: string
  email: string
  website?: string
  message: string
}

// ─── API Response Wrappers ────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
}
