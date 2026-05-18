#!/usr/bin/env node
/**
 * Jeeva Oli Friends — Database Seed Script
 * Usage: node scripts/seed.js
 *
 * Creates:
 *  - 1 admin user (username: admin, password: jof@admin2025)
 *  - 2 tournaments
 *  - 8 players
 *  - 6 matches
 */

const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gprasath103_db_user:syU1L1kbxgWDH5W6@cluster0.q1m16v0.mongodb.net/?appName=Cluster0'

// ─── Schemas (inline for seed script) ────────────────────────
const AdminSchema = new mongoose.Schema({
  username: String, password: String, email: String, role: String, lastLogin: Date,
}, { timestamps: true })

const TournamentSchema = new mongoose.Schema({
  slug: String, name: String, edition: String,
  startDate: Date, endDate: Date, venue: String, location: String,
  posterUrl: String, prizePool: Array, totalPrize: String,
  rules: Array, registrationOpen: Boolean,
  maxTeams: Number, registeredTeams: Number, status: String, description: String,
}, { timestamps: true })

const PlayerSchema = new mongoose.Schema({
  name: String, nameTamil: String, jerseyNumber: Number, role: String,
  photoUrl: String, achievements: Array, bio: String, active: Boolean,
  hometown: String, joinedYear: Number,
}, { timestamps: true })

const MatchSchema = new mongoose.Schema({
  tournamentId: mongoose.Types.ObjectId, tournamentName: String,
  teamA: String, teamB: String, scoreA: Number, scoreB: Number,
  winner: String, matchDate: Date, matchTime: String, round: String,
  venue: String, status: String,
}, { timestamps: true })

const Admin       = mongoose.models.Admin       || mongoose.model('Admin',       AdminSchema)
const Tournament  = mongoose.models.Tournament  || mongoose.model('Tournament',  TournamentSchema)
const Player      = mongoose.models.Player      || mongoose.model('Player',      PlayerSchema)
const Match       = mongoose.models.Match       || mongoose.model('Match',       MatchSchema)

async function seed() {
  console.log('🌱 Connecting to MongoDB…')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected\n')

  // Clear existing
  await Promise.all([
    Admin.deleteMany({}),
    Tournament.deleteMany({}),
    Player.deleteMany({}),
    Match.deleteMany({}),
  ])
  console.log('🗑  Cleared existing data\n')

  // ─── Admin ───────────────────────────────────────────────
  const hashed = await bcrypt.hash('jof@admin2025', 10)
  await Admin.create({
    username: 'admin',
    password: hashed,
    email: 'jeevaoli.friends@gmail.com',
    role: 'superadmin',
  })
  console.log('👤 Admin created: admin / jof@admin2025')

  // ─── Tournaments ─────────────────────────────────────────
  const [t1, t2] = await Tournament.insertMany([
    {
      slug: 'jof-kabaddi-cup-2025',
      name: 'JOF Kabaddi Cup',
      edition: '5th Edition',
      startDate: new Date('2025-06-15'),
      endDate:   new Date('2025-06-17'),
      venue: 'Maniyambet Municipal Ground',
      location: 'Maniyambet, Dharmapuri',
      totalPrize: '₹75,000',
      prizePool: [
        { rank: 1, label: 'Champion',    amount: '₹25,000', trophy: '🏆' },
        { rank: 2, label: 'Runner-Up',   amount: '₹15,000', trophy: '🥈' },
        { rank: 3, label: 'Third Place', amount: '₹10,000', trophy: '🥉' },
        { rank: 4, label: 'Fair Play',   amount: '₹5,000',  trophy: '🏅' },
      ],
      rules: [
        'Each team must have 12 players (7 on field + 5 substitutes)',
        'Players must carry valid ID proof',
        'Match duration: 20 minutes each half with 5-minute break',
        'Report 30 minutes before match time',
        'Any dispute resolved by organizing committee',
        'Decision of referee is final',
      ],
      registrationOpen: true,
      maxTeams: 32,
      registeredTeams: 18,
      status: 'upcoming',
      description: 'The biggest Kabaddi tournament in Maniyambet. 32 teams. 3 days of pure energy.',
    },
    {
      slug: 'pongal-challenge-2025',
      name: 'Pongal Kabaddi Challenge',
      edition: '3rd Edition',
      startDate: new Date('2025-01-14'),
      endDate:   new Date('2025-01-15'),
      venue: 'Maniyambet School Ground',
      location: 'Maniyambet',
      totalPrize: '₹40,000',
      prizePool: [
        { rank: 1, label: 'Champion',    amount: '₹20,000', trophy: '🏆' },
        { rank: 2, label: 'Runner-Up',   amount: '₹10,000', trophy: '🥈' },
        { rank: 3, label: 'Third Place', amount: '₹5,000',  trophy: '🥉' },
      ],
      rules: ['Teams of 12 players', 'Open to all districts', 'Standard kabaddi rules apply'],
      registrationOpen: false,
      maxTeams: 16,
      registeredTeams: 16,
      status: 'completed',
    },
  ])
  console.log('🏆 Tournaments seeded:', t1.name, '·', t2.name)

  // ─── Players ─────────────────────────────────────────────
  await Player.insertMany([
    { name: 'Arjun Kumar',  jerseyNumber: 7,  role: 'Raider',      active: true, hometown: 'Maniyambet', joinedYear: 2020, achievements: ['Best Raider 2024', 'Most Points 2023'], bio: 'Lightning-fast raider, signature cross ankle hold.' },
    { name: 'Selvam R',     jerseyNumber: 3,  role: 'Defender',    active: true, hometown: 'Dharmapuri', joinedYear: 2019, achievements: ['Best Defender 2024', 'Iron Wall Award'], bio: 'Immovable corner post. 3 years undefeated at home.' },
    { name: 'Murugan S',    jerseyNumber: 11, role: 'All-Rounder', active: true, hometown: 'Maniyambet', joinedYear: 2021, achievements: ['Best All-Rounder 2023', 'MVP 2022'], bio: 'The captain. Reads the game better than anyone.' },
    { name: 'Dinesh P',     jerseyNumber: 9,  role: 'Raider',      active: true, hometown: 'Hosur',      joinedYear: 2022, achievements: ['Rising Star 2023'], bio: 'Young gun with explosive speed.' },
    { name: 'Karthik B',    jerseyNumber: 4,  role: 'Defender',    active: true, hometown: 'Krishnagiri',joinedYear: 2020, achievements: ['Strongest Grip Award 2024'], bio: 'Tackle specialist. No raider escapes his grip twice.' },
    { name: 'Vijay Kumar',  jerseyNumber: 12, role: 'All-Rounder', active: true, hometown: 'Maniyambet', joinedYear: 2018, achievements: ['Club Legend', 'Most Matches Played'], bio: 'Foundation member of JOF. The soul of the team.' },
    { name: 'Rajan M',      jerseyNumber: 6,  role: 'Defender',    active: true, hometown: 'Pennagaram', joinedYear: 2021, achievements: ['Best Rookie 2021'], bio: 'Cover defender with exceptional positioning.' },
    { name: 'Suresh T',     jerseyNumber: 15, role: 'Raider',      active: true, hometown: 'Maniyambet', joinedYear: 2023, achievements: ['Fastest Raid Record 2024'], bio: 'Speedster who completes raids in under 10 seconds.' },
  ])
  console.log('👥 Players seeded: 8 players')

  // ─── Matches ─────────────────────────────────────────────
  await Match.insertMany([
    { tournamentId: t1._id, tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Jeeva Oli Friends', teamB: 'Hosur Hawks',       round: 'Quarter Final', matchDate: new Date('2025-06-15'), matchTime: '10:00 AM', status: 'scheduled', venue: 'Ground A' },
    { tournamentId: t1._id, tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Dharmapuri Lions',  teamB: 'Krishnagiri Kings', round: 'Quarter Final', matchDate: new Date('2025-06-15'), matchTime: '12:00 PM', status: 'scheduled', venue: 'Ground A' },
    { tournamentId: t1._id, tournamentName: 'JOF Kabaddi Cup 5th Edition', teamA: 'Salem Strikers',    teamB: 'Erode Eagles',      round: 'Quarter Final', matchDate: new Date('2025-06-15'), matchTime: '02:00 PM', status: 'scheduled', venue: 'Ground B' },
    { tournamentId: t2._id, tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Jeeva Oli Friends', teamB: 'Hosur Hawks',    scoreA: 42, scoreB: 31, winner: 'Jeeva Oli Friends', round: 'Final',      matchDate: new Date('2025-01-15'), matchTime: '04:00 PM', status: 'completed' },
    { tournamentId: t2._id, tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Jeeva Oli Friends', teamB: 'Salem Strikers', scoreA: 38, scoreB: 27, winner: 'Jeeva Oli Friends', round: 'Semi Final', matchDate: new Date('2025-01-14'), matchTime: '02:00 PM', status: 'completed' },
    { tournamentId: t2._id, tournamentName: 'Pongal Kabaddi Challenge',    teamA: 'Dharmapuri Lions',  teamB: 'Hosur Hawks',    scoreA: 29, scoreB: 35, winner: 'Hosur Hawks',       round: 'Semi Final', matchDate: new Date('2025-01-14'), matchTime: '04:00 PM', status: 'completed' },
  ])
  console.log('📅 Matches seeded: 6 matches\n')

  console.log('✅ Seed complete!')
  console.log('─────────────────────────────────────────')
  console.log('Admin login: admin / jof@admin2025')
  console.log('Admin URL:   http://localhost:3000/admin')
  console.log('─────────────────────────────────────────')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
